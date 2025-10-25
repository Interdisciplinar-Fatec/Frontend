import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { createProdcutType } from "./types/get-product-type"
import type { responseProductType } from "./types/response-product-type"

export const usePostProduct = () => {
    const queryCLient = useQueryClient()

    return useMutation({
        mutationKey: ['post-produt'],
        mutationFn: async (data: createProdcutType) => {
            const response = await fetch("http://localhost:3333/product_admin", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })
            const result:responseProductType = await response.json()
            return result;
        },
        onSuccess: () => {
            queryCLient.invalidateQueries({queryKey: ['get-products']})
        }
    })
}