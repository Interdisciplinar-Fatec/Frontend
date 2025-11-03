import {
    Table,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCaption,
    TableCell
} from "@/components/ui/table"
import type { getProductType } from "@/http/types/get-product-type"

export const TableProducts = ({data}: {data: getProductType | undefined}) => {
    return (
        <div>
            <h2>Produtos Cadastrados: </h2>
            <Table className="text-black">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-[#B1B3B6] font-bold">Nome</TableHead>
                        <TableHead className="text-[#B1B3B6] font-bold">Marca</TableHead>
                        <TableHead className="text-[#B1B3B6] font-bold">Preço</TableHead>
                        <TableHead className="text-[#B1B3B6] font-bold">Descrição</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-xs overflow-x-auto">
                        {
                            data?.map(cell => {
                                return (
                                    <TableRow key={cell.id}>
                                        <TableCell>{cell.nome}</TableCell>
                                        <TableCell>{cell.marca}</TableCell>
                                        <TableCell>{cell.preco}</TableCell>
                                        <TableCell>{cell.descricao ? cell.descricao : "Sem descrição"}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                </TableBody>
                <TableCaption></TableCaption>
            </Table>
        </div>
    )
}