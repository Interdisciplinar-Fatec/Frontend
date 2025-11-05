import { useQuery } from "@tanstack/react-query"
import { type getProductType } from "./types/get-product-type"
import { API_URL } from "./api"

export const useGetProductsDesactivated = () => {
    return useQuery({
        queryKey: ['get-products-desactivated'],
        queryFn: async (): Promise<getProductType> => {
            const response = await fetch(`${API_URL}/admin/products/desactivated`, {
                credentials: 'include'
            })
            const data: getProductType = await response.json()
            return data;
        }
    })
}