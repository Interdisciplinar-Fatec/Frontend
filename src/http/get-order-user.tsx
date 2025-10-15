import type { getOrderUserType } from "../types/get-orderUser-type"

export const getOrderUser = async (CPF: string) => {
    const data = await fetch(`http://localhost:3333/user/${CPF}`, {
        credentials: "include"
    })
    const result:Promise<getOrderUserType> = data.json()

    return result;
}