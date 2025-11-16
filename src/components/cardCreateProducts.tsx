import { useForm } from "react-hook-form"
import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
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
import { usePostProduct } from "@/http/post/usePostProduct"

const formProductSchema = z.object({
    nome: z.string().min(2, {error: "O nome deve ter no mínimo 2 caracteres"}),
    marca: z.string().min(2, {error: "A marca deve ter no mínimo 2 caracteres"}),
    preco: z.coerce.number().min(1, {error: "O preço não pode ser negativo"}),
    descricao: z.string().optional()
})

export const CardCreateProduct = () => {
    const {mutateAsync: createProduct} = usePostProduct()
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
        <Card className={`col-span-2 h-full `}>
            <CardHeader>
                <CardDescription>Cadastro de Produtos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <section className="flex flex-col gap-2">
                <h2>Cadastro de Produto: </h2>
                   <Form {...formProducts}>
                        <form className="space-y-1" onSubmit={formProducts.handleSubmit(handleProductForm)}>
                            <FormField 
                                name="nome"
                                control={formProducts.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nome:</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Nome" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="marca"
                                control={formProducts.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Marca:</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Marca" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="preco"
                                control={formProducts.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Preço</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Preco" {...field} value={field.value === 0 ? "" : field.value} 
                                                onChange={(e) => {
                                                    const value = e.target.value === "" ? 0 : parseFloat(e.target.value)
                                                    field.onChange(value)
                                                }}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="descricao"
                                control={formProducts.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Descrição (opcional)" {...field}/>
                                        </FormControl>
                                        <FormMessage />.
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