import { useForm } from "react-hook-form"
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
import { useEffect, useState } from "react"
import { TableUserOrders } from "./table-UserOrders"
import { TableOrders } from "./table-orders"
import { useGetOrdersUser } from "@/http/get/useGetOrdersUser"
import { useGetOrders } from "@/http/get/useGetOrderId"
import { RefreshCw } from "lucide-react"

const formSearchSchema = z.object({
    id: z.uuid({error: "Insira um ID válido"})
})

export const CardListOrder = () => {
    const [userId, setuserId] = useState<string | undefined>()


    const {data: dataOrders} = useGetOrders();
    const {data: dataOrder, isError: isUserError, error: userError} = useGetOrdersUser(userId);

    const formSearch = useForm<z.infer<typeof formSearchSchema>>({
        resolver: zodResolver(formSearchSchema),
        defaultValues: {
            id: ""
        },
    })

    const handleSearchForm = async (values: z.infer<typeof formSearchSchema>) => {
        try {
            formSearch.reset()
            setuserId(values.id.trim())
            formSearch.clearErrors() 

        } catch (err) {
            formSearch.setError("id", {
                type: "manual",
                message: "Erro ao buscar pedidos. Tente novamente.",
            })
            console.error(err)
        }
    }

     const handleFormRefetch = () => {
        setuserId(undefined)
    }


    useEffect(() => {
        if (dataOrder) {
            console.log(dataOrder)
        }

        if(dataOrder === null) {
            formSearch.setError("id", {
                type: "manual",    
                message: "Usuário não encontrado"
            })
            setuserId(undefined)
        }

        if(userError) {
            formSearch.setError("id", {
                type: "manual",
                message: "Erro ao buscar pedidos do usuário"
            })
            setuserId(undefined)
            console.error(userError)
        }

    }, [dataOrder, isUserError, userError, formSearch])

    return (
        <Card className={`col-span-2 `}>
            <CardHeader>
                <CardTitle>Pedidos</CardTitle>
                <CardDescription>Gerenciamento de Pedidos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <section className="flex flex-col space-y-5 relative">
                    <button onClick={() => handleFormRefetch()} className="absolute top-[-20px] right-1"><RefreshCw className="w-5 h-5"/></button>
                    <Form {...formSearch}>
                        <form onSubmit={formSearch.handleSubmit(handleSearchForm)} className="flex gap-2
                            xs:flex-row xs:items-end
                            flex-col items-center
                        ">
                            <FormField 
                                name="id"
                                control={formSearch.control}
                                render={({field}) => (
                                     <FormItem className="flex-1">
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Digite o id de um usuario para buscar seus pedidos ..." {...field} 
                                                onChange={(e) => {
                                                    field.onChange(e.target.value.trimStart())
                                                }}  
                                            />
                                        </FormControl>
                                         <FormMessage />
                                     </FormItem>
                            )}
                            />
                            <Button className="w-full xs:w-auto" type="submit" variant={"outline"}>Buscar</Button>
                        </form>
                    </Form>
                   {
                    dataOrder ? (
                        <TableUserOrders data={dataOrder} admin={true}></TableUserOrders>
                    ) : (
                        <TableOrders data={dataOrders ?? []}></TableOrders>
                    )
                   }
                </section>
            </CardContent>
        </Card>
    )
}