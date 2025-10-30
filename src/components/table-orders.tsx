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

export const TableOrders = ({data}: {data: orderType[]}) => {
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
                                <TableCell>{p.status}</TableCell>
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