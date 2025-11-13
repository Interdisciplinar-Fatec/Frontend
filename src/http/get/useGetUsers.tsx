import { useQuery } from "@tanstack/react-query"
import type { getUserType } from "../types/get-users-type"
import { API_URL } from "../api"
import { authFetch } from "../authFetch"

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['get-users'],
        queryFn: async (): Promise<getUserType> => {
            const response = await authFetch(`${API_URL}/admin/users`, {})

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: getUserType = await response.json()
            return data;
        }
    })
}