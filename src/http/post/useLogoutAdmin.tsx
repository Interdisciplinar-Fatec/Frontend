import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_URL } from "../api"
import { authFetch } from "../authFetch"
import { useNavigate } from "react-router-dom"


export const useLogoutAdmin = () => {
    const QueryClient = useQueryClient() 
    const navigate = useNavigate()

    return useMutation({
        mutationKey: ['admin-logout'],
        mutationFn: async () => {

            const response = await authFetch(`${API_URL}/admin/logout`, {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            
            if (localStorage.getItem("token")) {
                localStorage.removeItem("token")
            }

            const data: {message: string}  = await response.json()
            return data;
        },
        onSuccess: () => {
            QueryClient.invalidateQueries({queryKey: ['auth-admin']})
            navigate("/")
        }
    })
}