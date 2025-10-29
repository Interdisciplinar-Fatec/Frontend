import { useQuery } from "@tanstack/react-query"
import { type orderType } from "@/http/types/response-orders-type"
import { API_URL } from "./api"

export const useGetOrders = () => {
    return useQuery({
        queryKey: ['get-orders'],
        queryFn: async (): Promise<orderType[]> => {
            const response = await fetch(`${API_URL}/admin/orders`, {
                credentials: 'include'
            })
            const data: orderType[] = await response.json()
            return data;
        },
    })
}