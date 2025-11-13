import type { LoginResponseType } from "@/http/types/response-loginAdmin-type";
import type { LoginType } from "@/http/types/post-loginAdmin-type";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { authFetch } from "../authFetch";
import { CheckCookies } from "@/utils/useCheckCookies";

export const useLoginAdmin = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (data: LoginType) => {
            const response = await authFetch(`${API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error(`Erro ao atualizar status: ${response.status}`)
            }

            const result:Promise<LoginResponseType> = await response.json()
            return result
        },
        onSuccess: (data) => {
            const enabled = CheckCookies()
            if(!enabled && data.token){
                localStorage.setItem("token", data.token)
            }
            navigate("/dashboard")
        }
    })
}