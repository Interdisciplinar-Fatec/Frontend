import { useQuery } from "@tanstack/react-query"
import type { getProductType } from "./types/get-product-type"
import { API_URL } from "./api"

export const useGetProductName = (nome: string | undefined) => {
    return useQuery({
        queryKey: ['get-product-name'],
        queryFn: async (): Promise<getProductType> => {
            const response = await fetch(`${API_URL}/admin/product/${nome}`, {
                credentials: 'include'
            })
            const data: getProductType = await response.json()
            return data;
        },
        enabled: !!nome,
    })
}