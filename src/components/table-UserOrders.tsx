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
import { useUpdateOrderStatus } from "@/http/patch/useUpdateOrderStatus"

export const TableUserOrders = ({data, admin}: {data: getOrderUserType, admin: boolean}, ) => {
    const statuses = ["Pendente", "Em Progresso", "Finalizado"]
    const [expandRow, setExpandRow] = useState<string | null>(null)
    const { mutate: updateStatus, isPending } = useUpdateOrderStatus()

    const handleToggleRow = (id: string) => {
        setExpandRow(expandRow === id ? null : id)
    }

    const handleChange = (pedidoId: string, userId: string, newStatus: string) => {
        updateStatus({ pedidoId, userId, status: newStatus })
    }

    const cliente = data.user.name

    return (
        <Table className="text-black">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-gray-400 font-bold">Cliente</TableHead>
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
                                        <TableCell>{cliente}</TableCell>
                                        <TableCell className="flex gap-1">
                                           {
                                            admin ? (
                                                 <select value={p.Status ?? ""}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                    disabled={isPending}
                                                    onChange={(e) => handleChange(p.PedidoId, data.user.id, e.target.value)}
                                                >
                                                    <option value={p.Status ?? ""}>{p.Status ?? "Selecione"}</option>
                                                    {statuses
                                                        .filter((s) => s !== p.Status) 
                                                        .map((s) => (
                                                        <option key={s} value={s}>
                                                            {s}
                                                        </option>
                                                        ))}
                                                </select>

                                            ) : (
                                                <h2>{p.Status}</h2>
                                            )
                                           }
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