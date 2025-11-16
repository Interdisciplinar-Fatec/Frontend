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
import { useFilterUser } from "@/utils/filterUser"
import { useState } from "react"
import { Funnel, RefreshCw } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

const formSchema = z.object({
    id: z.string().optional().refine(val => val === "" || z.uuid().safeParse(val).success, {
        message: "ID inválido (deve ser um UUID válido se preenchido)"
    }),
    name: z.string().optional(),
    email: z.string().optional(),
    cpf: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

export const CardListUser = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<keyof FormValues>("cpf")

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            cpf: "",
            email: "",
            name: ""
        },
    })

    const { tableData, setters } = useFilterUser(form);
    const handleForm = async (values: FormValues) => {
        form.clearErrors()

        switch (selectedFilter) {
            case "id":
                if (values.id) setters.setUserId(values.id);
                break;
            case "cpf":
                if (values.cpf) setters.setUserCPF(values.cpf);
                break;
            case "email":
                if (values.email) setters.setUserEmail(values.email);
                break;
            case "name":
                if (values.name) setters.setUserName(values.name);
                break;
            default:
                break;
        }
        
        form.reset({
            id: "",
            cpf: "",
            email: "",
            name: ""
        })
    }

    const handleFormRefetch = () => {
        setters.resetSearch()
    }

    return (
        <Card className={`col-span-2 h-full `}>
            <CardHeader>
                <CardTitle>Clientes</CardTitle>
                <CardDescription>Dados dos clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <section className="flex flex-col space-y-5 relative">
                    <Popover open={openFilter} onOpenChange={setOpenFilter}>
                        <PopoverTrigger asChild>
                            <button className="absolute top-[-20px] right-1">
                                <Funnel className="w-5 h-5" />
                            </button>
                        </PopoverTrigger>

                        <PopoverContent className= "w-30 lg:w-56 p-4 space-y-4"
                            side={"right"}
                            align="start"
                            alignOffset={0}
                            sideOffset={0}
                        >
                            <h4 className="text-sm font-semibold text-center">Filtros</h4>

                            <ToggleGroup
                                type="single"
                                value={selectedFilter}
                                onValueChange={(v) => {
                                    if (v) setSelectedFilter(v as keyof FormValues)
                                    form.clearErrors() // Limpa erros ao trocar o filtro
                                }}
                                className="flex flex-col lg:flex-row gap-2 w-full justify-center"
                            >
                                <ToggleGroupItem value="id">ID</ToggleGroupItem>
                                <ToggleGroupItem value="name">Nome</ToggleGroupItem>
                                <ToggleGroupItem value="cpf">CPF</ToggleGroupItem>
                                <ToggleGroupItem value="email">Email</ToggleGroupItem>
                            </ToggleGroup>

                            <Button
                                className="w-full"
                                variant="outline"
                                onClick={() => setOpenFilter(false)}
                            >
                                Fechar
                            </Button>
                        </PopoverContent>
                    </Popover>
                    <button
                        onClick={handleFormRefetch}
                        className="absolute top-[-20px] right-7"
                    >
                        <RefreshCw className="w-5 h-5"/>
                    </button>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleForm)} className="flex relative
                            xs:flex-row xs:items-end
                            flex-col items-center justify-baseline
                        ">
                            {["id", "name", "email", "cpf"].map(key => (
                                selectedFilter === key && (
                                    <FormField
                                        key={key}
                                        name={key as keyof FormValues}
                                        control={form.control}
                                        render={({field}) => (
                                            <FormItem className="flex-1 w-full">
                                                <FormLabel></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder={`Buscar por ${key.toUpperCase()}`}
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e.target.value.trimStart())
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage className="absolute bottom-[-25px]" />
                                            </FormItem>
                                        )}
                                    />
                                )
                            ))}

                            <Button className="w-full xs:w-auto" type="submit" variant={"outline"}>Buscar</Button>
                        </form>
                    </Form>
                </section>
               <TableUsers data={tableData}></TableUsers>
            </CardContent>
        </Card>
    )
}