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


const formSchema = z.object({
    id: z.string()
})

export const CardUser = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: ""
        },
    })

    const handleForm = async (values: z.infer<typeof formSchema>) => {
        console.log(values.id)
    }

    const data = [
        {
            id: "11111111111111111111",
            name: "string",
            email: "string",
            crated_at: new Date()
        },
        {
            id: "0000000000000000",
            name: "string2",
            email: "string2",
            crated_at: new Date()
        }
    ]

    return (
        <Card className={`col-span-2 flex-1 `}>
            <CardHeader>
                <CardTitle>Clientes</CardTitle>
                <CardDescription>Dados dos clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <section>
                    <Form {...form}>
                        <form className="flex items-end gap-2" onSubmit={() => handleForm}>
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
                            <Button type="submit" variant={"outline"}>Buscar</Button>
                        </form>
                    </Form>
                </section>
               <TableUsers data={data}></TableUsers>
            </CardContent>
        </Card>
    )
}