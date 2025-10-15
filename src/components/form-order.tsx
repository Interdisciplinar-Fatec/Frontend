import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from "zod"
import { getOrderUser } from "@/http/get-order-user";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    CPF: z.string(),
})

export const FormOrder = () => {
    const navigate = useNavigate()

     const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            CPF: "",
        },
    })

    const handleForm = async (values: z.infer<typeof formSchema>) => {
        try {
            await getOrderUser(values.CPF);
            navigate("/user/order")
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
                    <Button type="submit" variant="outline">Entrar</Button>
                </form>
            </Form>
        </div>
    )
}