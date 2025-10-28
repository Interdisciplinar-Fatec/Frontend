import { TableUserOrders } from "@/components/table-UserOrders"
import { useGetOrder } from "@/http/useGetOrder"
import { type getOrderUserType } from "@/http/types/get-orderUser-type"
import { ArrowLeft } from "lucide-react"
import { 
    Card,
    CardTitle,
    CardContent,
    CardDescription,
    CardHeader,
 } from "@/components/ui/card"
import { useLogoutUser } from "@/http/useLogout"

export function OrdersPage() {
    const {mutateAsync: logout} = useLogoutUser()
   
    const {data}: {data?: getOrderUserType} = useGetOrder()
    

    const handleLogoutUser = async () => {
        await logout()
        window.location.href = "/" 
    }
    
    return (
         <main className="h-screen bg-[#171819] flex flex-col items-center justify-center gap-14 relative">
            <button onClick={handleLogoutUser} className="text-white border-2 border-[#4A4C4F] rounded-lg p-1 absolute top-5 right-5"><ArrowLeft /></button>
           
            <Card className=" max-w-5xl p-6 space-y-4 shadow-[rgba(0, 0, 0, 0.24)_0px_3px_8px] border-black border-[0.005px]">
                <CardHeader>
                    <CardTitle className="font-bold text-gray-700">Meus Pedidos</CardTitle>
                    <CardDescription className="text-gray-500">Listagem dos pedidos de eletrodomesticos para concertos</CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        data ? (<TableUserOrders data={data}/>) : (<h2>Não há pedidos</h2>)
                    }
                </CardContent>
            </Card>
        </main>
    )
}