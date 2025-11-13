// src/http/use-update-order-status.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_URL } from "../api"
import { authFetch } from "../authFetch"

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ pedidoId, status }: { pedidoId: string; userId: string; status: string}) => {
      const res = await authFetch(`${API_URL}/admin/order/${pedidoId}/${status}`, {
        method: "PATCH",
      })

      if (!res.ok) {
        throw new Error(`Erro ao atualizar status: ${res.status}`)
      }

      return res.json()
    },
    onSuccess: async (_data, variables) => {
      
      console.log("onSucess: "+variables.userId)
      await queryClient.invalidateQueries({ queryKey: ['get-orders'] })
      await queryClient.invalidateQueries({ queryKey: ['get-orders-user', variables.userId] })
    },
  })
}
