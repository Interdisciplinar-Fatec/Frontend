import { useQuery } from "@tanstack/react-query"
import type { getOrderUserType } from "./types/get-orderUser-type"
import { API_URL } from "./api"

export const useGetOrdersUser = (userId: string | undefined) => {
  return useQuery<getOrderUserType | null>({
    queryKey: ['get-orders-user', userId],
    queryFn: async (): Promise<getOrderUserType | null> => {
      const response = await fetch(`${API_URL}/admin/order/${userId}`, {
        credentials: 'include',
      })

      if(response.status === 404) {
        return null
      }

      if (!response.ok) {
        throw new Error(`Erro ao buscar pedidos do usuário: ${response.status}`)
      }

      const data:getOrderUserType = await response.json()
      if(!data) return null

      return data
    },
    enabled: !!userId,
    retry: false,
  })
  }
