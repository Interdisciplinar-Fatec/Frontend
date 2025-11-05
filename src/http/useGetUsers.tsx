import { useQuery } from "@tanstack/react-query"
import type { getUserType } from "./types/get-users-type"
import { API_URL } from "./api"

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['get-users'],
        queryFn: async (): Promise<getUserType> => {
            const response = await fetch(`${API_URL}/admin/users`, {
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: getUserType = await response.json()
            return data;
        }
    })
}