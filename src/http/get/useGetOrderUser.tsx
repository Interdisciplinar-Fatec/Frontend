import { CheckCookies } from "@/utils/useCheckCookies";
import { API_URL } from "../api";
import { authFetch } from "../authFetch";
import type { getOrderUserType } from "../types/get-orderUser-type"

export const getOrderUser = async (CPF: string): Promise<getOrderUserType | { adminCPF: boolean }> => {

    const data = await authFetch(`${API_URL}/user/${CPF}`, {})

    if(data.status === 201) {
        const result = await data.json()

       if(!result.userId){ throw new Error("UserId não encontrado")}
        const enabled = CheckCookies()
        if(!enabled ) localStorage.setItem("userId", result.userId)
        return result as getOrderUserType;
    }

    if(data.status === 200) {
        const result = await data.json()
        return result as {adminCPF: boolean};
    }
 
    throw new Error("Erro inesperado")
}