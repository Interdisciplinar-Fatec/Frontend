import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { PostOrderType } from "./types/post-order-type"
import { API_URL } from "./api"

export const usePostOrder = () => {
    const queryCLient = useQueryClient()

    type Result = {
        id_pedido: string,
        id_user: string
    }

    return useMutation({
        mutationKey: ['post-produt'],
        mutationFn: async (data: PostOrderType) => {
            const response = await fetch(`${API_URL}/admin/order`, {
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