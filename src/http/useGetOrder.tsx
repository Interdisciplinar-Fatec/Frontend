import { useQuery } from "@tanstack/react-query"
import type { getOrderUserType } from "./types/get-orderUser-type"


export const useGetOrder = ()=> {
    return useQuery({
        queryKey: ['get-user-order'],
        queryFn: async (): Promise<getOrderUserType> => {
            const result = await fetch("http://localhost:3333/order", {
                credentials: 'include'
            })
            const data: Promise<getOrderUserType>= result.json()
            return data;
        }
    })
}