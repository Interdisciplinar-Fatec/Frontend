import { useQuery } from "@tanstack/react-query"
import type { getOrderUserType } from "../types/get-orderUser-type"
import { API_URL } from "../api"
import { authFetch } from "../authFetch"

export const useGetOrder = ()=> {
    return useQuery({
        queryKey: ['get-user-order'],
        queryFn: async (): Promise<getOrderUserType> => {
            const userId = localStorage.getItem("userId")
            const response = await authFetch(`${API_URL}/order/${userId || 1}`, {})

             if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: Promise<getOrderUserType>= response.json()
            return data;
        }
    })
}