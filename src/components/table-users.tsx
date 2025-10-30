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
import type { getUserType } from "@/http/types/get-users-type"
import { useState } from "react"

export const TableUsers = ({data}: {data: getUserType | undefined}) => {
    const [copied, setCopied] = useState<boolean>(false)

    const handleToggleRow = async (id: string) => {
        try {
            await navigator.clipboard.writeText(id)
            setCopied(!copied)
            setInterval(() => setCopied(false), 2000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Table className="text-black">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-[#B1B3B6] font-bold">Nome</TableHead>
                    <TableHead className="text-[#B1B3B6] font-bold">Email</TableHead>
                    <TableHead className="text-[#B1B3B6] font-bold">Criação da conta</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="xs:text-xs overflow-x-auto">
                    {
                        data?.map(cell => {
                            const date = dayjs(cell.crated_at).format("DD/MM/YYYY")
                            return (
                                <TableRow key={cell.id} onClick={() => handleToggleRow(cell.id)}>
                                    <TableCell>{cell.name}</TableCell>
                                    <TableCell>{cell.email}</TableCell>
                                    <TableCell>{date}</TableCell>
                                </TableRow>
                            )
                        })
                    }
            </TableBody>
            <TableCaption></TableCaption>
        </Table>
    )
}