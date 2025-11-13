import { useQuery } from "@tanstack/react-query"
import { type getProductType } from "../types/get-product-type"
import { API_URL } from "../api"
import { authFetch } from "../authFetch"

export const useGetProductsDesactivated = () => {
    return useQuery({
        queryKey: ['get-products-desactivated'],
        queryFn: async (): Promise<getProductType> => {
            const response = await authFetch(`${API_URL}/admin/products/desactivated`, {})
            const data: getProductType = await response.json()
            return data;
        }
    })
}