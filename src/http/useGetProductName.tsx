import { useQuery } from "@tanstack/react-query"
import type { getProductType } from "./types/get-product-type"

export const useGetProductName = (nome: string | undefined) => {
    return useQuery({
        queryKey: ['get-product-name'],
        queryFn: async (): Promise<getProductType> => {
            const response = await fetch(`http://localhost:3333/product_admin/${nome}`, {
                credentials: 'include'
            })
            const data: getProductType = await response.json()
            return data;
        },
        enabled: !!nome,
    })
}