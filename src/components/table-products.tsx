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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { getProductType } from "@/http/types/get-product-type"
import { useDesactiveProdcuts } from "@/http/patch/useDesactiveProduct"
import { useReactiveProdcuts } from "@/http/patch/useReactiveProduct"
import { DatabaseBackup, Trash } from "lucide-react"
import { Button } from "./ui/button"

export const TableProducts = ({data, switchBtn}: {data: getProductType | undefined, switchBtn: boolean}) => {
    const {mutateAsync: desactiveProduct} = useDesactiveProdcuts()
    const {mutateAsync: reactiveProduct} = useReactiveProdcuts()
    
    const handleTrashBtn = async (id: string) => {
        await desactiveProduct(id)
    }
    const handleResotrehBtn = async (id: string) => {
       await reactiveProduct(id)
    }

    return (
        <div>
            <Table className="text-black">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-[#B1B3B6] font-bold">Id Produto</TableHead>
                        <TableHead className="text-[#B1B3B6] font-bold">Nome</TableHead>
                        <TableHead className="text-[#B1B3B6] font-bold">Marca</TableHead>
                        <TableHead className="text-[#B1B3B6] font-bold">Preço</TableHead>
                        <TableHead className="text-[#B1B3B6] font-bold">Descrição</TableHead>
                        <TableHead className="text-[#B1B3B6] font-bold"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-xs overflow-x-auto">
                        {
                            data?.map(cell => {
                                return (
                                    <TableRow key={cell.id}>
                                        <TableCell>{cell.id}</TableCell>
                                        <TableCell>{cell.nome}</TableCell>
                                        <TableCell>{cell.marca}</TableCell>
                                        <TableCell>{cell.preco}</TableCell>
                                        <TableCell>{cell.descricao ? cell.descricao : "Sem descrição"}</TableCell>
                                        <TableCell>
                                           {
                                                switchBtn ? (
                                                    <button onClick={() => handleResotrehBtn(cell.id)}>
                                                        <DatabaseBackup className="w-5 h-5 text-gray-400" />
                                                    </button>
                                                )
                                                : (
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <Trash className="w-5 h-5 text-gray-400" />
                                                        </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Desativar produto</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                            Tem certeza que deseja desativar <b>{cell.nome}</b>?<br />
                                                            Ele aparecerá na aba de produtos desativados.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleTrashBtn(cell.id)}>
                                                            Confirmar
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                )
                                           }
                                        </TableCell>
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