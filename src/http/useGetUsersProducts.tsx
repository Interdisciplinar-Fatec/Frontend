import { useQuery } from "@tanstack/react-query"
import { type getProductType } from "./types/get-product-type"

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['get-products'],
        queryFn: async (): Promise<getProductType> => {
            const response = await fetch("http://localhost:3333/admin/products", {
                credentials: 'include'
            })
            const data: getProductType = await response.json()
            return data;
        }
    })
}