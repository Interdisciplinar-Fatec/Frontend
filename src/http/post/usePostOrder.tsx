import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { PostOrderType } from "@/http/types/post-order-type"
import { API_URL } from "@/http/api"
import { authFetch } from "../authFetch"

export const usePostOrder = () => {
    const queryCLient = useQueryClient()

    type Result = {
        id_pedido: string,
        id_user: string
    }

    return useMutation({
        mutationKey: ['post-produt'],
        mutationFn: async (data: PostOrderType) => {
            const response = await authFetch(`${API_URL}/admin/order`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const result: Result = await response.json()
            return result;
        },
        onSuccess: () => {
            queryCLient.invalidateQueries({queryKey: ['get-orders'],})
        }
    })
}