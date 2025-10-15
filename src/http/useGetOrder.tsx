import { useQuery } from "@tanstack/react-query"

export const useGetOrder = ()=> {
    return useQuery({
        queryKey: ['get-user-order'],
        queryFn: async () => {
            const result = await fetch("http://localhost:3333/order", {
                credentials: 'include'
            })
            const data = result.json()
            return data;
        }
    })
}