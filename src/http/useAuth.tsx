import { useQuery } from "@tanstack/react-query"

export const useAuth = () => {
    return useQuery({
        queryKey: ['auth-admin'],
        queryFn: async () => {
            const result = await fetch("http://localhost:3333/auth", {credentials: 'include'})
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