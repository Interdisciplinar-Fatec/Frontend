import { useQuery } from "@tanstack/react-query"
import type { getOrderUserType } from "./types/get-orderUser-type"
import { API_URL } from "./api"

export const useGetOrder = ()=> {
    return useQuery({
        queryKey: ['get-user-order'],
        queryFn: async (): Promise<getOrderUserType> => {
            const result = await fetch(`${API_URL}/order`, {
                credentials: 'include'
            })
            const data: Promise<getOrderUserType>= result.json()
            return data;
        }
    })
}