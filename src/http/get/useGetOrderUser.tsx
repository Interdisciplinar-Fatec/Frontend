import { useQuery } from "@tanstack/react-query";
import { authFetch } from "../authFetch";
import { API_URL } from "../api";
import { CheckCookies } from "@/utils/useCheckCookies";
import type { getOrderUserType } from "../types/get-orderUser-type"

export type AdminCPFResponse = { adminCPF: boolean };

export const useGetOrderUser = (CPF: string | undefined) => {
  return useQuery<getOrderUserType | AdminCPFResponse>({
    queryKey: ["user-login", CPF],
    queryFn: async () => {
      const response = await authFetch(`${API_URL}/user/${CPF}`, {});

    if(!response.ok){
        let messageError = `Erro ao validar CPF. status ${response.status}`
        try {
            const errorResponse = await response.json()
            messageError = errorResponse.message || messageError
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            //ignorar
        }

        throw {
            status: response.status,
            message: messageError
        }
    }

      const result = await response.json();

      if (response.status === 201) {
        if (!result.userId) {
          throw new Error("UserId não encontrado");
        }

        const enabled = CheckCookies();
        if (!enabled) localStorage.setItem("userId", result.userId);

        return result as getOrderUserType;
      }

      if (response.status === 200) {
        return result as AdminCPFResponse;
      }

      if (response.status === 404) {
        throw {
            status: 404,
            message: "Erro ao validar CPF",
        };
      }

      throw new Error("Erro inesperado");
    },
    enabled: !!CPF,
    retry: false,
  });
};
