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
import { TableProducts } from "./table-products"
import { useGetProducts } from "@/http/useGetUsersProducts"
import { useGetProductName } from "@/http/useGetProductName"
import { usePostProduct } from "@/http/usePostProduct"
import type { getProductType } from "@/http/types/get-product-type"
import { ToggleLeft, ToggleRight } from "lucide-react"
import { useGetProductsDesactivated } from "@/http/useGetUsersProductsDesactivated"

const formSearchSchema = z.object({
    nome: z.string()
})

const formProductSchema = z.object({
    nome: z.string().min(2, {error: "O nome deve ter no mínimo 2 caracteres"}),
    marca: z.string().min(2, {error: "A marca deve ter no mínimo 2 caracteres"}),
    preco: z.coerce.number().min(1, {error: "O preço não pode ser negativo"}),
    descricao: z.string().optional()
})

export const CardProduct = () => {
    const [productName, setProductName] = useState<string | undefined>()
    const [tableData, setTableData] = useState<getProductType>([])
    const [switchBtn, setswitchBtn] = useState<boolean>(false)

    const {mutateAsync: createProduct} = usePostProduct()
    const {data: dataProducts} = useGetProducts();
    const {data: dataProductsDesactivated} = useGetProductsDesactivated();
    const {data: dataProduct, refetch} = useGetProductName(productName);

    useEffect(() => {
    if (!switchBtn && dataProducts) {
        setTableData(dataProducts)
    }
    }, [dataProducts, switchBtn])

    useEffect(() => {
    if (switchBtn && dataProductsDesactivated) {
        setTableData(dataProductsDesactivated)
    }
    }, [dataProductsDesactivated, switchBtn])
  
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
    }

    const handleSwitchBtn = async () => {
        if(!switchBtn) {
            setswitchBtn(!switchBtn)
            setTableData(dataProductsDesactivated || [])
            setProductName(undefined)  
            return
        } 

        setswitchBtn(!switchBtn)
        setTableData(dataProducts || [])
        setProductName(undefined)  
    }
    
    useEffect(() => {
        if(dataProduct) setTableData(dataProduct)
    }, [dataProduct])

    const handleProductForm = async (values: z.infer<typeof formProductSchema>) => {
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
            <CardContent className="space-y-4">
                <section className="flex flex-col space-y-5 relative">
                    <button onClick={() => handleSwitchBtn()} className="absolute right-1 top-[-20px]">
                        {
                            switchBtn ? <ToggleRight className="w-5 h-5"/> : <ToggleLeft className="w-5 h-5 text-gray-400"/>
                        }
                    </button>
                    {
                        !switchBtn ? (
                           <Form {...formSearch}>
                                <form onSubmit={formSearch.handleSubmit(handleSearchForm)}  className="flex gap-2
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
                                                    <Input className="text-sm" type="text" placeholder="Digite o nome para buscar um produto ..." {...field}  
                                                    onChange={(e) => {
                                                            refetch()
                                                            field.onChange(e.target.value.trimStart())
                                                            setProductName(undefined)     
                                                            setTableData(dataProducts || [])
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
                        ) : (
                            <>
                                <hr className="border-red-500 border-dotted mt-2" />
                                <h2 className="text-red-500 font-bold">Produtos desativados: </h2>
                            </>
                        )
                    }
                </section>
                    <TableProducts data={tableData} switchBtn={switchBtn}></TableProducts>
                <hr className={` ${switchBtn && "border-red-500 border-dotted "} `} />
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