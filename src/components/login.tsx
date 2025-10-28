import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from "zod"
import { getOrderUser } from "@/http/useGetOrderUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginAdmin } from "@/http/useLoginAdmin";

const formSchema = z.object({
    CPF: z.string(),
    Senha: z.string()
})

export const FormOrder = () => {
    const {mutateAsync:postLogin} = useLoginAdmin()
    const [isForm, setIsForm] = useState(false);
    const navigate = useNavigate()

     const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            CPF: "",
            Senha: ""
        },
    })

    const handleForm = async (values: z.infer<typeof formSchema>) => {
        try {
            if(!isForm) {
                const result = await getOrderUser(values.CPF);
                if ("adminCPF" in result && result.adminCPF) { 
                   return setIsForm(true) 
                } 
                else { return navigate("/user/order") }
            } 

            postLogin({
                CPF: values.CPF,
                Senha: values.Senha
            })
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex gap-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleForm)} className="flex items-end gap-2">
                    <FormField
                        control={form.control}
                        name="CPF"
                        render={({field})=> (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input className="text-white" placeholder="CPF" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isForm && (
                        <FormField
                            control={form.control}
                            name="Senha"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Admin Code</FormLabel>
                                <FormControl>
                                <Input className="text-white" placeholder="Senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        )}
                    <Button type="submit" variant="outline">Entrar</Button>
                </form>
            </Form>
        </div>
    )
}