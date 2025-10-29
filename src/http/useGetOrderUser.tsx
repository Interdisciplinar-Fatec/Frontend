import { API_URL } from "./api";
import type { getOrderUserType } from "./types/get-orderUser-type"

export const getOrderUser = async (CPF: string): Promise<getOrderUserType | { adminCPF: boolean }> => {

    const data = await fetch(`${API_URL}/user/${CPF}`, {
        credentials: "include"
    })

    if(data.status === 201) {
        const result = await data.json()
        return result as getOrderUserType;
    }

    if(data.status === 200) {
        const result = await data.json()
        return result as {adminCPF: boolean};
    }
 
    throw new Error("Erro inesperado")
}