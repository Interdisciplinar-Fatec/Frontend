import dayjs from "dayjs"
import {
    Table,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCaption,
    TableCell
} from "@/components/ui/table"
import type { orderType } from "@/http/types/response-orders-type"
import { useUpdateOrderStatus } from "@/http/useUpdateOrderStatus"

export const TableOrders = ({data}: {data: orderType[]}) => {
    const statuses = ["pendente", "em progresso", "finalizado"]
     const { mutate: updateStatus, isPending } = useUpdateOrderStatus()

    const handleChange = (pedidoId: string, userId: string, newStatus: string) => {
        updateStatus({ pedidoId, userId, status: newStatus })
    }

    return (
        <Table className="text-black">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-[#B1B3B6] font-bold">Id Pedido</TableHead>
                    <TableHead className="text-[#B1B3B6] font-bold">Id Cliente</TableHead>
                    <TableHead className="text-[#B1B3B6] font-bold">Status</TableHead>
                    <TableHead className="text-[#B1B3B6] font-bold">Data</TableHead>
                    <TableHead className="text-[#B1B3B6] font-bold">Total do serviço</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="xs:text-xs overflow-x-auto">
                {
                    data.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="p-0">
                                    <div className="w-full text-center mt-2">
                                        Sem pedidos
                                    </div>
                                </TableCell>
                        </TableRow>     
                    ): data?.map((p) => {
                        return (
                            <TableRow key={p.id} >
                                <TableCell>{p.id}</TableCell>
                                <TableCell>{p.id_user}</TableCell>
                                <TableCell>
                                    <select value={p.status ?? ""}
                                        className="border border-gray-300 rounded px-2 py-1"
                                        disabled={isPending}
                                        onChange={(e) => handleChange(p.id, p.id_user, e.target.value)}
                                    >
                                        <option value={p.status ?? ""}>{p.status ?? "Selecione"}</option>
                                        {statuses
                                            .filter((s) => s !== p.status)
                                            .map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                            ))}
                                        </select>

                                </TableCell>
                                <TableCell>{dayjs(p.data_pedido).format("DD/MM/YYYY")}</TableCell>
                                <TableCell>{p.valor_total}</TableCell>
                        </TableRow> 
                        )
                    })
                }
            </TableBody>
            <TableCaption></TableCaption>
        </Table>  
    )
}