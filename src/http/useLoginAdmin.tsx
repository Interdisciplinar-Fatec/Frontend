import type { LoginResponseType } from "@/http/types/response-loginAdmin-type";
import type { LoginType } from "@/http/types/post-loginAdmin-type";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLoginAdmin = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (data: LoginType) => {
            const result = await fetch('http://localhost:3333/login', {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            const response:Promise<LoginResponseType> = await result.json()
            return response
        },
        onSuccess: () => {
            navigate("/dashboard")
        }
    })
}