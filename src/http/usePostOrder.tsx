import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { PostOrderType } from "./types/post-order-type"

export const usePostOrder = () => {
    const queryCLient = useQueryClient()

    type Result = {
        id_pedido: string,
        id_user: string
    }

    return useMutation({
        mutationKey: ['post-produt'],
        mutationFn: async (data: PostOrderType) => {
            const response = await fetch("http://localhost:3333/admin/order", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })
            const result: Result = await response.json()
            return result;
        },
        onSuccess: () => {
            queryCLient.invalidateQueries({queryKey: ['get-orders'],})
        }
    })
}