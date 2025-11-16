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
import type { userFullType } from "@/http/types/get-user-full-data-type"
import { isUserFullArray } from "@/utils/typeGuardUser"

export const TableUsers = ({data}: {data: getUserType | userFullType | undefined}) => {
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

    if(!data) return null

    const isFull = isUserFullArray(data)
    return (
        <Table className="text-black">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-[#B1B3B6] font-bold">Nome</TableHead>
                    {
                        isFull && (
                            <>
                                <TableHead className="text-[#B1B3B6] font-bold">CPF</TableHead>
                                <TableHead className="text-[#B1B3B6] font-bold">Telefone</TableHead>
                                <TableHead className="text-[#B1B3B6] font-bold">Endereço</TableHead>
                            </>
                        )
                    }   
                    <TableHead className="text-[#B1B3B6] font-bold">Email</TableHead>
                    <TableHead className="text-[#B1B3B6] font-bold">Criação da conta</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="xs:text-xs overflow-x-auto">
                    {
                        isFull ? (
                            (data as userFullType).map(cell => {
                                const date = dayjs(cell.created_at).format("DD/MM/YYYY")
                                return (
                                    <TableRow className="cursor-pointer" key={cell.id} onClick={() => handleToggleRow(cell.id)}>
                                        <TableCell>{cell.name}</TableCell>
                                        <TableCell>{cell.CPF}</TableCell>
                                        <TableCell>{cell.telefone}</TableCell>
                                        <TableCell>{cell.endereco}</TableCell>
                                        <TableCell>{cell.email}</TableCell>
                                        <TableCell>{date}</TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            (data as getUserType).map(cell => {
                                const date = dayjs(cell.created_at).format("DD/MM/YYYY")
                                return (
                                    <TableRow className="cursor-pointer" key={cell.id} onClick={() => handleToggleRow(cell.id)}>
                                        <TableCell>{cell.name}</TableCell>
                                        <TableCell>{cell.email}</TableCell>
                                        <TableCell>{date}</TableCell>
                                    </TableRow>
                                )
                            })
                        )
                    }
            </TableBody>
            <TableCaption></TableCaption>
        </Table>
    )
}