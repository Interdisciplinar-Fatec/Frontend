import { useLogoutAdmin } from "@/http/post/useLogoutAdmin"
import { Button } from "./ui/button"
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
 } from "./ui/card"
import { Apple, CalendarFold, Hash, User } from "lucide-react"

interface SidebarProps {
    className: string,
    activeCard: "user" | "order" | "product" | null,
    setActiveCard: (type: "user" | "order" | "product" | null) => void
}

export const SideBar = ({
    className,
    setActiveCard,
    activeCard
}: SidebarProps) => {
    const {mutateAsync: logout} = useLogoutAdmin()

    const handlleLogoutAdmin = async () => {
        await logout()
        window.location.href = "/" 
    }

    return (
        <section className={`${className} bg-[#FFFFFF] h-full w-full p-4 grid-rows-8`}>
            <div className=" row-span-1 flex items-start gap-1">
                <div className="bg-[#E5EBFF]  mt-1 p-1">
                    <Hash />
                </div>
                <div className="flex flex-col justify-center ">
                    <h2 className="text-black ">JWT eletronica</h2>
                    <h3 className="text-black text-xs">Painel administrativo</h3>
                </div>
            </div>

            <div className="flex flex-col gap-4 row-span-3">
                <hr />
                <ul className="flex flex-col gap-2 cursor-pointer">
                    <li className={`${activeCard === "user" ? "bg-[#D7DDEE]": "bg-transparent hover:bg-[#EEF1F5]"}`}>
                        <button className="flex gap-3 w-full hover:p-1" onClick={() => setActiveCard(activeCard === "user" ? null : "user")}>
                            <User />
                            <h2>Clientes</h2>
                        </button>
                    </li>
                    <li className={`${activeCard === "order" ? "bg-[#D7DDEE]": "bg-transparent hover:bg-[#EEF1F5]"}`}>
                        <button className="flex gap-3 w-full hover:p-1"  onClick={() => setActiveCard(activeCard === "order" ? null : "order")}>
                            <CalendarFold />
                            <h2>Pedidos</h2>
                        </button>
                    </li>
                    <li className={`${activeCard === "product" ? "bg-[#D7DDEE]": "bg-transparent hover:bg-[#EEF1F5]"}`}>
                        <button className="flex gap-3 w-full hover:p-1" onClick={() => setActiveCard(activeCard === "product" ? null : "product")}>
                            <Apple />
                            <h2>Produtos</h2>
                        </button>
                    </li>
                </ul>
                <hr />
            </div>

            <div className="row-span-3 flex items-end">
                <Card className="w-full gap-1">
                    <CardHeader>
                        <CardTitle className="text-sm text-green-400 w-11">
                            <h2 className="bg-[#F6F7F9] rounded-lg  p-1">Novo</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        Não há avisos novos!
                    </CardContent>
                </Card>
            </div>
            <div className="row-span-1 flex items-end">
                <Button className="w-full" onClick={() => handlleLogoutAdmin()} variant={"outline"}>Logout</Button>
            </div>
        </section>
    )
}