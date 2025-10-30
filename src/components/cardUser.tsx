import { useForm } from "react-hook-form"
import { TableUsers } from "./table-users"
import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
 } from "./ui/card"
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
 } from "./ui/form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useGetUsers } from "@/http/useGetUsers"
import { useGetUserId } from "@/http/useGetUserId"
import { useState } from "react"
import dayjs from "dayjs"
import { Li } from "@/components/li"


const formSchema = z.object({
    id: z.string()
})

export const CardUser = () => {
    const [userId, setUserId] = useState<string | undefined>()

    const {data: dataUsers} = useGetUsers();
    const {data: dataUser} = useGetUserId(userId);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: ""
        },
    })

    const handleForm = async (values: z.infer<typeof formSchema>) => {
        setUserId(values.id)
        form.reset()
    }

    return (
        <Card className={`col-span-2 flex-1`}>
            <CardHeader>
                <CardTitle>Clientes</CardTitle>
                <CardDescription>Dados dos clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <section className="flex flex-col space-y-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleForm)} className="flex gap-2
                            xs:flex-row xs:items-end
                            flex-col items-center
                        ">
                            <FormField 
                                name="id"
                                control={form.control}
                                render={({field}) => (
                                     <FormItem className="flex-1">
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Id do cliente" {...field}/>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                     </FormItem>
                            )}
                            />
                            <Button className="w-full xs:w-auto" type="submit" variant={"outline"}>Buscar</Button>
                        </form>
                    </Form>
                   {
                    dataUser && (
                        <section className="">
                            <h2>Ultimo usuario consultado:</h2>
                             {
                                dataUser.map(user => (
                                    <ul className="bg-[#B1B3B6] p-2 pl-4" key={user.id}>
                                        <Li label="ID" value={user.id} />
                                        <Li label="Nome" value={user.name} />
                                        <Li label="CPF" value={user.CPF} />
                                        <Li label="Data de nascimento" value={dayjs(user.data_nascimento).format("DD/MM/YYYY")} />
                                        <Li label="Telefone" value={user.telefone} />
                                        <Li label="Endereço" value={user.endereco} />
                                    </ul>
                                ))
                            }
                         
                        </section>
                    )
                   }
                </section>
               <TableUsers data={dataUsers}></TableUsers>
            </CardContent>
        </Card>
    )
}