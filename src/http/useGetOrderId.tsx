import { useQuery } from "@tanstack/react-query"
import { type orderType } from "@/http/types/response-orders-type"

export const useGetOrders = () => {
    return useQuery({
        queryKey: ['get-orders'],
        queryFn: async (): Promise<orderType[]> => {
            const response = await fetch(`http://localhost:3333/admin/orders`, {
                credentials: 'include'
            })
            const data: orderType[] = await response.json()
            return data;
        },
    })
}