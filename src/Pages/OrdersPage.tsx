import { TableOrders } from "@/components/table-orders"
import { useGetOrder } from "@/http/useGetOrder"
import { type getOrderUserType } from "@/http/types/get-orderUser-type"
import { ArrowLeft } from "lucide-react"
import { Navigate } from "react-router-dom"



export function OrdersPage() {
   
    const {data}: {data?: getOrderUserType} = useGetOrder()
    if(!data) { return <Navigate to="/" replace/>}
    
    return (
         <main className="h-screen bg-[#171819] flex flex-col items-center justify-center gap-14 relative">
            <button className="text-white border-2 border-[#4A4C4F] rounded-lg p-1 absolute top-5 right-5"><ArrowLeft /></button>
           <TableOrders data={data}/>
        </main>
    )
}