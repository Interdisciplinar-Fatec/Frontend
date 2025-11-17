import { TableUserOrders } from "@/components/table-UserOrders"
import { useGetOrder } from "@/http/get/useGetOrder"
import { type getOrderUserType } from "@/http/types/get-orderUser-type"
import { ArrowLeft } from "lucide-react"
import { 
    Card,
    CardTitle,
    CardContent,
    CardDescription,
    CardHeader,
 } from "@/components/ui/card"
import { useLogoutUser } from "@/http/post/useLogout"

export function OrdersPage() {
    const {mutateAsync: logout} = useLogoutUser()
   
    const {data}: {data?: getOrderUserType} = useGetOrder()
    
    const handleLogoutUser = async () => {
        await logout()
        window.location.href = "/" 
    }
    
    
    return (
        <main  className="h-screen bg-[#171819] flex flex-col items-center justify-center gap-14 relative" >
            
            {/* Botão voltar */}
            <div className="w-full flex justify-between items-center absolute top-5 left-0 px-6 z-10">
            {/* Logo da marca à esquerda */}
            <img
                src="/LOGOTIPO.png" 
                alt="Ícone de eletrodomésticos"
                className="w-[100px] md:w-[120px] lg:w-[150px] h-auto object-contain"
            />

            {/* Botão voltar à direita */}
            <button
                onClick={handleLogoutUser}
                className="text-orange-500 border-2 border-orange-500 rounded-lg p-1"
                >
                <ArrowLeft />
            </button>
            </div>

          
            {/* Card Meus Pedidos */}
            <Card
                className="
                space-y-4
                shadow-[rgba(0,0,0,0.24)_0px_3px_8px]
                border-black border-[0.005px]
                mt-25
                w-3/4
                max-w-4xl
                overflow-auto
                xs:w-11/12 xs:p-6
                "
                style={{ height: "70vh" }}
                >


                <CardHeader>
                    <CardTitle className="font-bold text-lg text-black">Meus Pedidos</CardTitle>
                    <CardDescription className="text-black text-sm">
                        Listagem dos pedidos de eletrodomésticos para consertos
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {data ? (
                        <TableUserOrders data={data} admin={false} />
                    ) : (
                        <h2 className="text-gray-300">Não há pedidos</h2>
                    )}
                </CardContent>
            </Card>
        </main>
    )
}
