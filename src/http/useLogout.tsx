import { useMutation } from "@tanstack/react-query"
import { API_URL } from "./api"

export const useLogoutUser = () => {
    return useMutation({
        mutationKey: ['user-logout'],
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/user/logout`, {
                method: 'POST',
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: {message: string}  = await response.json()
            return data;
        },
    })
}