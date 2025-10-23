import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
 } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

interface SidebarProps {
    className: string,
    setCardUser: (checked: boolean) => void,
    setCardOrder: (checked: boolean) => void,
    setCardProduct: (checked: boolean) => void
}

export const SideBar = ({
    className,
    setCardOrder,
    setCardProduct,
    setCardUser
}: SidebarProps) => {
    return (
        <Card className={`h-full w-full col-span-3 row-span-1 pt-15
            md:col-span-2 lg:col-span-1  ${className} space-y-4
        `}>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Painel adimistrativo</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="flex flex-col gap-2">
                    <li className="flex gap-1">
                        <Checkbox onCheckedChange={setCardUser} id="Clientes"/>
                        <Label htmlFor="Clientes">Clientes</Label>
                    </li>
                    <li className="flex gap-1">
                        <Checkbox onCheckedChange={setCardOrder} id="Pedidos"/>
                        <Label htmlFor="Pedidos">Pedidos</Label>
                    </li>
                    <li className="flex gap-1">
                        <Checkbox onCheckedChange={setCardProduct} id="Produtos"/>
                        <Label htmlFor="Produtos">Produtos</Label>
                    </li>
                </ul>
            </CardContent>
        </Card>
    )
}