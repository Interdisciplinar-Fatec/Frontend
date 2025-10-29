import { useQuery } from "@tanstack/react-query"
import { API_URL } from "./api";

export const useAuth = () => {
    return useQuery({
        queryKey: ['auth-admin'],
        queryFn: async () => {
            const result = await fetch(`${API_URL}/auth`, {credentials: 'include'})
            const data = await result.json();

            return {
                ok: result.ok,
                statusCode: result.status,
                ...data
            };
        },
        retry: false, 
    })
}