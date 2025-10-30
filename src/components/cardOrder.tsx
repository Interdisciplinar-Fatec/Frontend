import { useFieldArray, useForm } from "react-hook-form"
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
import { useState } from "react"
import { TableUserOrders } from "./table-UserOrders"
import { TableOrders } from "./table-orders"
import { useGetOrdersUser } from "@/http/useGetOrdersUser"
import { useGetOrders } from "@/http/useGetOrderId"
import { usePostOrder } from "@/http/usePostOrder"
import { Label } from "@radix-ui/react-label"

const formSearchSchema = z.object({
    nome: z.string()
})

const formOrderSchema =  z.object({
    CPF: z.string(),
    name: z.string().min(3),
    email: z.email(),
    endereco: z.string().min(4),
    data_nascimento: z.string().min(8),
    telefone: z.string(),
    valor_total: z.coerce.number(),
    descricao: z.string(),
    items: z.array(z.object({
        id_produto: z.uuid(),
        quantidade: z.number()
    }))
})

export const CardOrder = () => {
    const [orderId, setOrderId] = useState<string | undefined>()

    const {mutateAsync: createOrder} = usePostOrder()

    const {data: dataOrders} = useGetOrders();
    const {data: dataOrder} = useGetOrdersUser(orderId);

    const formSearch = useForm<z.infer<typeof formSearchSchema>>({
        resolver: zodResolver(formSearchSchema),
        defaultValues: {
            nome: ""
        },
    })

    const formOrders = useForm<z.infer<typeof formOrderSchema>>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(formOrderSchema) as any,
        defaultValues: {
            CPF: "",
            name: "",
            email: "",
            endereco: "",
            data_nascimento: "",
            telefone: "",
            valor_total: 0,
            descricao: "",
            items: [{id_produto: "", quantidade: 1}]
        }
    })

    const {register} = formOrders

    const { fields, append, remove } = useFieldArray({
        control: formOrders.control,
        name: "items"
    })

    const handleSearchForm = async (values: z.infer<typeof formSearchSchema>) => {
        setOrderId(values.nome)
        formSearch.reset()
    }

    const handleOrderForm = async (values: z.infer<typeof formOrderSchema>) => {
        try {
            await createOrder(values)
            formOrders.reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className={`col-span-2 flex-1 `}>
            <CardHeader>
                <CardTitle>Pedidos</CardTitle>
                <CardDescription>Gerenciamento de Pedidos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <section className="flex flex-col space-y-5">
                    <Form {...formSearch}>
                        <form onSubmit={formSearch.handleSubmit(handleSearchForm)} className="flex gap-2
                            xs:flex-row xs:items-end
                            flex-col items-center
                        ">
                            <FormField 
                                name="nome"
                                control={formSearch.control}
                                render={({field}) => (
                                     <FormItem className="flex-1">
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Digite o id de um usuario para buscar seus pedidos ..." {...field}/>
                                        </FormControl>
                                         <FormMessage />
                                     </FormItem>
                            )}
                            />
                            <Button className="w-full xs:w-auto" type="submit" variant={"outline"}>Buscar</Button>
                        </form>
                    </Form>
                   {
                    dataOrder && (
                        <TableUserOrders data={dataOrder}></TableUserOrders>
                    )
                   }
                </section>
                <hr />
                    <h2>Listagem dos Pedidos: </h2>
                    <TableOrders data={dataOrders ?? []}></TableOrders>
                <hr />
               <section>
                    <h2>Cadastro de Produto: </h2>
                   <Form {...formOrders}>
                        <form className="space-y-1" onSubmit={formOrders.handleSubmit(handleOrderForm)}>
                            <FormField 
                                name="name"
                                control={formOrders.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Nome" {...field}/>
                                        </FormControl>
                                         <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="CPF"
                                control={formOrders.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="CPF" {...field}/>
                                        </FormControl>
                                         <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="data_nascimento"
                                control={formOrders.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Data de nascimento" {...field}/>
                                        </FormControl>
                                         <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="email"
                                control={formOrders.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="E-mail" {...field}/>
                                        </FormControl>
                                         <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="endereco"
                                control={formOrders.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Endereço" {...field}/>
                                        </FormControl>
                                         <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="telefone"
                                control={formOrders.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Telefone" {...field}/>
                                        </FormControl>
                                         <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="descricao"
                                control={formOrders.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Descrição" {...field}/>
                                        </FormControl>
                                         <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="valor_total"
                                control={formOrders.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Orçamento" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                           <section className="space-y-4">
                                <h2 className="mt-6 text-xs xs:text-sm">Criação dos produtos do pedido:</h2>

                                {fields.map((item, index) => (
                                <div key={item.id} className="flex bg-gray-100 rounded-lg 
                                    xs:flex-row xs:items-center xs:gap-4 xs:p-3
                                    flex-col items-start gap-1 p-6
                                ">
                                    <Label >Id: </Label>
                                    <Input  {...register(`items.${index}.id_produto`)} placeholder="Id Produto"/>
                                    <Label >Quantidade: </Label>
                                    <Input type="number" {...register(`items.${index}.quantidade`, { valueAsNumber: true })} />
                                    <Button className="w-full xs:w-auto" type="button" onClick={() => remove(index)}>Remover</Button>
                                    <hr className="border-gray-100 border-1 w-full xs:hidden" />
                                </div>
                                ))}

                                <Button className="mb-4 w-full xs:w-auto" variant={"outline"} type="button" onClick={() => append({ id_produto: "", quantidade: 1 })}>
                                    Adicionar Item
                                </Button>
                           </section>

                            <Button className="w-full xs:w-auto" variant={"outline"} type="submit">
                                Criar Pedido
                            </Button>

                        </form>
                   </Form>
               </section>
            </CardContent>
        </Card>
    )
}