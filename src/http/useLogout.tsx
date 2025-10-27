import { useMutation } from "@tanstack/react-query"

export const useLogoutUser = () => {
    return useMutation({
        mutationKey: ['user-logout'],
        mutationFn: async () => {
            const response = await fetch("http://localhost:3333/user/logout", {
                credentials: 'include'
            })
            const data: {message: string}  = await response.json()
            return data;
        },
    })
}