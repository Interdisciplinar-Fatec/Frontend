import { useMutation } from "@tanstack/react-query"
import { API_URL } from "./api"

export const useLogoutAdmin = () => {
    return useMutation({
        mutationKey: ['admin-logout'],
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/admin/logout`, {
                method: 'POST',
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: {message: string}  = await response.json()
            return data;
        }
    })
}