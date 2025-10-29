import { useQuery } from "@tanstack/react-query"
import type { userFullType } from "./types/get-user-full-data-type"
import { API_URL } from "./api"

export const useGetUserId = (id: string | undefined) => {
    return useQuery({
        queryKey: ['get-user-id'],
        queryFn: async (): Promise<userFullType> => {
            const response = await fetch(`${API_URL}/admin/user/${id}`, {
                credentials: 'include'
            })
            const data: userFullType = await response.json()
            return data;
        },
        enabled: !!id,
    })
}