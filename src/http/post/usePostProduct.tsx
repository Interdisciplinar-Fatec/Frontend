import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { createProdcutType } from "@/http/types/get-product-type"
import type { responseProductType } from "@/http/types/response-product-type"
import { API_URL } from "@/http/api"
import { authFetch } from "../authFetch"

export const usePostProduct = () => {
    const queryCLient = useQueryClient()

    return useMutation({
        mutationKey: ['post-produt'],
        mutationFn: async (data: createProdcutType) => {
            const response = await authFetch(`${API_URL}/admin/product`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const result:responseProductType = await response.json()
            return result;
        },
        onSuccess: () => {
            queryCLient.invalidateQueries({queryKey: ['get-products']})
        }
    })
}