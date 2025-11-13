import { useMutation } from "@tanstack/react-query"
import { API_URL } from "../api"
import { useNavigate } from "react-router-dom"
import { authFetch } from "../authFetch"


export const useLogoutUser = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationKey: ['user-logout'],
        mutationFn: async () => {

            if (localStorage.getItem("userId")) {
                localStorage.removeItem("userId")
            }

            const response = await authFetch(`${API_URL}/user/logout`, {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const data: {message: string}  = await response.json()
            return data;
        },
        onSuccess: () => {
            navigate("/", {replace: true})
        }
    })
}