import { useQuery } from "@tanstack/react-query"
import type { userFullType } from "./types/get-user-full-data-type"
import { API_URL } from "./api"

export const useGetUserId = (id: string | undefined) => {
    return useQuery<userFullType | null>({
        queryKey: ['get-user-id', id],
        queryFn: async (): Promise<userFullType | null> => {
            const response = await fetch(`${API_URL}/admin/user/${id}`, {
                credentials: 'include'
            })

            if (response.status === 404) return null
            if (!response.ok) {
                const text = await response.text()
                throw new Error(text || 'Erro na requisição')
            }

            const data = await response.json()

            if(data.length === 0) { return null }

            return data as userFullType
        },
        enabled: !!id,
        retry: false,
    })
}