import { useGetOrder } from "@/http/useGetOrder"
import { type getOrderUserType } from "@/types/get-orderUser-type"
import {EllipsisVertical } from "lucide-react"
import dayjs from "dayjs"
import { Navigate } from "react-router-dom"

export function OrdersPage() {
   
    const {data}: {data?: getOrderUserType} = useGetOrder()
    if(!data) { return <Navigate to="/" replace/>}
    
    return (
         <main className="h-screen bg-[#171819] flex flex-col items-center justify-center gap-14">
            <div className="h-4/5 w-2/3 border-2 border-[#2C2E30] rounded-2xl flex flex-col gap-2 p-4">
                <div  className="w-full flex-1 border-b-2 border-[#2C2E30] rounded-r-2xl gap-10 text-white p-6 max-h-20
                    grid grid-cols-5 grid-rows-1 font-bold
                ">
                    <h2>Nome</h2>
                    <h2>Data</h2>
                    <h2>Produtos</h2>
                    <h2>Total</h2>
                    <h2>Detalhes</h2>
                </div>
              {
                data?.pedidos.map((p) => {
                    return (
                        <div key={p.PedidoId} className="w-full flex-1 border-b-2 border-[#2C2E30] rounded-r-2xl gap-10 text-white p-6
                        max-h-20  grid grid-cols-5 grid-rows-1
                        ">
                            <h2 >{data.user.name}</h2>
                            <h2 >{dayjs(p.DataPedido).format("DD/MM/YYYY")}</h2>
                            <h2>{ p.Produtos.length}</h2>
                            <h2>R${p.ValorPedido}</h2>
                            <button><EllipsisVertical  className="hover:cursor-pointer"/></button>
                        </div>
                    )
                })
              }
            </div>  
        </main>
    )
}