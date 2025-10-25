import { useQuery } from "@tanstack/react-query"
import type { userFullType } from "./types/get-user-full-data-type"

export const useGetUserId = (id: string | undefined) => {
    return useQuery({
        queryKey: ['get-user-id'],
        queryFn: async (): Promise<userFullType> => {
            const response = await fetch(`http://localhost:3333/user_admin/${id}`, {
                credentials: 'include'
            })
            const data: userFullType = await response.json()
            return data;
        },
        enabled: !!id,
    })
}