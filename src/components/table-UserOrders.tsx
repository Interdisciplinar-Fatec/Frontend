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

export const TableUserOrders = ({ data, admin }: { data: getOrderUserType; admin: boolean }) => {
    const statuses = ["Pendente", "Em Progresso", "Finalizado"]
    const [expandRow, setExpandRow] = useState<string | null>(null)
    const { mutate: updateStatus, isPending } = useUpdateOrderStatus()

    const handleToggleRow = (id: string) => setExpandRow(expandRow === id ? null : id)
    const handleChange = (pedidoId: string, userId: string, newStatus: string) => {
        updateStatus({ pedidoId, userId, status: newStatus })
    }

    const cliente = data.user.name

    return (
        <Table className="w-full bg-white text-black rounded-lg shadow overflow-hidden">
            {/* Cabeçalho */}
            <TableHeader>
                <TableRow className="bg-gray-200 border-b-2 border-gray-300">
                    <TableHead className="text-black font-bold p-3">Cliente</TableHead>
                    <TableHead className="text-black font-bold p-3">Status</TableHead>
                    <TableHead className="text-black font-bold p-3">Data</TableHead>
                    <TableHead className="text-black font-bold p-3">Quantidade</TableHead>
                    <TableHead className="text-black font-bold p-3">Valor</TableHead>
                </TableRow>
            </TableHeader>

            {/* Corpo da tabela */}
            <TableBody>
                {data.pedidos.length <= 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="p-4 text-center text-gray-400">
                            Sem pedidos
                        </TableCell>
                    </TableRow>
                ) : (
                    data.pedidos.map((p, index) => (
                        <Fragment key={p.PedidoId}>
                            {/* Linha principal */}
                            <TableRow
                                onClick={() => handleToggleRow(p.PedidoId)}
                                className={`cursor-pointer transition-colors duration-200 ${
                                    expandRow === p.PedidoId
                                        ? "bg-gray-100"
                                        : index % 2 === 0
                                        ? "bg-white hover:bg-gray-50"
                                        : "bg-gray-50 hover:bg-gray-100"
                                }`}
                            >
                                <TableCell className="p-3">{cliente}</TableCell>
                                <TableCell className="p-3">
                                    {admin ? (
                                        <select
                                            value={p.Status ?? ""}
                                            className="border border-gray-400 rounded px-2 py-1 bg-white text-black"
                                            disabled={isPending}
                                            onChange={(e) =>
                                                handleChange(p.PedidoId, data.user.id, e.target.value)
                                            }
                                        >
                                            <option value={p.Status ?? ""}>
                                                {p.Status ?? "Selecione"}
                                            </option>
                                            {statuses
                                                .filter((s) => s !== p.Status)
                                                .map((s) => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                        </select>
                                    ) : (
                                        <p
                                            className={`font-semibold ${
                                                p.Status === "Finalizado"
                                                    ? "text-green-500"
                                                    : p.Status === "Em Progresso"
                                                    ? "text-orange-500"
                                                    : "text-orange-500"
                                            }`}
                                        >
                                            {p.Status}
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell className="p-3">{dayjs(p.DataPedido).format("DD/MM/YYYY")}</TableCell>
                                <TableCell className="p-3">{p.Produtos.length}</TableCell>
                                <TableCell className="p-3">{p.ValorPedido}</TableCell>
                            </TableRow>

                            {/* Linha expandida */}
                            <TableRow>
                                <TableCell colSpan={5} className="p-0">
                                    <div
                                        className={`transition-all duration-200 ${
                                            expandRow === p.PedidoId
                                                ? "opacity-100 bg-gray-100 text-gray-700 rounded-b-lg flex border-l-4 border-orange-500"
                                                : "opacity-0 h-0"
                                        }`}
                                    >
                                        {expandRow === p.PedidoId && (
                                            <div className="p-4 flex-1">
                                                <strong className="text-orange-500">Produtos:</strong>
                                                <ul className="pl-4 list-disc text-gray-700">
                                                    {p.Produtos.map((pr) => (
                                                        <li key={pr.id}>
                                                            {pr.Nome} — {pr.Preco}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {p.descricaoPedido && (
                                                    <>
                                                        <strong className="block mt-2 text-orange-500">
                                                            Descrição:
                                                        </strong>
                                                        <p>{p.descricaoPedido}</p>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        </Fragment>
                    ))
                )}
            </TableBody>

            <TableCaption></TableCaption>
        </Table>
    )
}
