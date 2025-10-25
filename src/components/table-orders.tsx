import dayjs from "dayjs"
import { type getOrderUserType } from "@/http/types/get-orderUser-type"
import {
    Table,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCaption,
    TableCell
} from "@/components/ui/table"
import { 
    Card,
    CardTitle,
    CardContent,
    CardDescription,
    CardHeader,
 } from "./ui/card"
import { Fragment, useState } from "react"


export const TableOrders = ({data}: {data: getOrderUserType}) => {
    const [expandRow, setExpandRow] = useState<string | null>(null)
    const handleToggleRow = (id: string) => {
        setExpandRow(expandRow === id ? null : id)
    }

    return (
         <Card className="bg-[#1d1e1f] max-w-5xl p-6 space-y-4 shadow-[rgba(0, 0, 0, 0.24)_0px_3px_8px] border-black border-[0.005px]">
            <CardHeader>
                <CardTitle className="font-bold text-[#F5F5F5]">Meus Pedidos</CardTitle>
                <CardDescription className="text-[#B1B3B6]">Listagem dos pedidos de eletrodomesticos para concertos</CardDescription>
            </CardHeader>
            <CardContent>
                <Table className="text-white">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-[#B1B3B6] font-bold">Status</TableHead>
                            <TableHead className="text-[#B1B3B6] font-bold">Data</TableHead>
                            <TableHead className="text-[#B1B3B6] font-bold">Quantidade</TableHead>
                            <TableHead className="text-[#B1B3B6] font-bold">Valor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                             data.pedidos.length <= 0 ? (
                                  <TableRow>
                                        <TableCell colSpan={4} className="p-0">
                                           <div className="w-full text-center mt-2">
                                                Sem pedidos
                                           </div>
                                        </TableCell>
                                </TableRow>     
                            ): data?.pedidos.map((p) => {
                                return (
                                    <Fragment key={p.PedidoId}>
                                         <TableRow key={p.PedidoId} onClick={() => handleToggleRow(p.PedidoId)} className={`cursor-pointer ${expandRow === p.PedidoId ? "bg-[#4A4C4F]" : "bg-transparent"}`}>
                                                <TableCell className="flex gap-1">
                                                    <h2>{p.Status}</h2>
                                                </TableCell>
                                                <TableCell>{dayjs(p.DataPedido).format("DD/MM/YYYY")}</TableCell>
                                                <TableCell>{ p.Produtos.length}</TableCell>
                                                <TableCell>{p.ValorPedido}</TableCell>
                                        </TableRow> 

                                        <TableRow
                                            className={`cursor-pointer bg-[#4A4C4F] ${
                                            expandRow === p.PedidoId ? "max-h-[400px]" : "max-h-0"
                                            }`}
                                        >
                                            <TableCell colSpan={4} className="p-0">
                                            <div className={`${expandRow === p.PedidoId ? "p-4 opacity-100" : "p-0 opacity-0"}`}>
                                                {expandRow === p.PedidoId && (
                                                <div className="text-sm text-gray-200">
                                                    <strong>Produtos:</strong>
                                                    <ul className="pl-4 list-disc">
                                                    {p.Produtos.map((pr) => (
                                                        <li key={pr.id}>
                                                        {pr.Nome} — {pr.Preco}
                                                        </li>
                                                    ))}
                                                    </ul>

                                                    {p.descricaoPedido && (
                                                    <>
                                                        <strong className="block mt-2">Descrição:</strong>
                                                        <p>{p.descricaoPedido}</p>
                                                    </>
                                                    )}
                                                </div>
                                                )}
                                            </div>
                                            </TableCell>
                                        </TableRow>     
                                    </Fragment>                 
                                )
                            })
                        }
                    </TableBody>
                    <TableCaption></TableCaption>
                </Table>
            </CardContent>
        </Card>  
    )
}