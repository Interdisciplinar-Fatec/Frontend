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
import { useGetUsers } from "@/http/get/useGetUsers"
import { useGetUserId } from "@/http/get/useGetUserId"
import { useEffect, useState } from "react"
import { RefreshCw } from "lucide-react"

const formSchema = z.object({
    id: z.uuid({error: "Insira um ID válido"})
})

export const CardUser = () => {
    const [userId, setUserId] = useState<string | undefined>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tableData, setTableData] = useState<any>([])

    const {data: dataUsers} = useGetUsers();
    const {data: dataUser, isError: isUserError, error: userError} = useGetUserId(userId);

    useEffect(() => {
        if (dataUsers) setTableData(dataUsers)
    }, [dataUsers])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: ""
        },
    })

    const handleForm = async (values: z.infer<typeof formSchema>) => {
        try {
            form.reset()
            form.clearErrors("id")
            setUserId(values.id)
        } catch (error) {
            form.setError("id",{
                type: "manual",
                message: "Usuário não encontrado"
            })
            console.log(error)
        }
    }

    const handleFormRefetch = () => {
        setUserId(undefined)
        setTableData(dataUsers)
    }

    useEffect(() => {
        if (dataUser) {
            console.log(dataUser)
            setTableData(dataUser)
        }

        if (dataUser === null) {
            form.setError("id", {
                type: "manual",
                message: "Usuário não encontrado"
            })
            setUserId(undefined)
        }

        if (isUserError) {
            form.setError("id", {
                type: "manual",
                message: "Erro ao buscar usuário"
            })
            setUserId(undefined)
            console.error(userError)
        }
    }, [dataUser, isUserError, userError, form])


    return (
        <Card className={`col-span-2 flex-1`}>
            <CardHeader>
                <CardTitle>Clientes</CardTitle>
                <CardDescription>Dados dos clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <section className="flex flex-col space-y-5 relative">
                    <button onClick={() => handleFormRefetch()} className="absolute top-[-20px] right-1"><RefreshCw className="w-5 h-5"/></button>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleForm)} className="flex relative
                            xs:flex-row xs:items-end
                            flex-col items-center justify-baseline 
                        ">
                            <FormField 
                                name="id"
                                control={form.control}
                                render={({field}) => (
                                     <FormItem className="flex-1">
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Id do cliente" {...field}  
                                                onChange={(e) => {
                                                    field.onChange(e.target.value.trimStart())
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className="absolute bottom-[-25px]" />
                                     </FormItem>
                            )}
                            />
                            <Button className="w-full xs:w-auto" type="submit" variant={"outline"}>Buscar</Button>
                        </form>
                    </Form>
                </section>
               <TableUsers data={tableData}></TableUsers>
            </CardContent>
        </Card>
    )
}