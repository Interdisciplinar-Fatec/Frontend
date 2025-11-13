import { useQuery } from "@tanstack/react-query"
import { type orderType } from "@/http/types/response-orders-type"
import { API_URL } from "../api"
import { authFetch } from "../authFetch"

export const useGetOrders = () => {
    return useQuery({
        queryKey: ['get-orders'],
        queryFn: async (): Promise<orderType[]> => {
            const response = await authFetch(`${API_URL}/admin/orders`, {})

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: orderType[] = await response.json()
            return data;
        },
    })
}