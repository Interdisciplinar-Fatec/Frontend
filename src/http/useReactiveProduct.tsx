import { useMutation } from "@tanstack/react-query"
import { API_URL } from "./api"
import { useQueryClient } from "@tanstack/react-query"

export const useReactiveProdcuts = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${API_URL}/admin/product/reactivate/${id}`, {
                method: "PATCH",
                credentials: "include"
            })

            if(response.status === 404) {
                throw new Error("Produto não encontrado");
            }

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data = await response.json()
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['get-products'] })
            await queryClient.invalidateQueries({ queryKey: ['get-product-name'] })
            await queryClient.invalidateQueries({ queryKey: ['get-products-desactivated']})
        }
    })
}