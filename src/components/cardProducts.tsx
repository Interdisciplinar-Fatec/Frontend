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
import { useState } from "react"
import { Li } from "@/components/li"
import { TableProducts } from "./table-products"
import { useGetProducts } from "@/http/useGetUsersProducts"
import { useGetProductName } from "@/http/useGetProductName"
import { usePostProduct } from "@/http/usePostProduct"


const formSearchSchema = z.object({
    nome: z.string()
})

const formProductSchema = z.object({
    nome: z.string(),
    marca: z.string(),
    preco: z.coerce.number(),
    descricao: z.string().optional()
})

export const CardProduct = () => {
    const [productName, setProductName] = useState<string | undefined>()

    const {mutateAsync: createProduct} = usePostProduct()
    const {data: dataProducts} = useGetProducts();
    const {data: dataProduct} = useGetProductName(productName);

    const formSearch = useForm<z.infer<typeof formSearchSchema>>({
        resolver: zodResolver(formSearchSchema),
        defaultValues: {
            nome: ""
        },
    })

    const formProducts = useForm<z.infer<typeof formProductSchema>>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(formProductSchema) as any,
        defaultValues: {
            nome: "",
            marca: "",
            preco: 0,
            descricao: ""
        }
    })

    const handleSearchForm = async (values: z.infer<typeof formSearchSchema>) => {
        setProductName(values.nome)
        formSearch.reset()
    }

    const handleProductForm = async (values: z.infer<typeof formProductSchema>) => {
        console.log(values)
        createProduct({
            nome: values.nome,
            marca: values.marca,
            preco: values.preco,
            descricao: values.descricao
        })
          formProducts.reset()
    }

    return (
        <Card className={`col-span-2 flex-1 `}>
            <CardHeader>
                <CardTitle>Produtos</CardTitle>
                <CardDescription>Cadastro e consulta de Produtos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <section className="flex flex-col space-y-5">
                    <Form {...formSearch}>
                        <form className="flex items-end gap-2" onSubmit={formSearch.handleSubmit(handleSearchForm)}>
                            <FormField 
                                name="nome"
                                control={formSearch.control}
                                render={({field}) => (
                                     <FormItem className="flex-1">
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Digite o nome para buscar um produto ..." {...field}/>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                     </FormItem>
                            )}
                            />
                            <Button type="submit" variant={"outline"}>Buscar</Button>
                        </form>
                    </Form>
                   {
                    dataProduct && (
                        <section className="space-y-2">
                            <h2>Resultados da pesquisa:</h2>
                             {
                                dataProduct.map(product => (
                                    <ul className="bg-[#B1B3B6] p-2 pl-4" key={product.id}>
                                        <Li label="ID" value={product.id} />
                                        <Li label="Nome" value={product.nome} />
                                        <Li label="Marca" value={product.marca} />
                                        <Li label="Preço" value={String(product.preco)} />
                                        <Li label="Descrição" value={String(product.descricao)} />
                                    </ul>
                                ))
                            }
                         
                        </section>
                    )
                   }
                </section>
                <hr />
                <TableProducts data={dataProducts}></TableProducts>
                <hr />
               <section>
                    <h2>Cadastro de Produto: </h2>
                   <Form {...formProducts}>
                        <form className="space-y-1" onSubmit={formProducts.handleSubmit(handleProductForm)}>
                            <FormField 
                                name="nome"
                                control={formProducts.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Nome" {...field}/>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="marca"
                                control={formProducts.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Marca" {...field}/>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="preco"
                                control={formProducts.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Preco" {...field} onChange={(e) => field.onChange(Number(e.target.value))}/>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="descricao"
                                control={formProducts.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Descrição" {...field}/>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" variant={"outline"}>Criar</Button>
                        </form>
                   </Form>
               </section>
            </CardContent>
        </Card>
    )
}