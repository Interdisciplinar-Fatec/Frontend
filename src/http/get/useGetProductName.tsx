import { useQuery } from "@tanstack/react-query"
import type { getProductType } from "../types/get-product-type"
import { API_URL } from "../api"
import { authFetch } from "../authFetch"

export const useGetProductName = (nome: string | undefined) => {
    return useQuery({
        queryKey: ['get-product-name', nome],
        queryFn: async (): Promise<getProductType> => {
            const response = await authFetch(`${API_URL}/admin/product/${nome}`, {})

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: getProductType = await response.json()
            return data;
        },
        enabled: !!nome,
    })
}