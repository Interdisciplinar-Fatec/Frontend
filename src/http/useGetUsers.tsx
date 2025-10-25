import { useQuery } from "@tanstack/react-query"
import type { getUserType } from "./types/get-users-type"

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['get-users'],
        queryFn: async (): Promise<getUserType> => {
            const response = await fetch("http://localhost:3333/users_admin", {
                credentials: 'include'
            })
            const data: getUserType = await response.json()
            return data;
        }
    })
}