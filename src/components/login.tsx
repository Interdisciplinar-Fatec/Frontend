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
    CPF: z.string().min(11, "CPF deve ter no mínimo 11 caracteres"),
    Senha: z.string().optional(),
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

            const senha = values.Senha ?? "";
            if (isForm) {
                if (senha.trim() === "" ) {
                    form.setError("Senha", { type: "required", message: "Senha é obrigatória" });
                    return;
                } else if (senha.length <6) {
                    form.setError("Senha", { type: "minLength", message: "Senha deve ter no mínimo 6 caracteres" });
                    return;
                }
            }

            postLogin({
                CPF: values.CPF,
                Senha: senha
            })
            
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="flex gap-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleForm)} className="flex items-end flex-col
                    sm:gap-2 gap-4 sm:flex-row
                ">
                    <FormField
                        control={form.control}
                        name="CPF"
                        render={({field})=> (
                            <FormItem>
                                <FormLabel className="text-white">CPF:</FormLabel>
                                <FormControl>
                                    <Input className="text-white sm:w-53 xss:w-45 w-30" placeholder="CPF" {...field} />
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
                                <FormLabel className="text-white">Senha do Admin</FormLabel>
                                <FormControl>
                                <Input className="text-white sm:w-53 xss:w-45 w-30" placeholder="Senha" {...field} />
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