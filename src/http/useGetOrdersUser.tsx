import { useQuery } from "@tanstack/react-query"
import type { getOrderUserType } from "./types/get-orderUser-type"

export const useGetOrdersUser = (id: string | undefined) => {
    return useQuery({
        queryKey: ['get-orders-user'],
        queryFn: async (): Promise<getOrderUserType> => {
            const response = await fetch(`http://localhost:3333/admin/order/${id}`, {
                credentials: 'include'
            })
            const data: getOrderUserType = await response.json()
            return data;
        },
        enabled: !!id,
    })
}