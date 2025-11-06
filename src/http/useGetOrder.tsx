import { useQuery } from "@tanstack/react-query"
import type { getOrderUserType } from "./types/get-orderUser-type"
import { API_URL } from "./api"

export const useGetOrder = ()=> {
    return useQuery({
        queryKey: ['get-user-order'],
        queryFn: async (): Promise<getOrderUserType> => {
            const response = await fetch(`${API_URL}/order`, {
                credentials: 'include'
            })

             if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: Promise<getOrderUserType>= response.json()
            return data;
        }
    })
}