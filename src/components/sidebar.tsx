import { useLogoutAdmin } from "@/http/useLogoutAdmin"
import { Button } from "./ui/button"
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
    setCardUser,
}: SidebarProps) => {
    const {mutateAsync: logout} = useLogoutAdmin()

    const handlleLogoutAdmin = async () => {
        await logout()
        window.location.href = "/" 
    }

    return (
        <Card className={`h-full w-full pt-10 ${className} space-y-4
        `}>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Painel adimistrativo</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-10">
                <ul className="flex flex-col gap-2 h-ful">
                    <li className="flex gap-1">
                        <Checkbox onCheckedChange={setCardUser} id="Clientes"/>
                        <Label htmlFor="Clientes">Clientes</Label>
                    </li>
                    <li className="flex gap-1">
                        <Checkbox onCheckedChange={setCardProduct} id="Produtos"/>
                        <Label htmlFor="Produtos">Produtos</Label>
                    </li>
                     <li className="flex gap-1">
                        <Checkbox onCheckedChange={setCardOrder} id="Pedidos"/>
                        <Label htmlFor="Pedidos">Pedidos</Label>
                    </li>
                </ul>
                <Button onClick={() => handlleLogoutAdmin()} className="mt-auto">Sair</Button>
            </CardContent>
        </Card>
    )
}