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
import { useGetProducts } from "@/http/get/useGetUsersProducts"
import { useGetProductName } from "@/http/get/useGetProductName"
import type { getProductType } from "@/http/types/get-product-type"
import { ToggleLeft, ToggleRight } from "lucide-react"
import { useGetProductsDesactivated } from "@/http/get/useGetUsersProductsDesactivated"

const formSearchSchema = z.object({
    nome: z.string()
})

export const CardListProduct = () => {
    const [productName, setProductName] = useState<string | undefined>()
    const [tableData, setTableData] = useState<getProductType>([])
    const [switchBtn, setswitchBtn] = useState<boolean>(false)

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

    return (
        <Card className={`col-span-2 h-full `}>
            <CardHeader>
                <CardTitle>Produtos</CardTitle>
                <CardDescription>consulta de Produtos</CardDescription>
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
            </CardContent>
        </Card>
    )
}