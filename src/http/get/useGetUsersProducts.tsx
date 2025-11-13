import { useQuery } from "@tanstack/react-query"
import { type getProductType } from "../types/get-product-type"
import { API_URL } from "../api"
import { authFetch } from "../authFetch"

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['get-products'],
        queryFn: async (): Promise<getProductType> => {
            const response = await authFetch(`${API_URL}/admin/products`, {})

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: getProductType = await response.json()
            return data;
        }
    })
}