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
import { Fragment, useState } from "react"


export const TableUserOrders = ({data}: {data: getOrderUserType}) => {
    const [expandRow, setExpandRow] = useState<string | null>(null)
    const handleToggleRow = (id: string) => {
        setExpandRow(expandRow === id ? null : id)
    }

    return (
        <Table className="text-black">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-gray-400 font-bold">Status</TableHead>
                    <TableHead className="text-gray-400 font-bold">Data</TableHead>
                    <TableHead className="text-gray-400 font-bold">Quantidade</TableHead>
                    <TableHead className="text-gray-400 font-bold">Valor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="xs:text-xs overflow-x-auto">
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
                                    <TableRow key={p.PedidoId} onClick={() => handleToggleRow(p.PedidoId)} className={`cursor-pointer ${expandRow === p.PedidoId ? "bg-gray-100" : "bg-transparent"}`}>
                                        <TableCell className="flex gap-1">
                                            <h2>{p.Status}</h2>
                                        </TableCell>
                                        <TableCell>{dayjs(p.DataPedido).format("DD/MM/YYYY")}</TableCell>
                                        <TableCell>{ p.Produtos.length}</TableCell>
                                        <TableCell>{p.ValorPedido}</TableCell>
                                </TableRow> 

                                <TableRow
                                    className={`cursor-pointer ${
                                    expandRow === p.PedidoId ? "max-h-[400px]" : "max-h-0"
                                    }`}
                                >
                                    <TableCell colSpan={4} className="p-0 bg-gray-50">
                                    <div className={`${expandRow === p.PedidoId ? "p-4 opacity-100" : "p-0 opacity-0"}`}>
                                        {expandRow === p.PedidoId && (
                                        <div className="text-sm text-gray-500">
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
    )
}