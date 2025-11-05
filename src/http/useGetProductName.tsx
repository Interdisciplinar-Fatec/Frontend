import { useQuery } from "@tanstack/react-query"
import type { getProductType } from "./types/get-product-type"
import { API_URL } from "./api"

export const useGetProductName = (nome: string | undefined) => {
    return useQuery({
        queryKey: ['get-product-name', nome],
        queryFn: async (): Promise<getProductType> => {
            const response = await fetch(`${API_URL}/admin/product/${nome}`, {
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: getProductType = await response.json()
            return data;
        },
        enabled: !!nome,
    })
}