import { useQuery } from "@tanstack/react-query";
import { authFetch } from "../authFetch";
import { API_URL } from "../api";
import type { userFullType } from "../types/get-user-full-data-type";

export const useGetUserByEmail = (email: string | undefined) => {
  return useQuery<userFullType>({
    queryKey: ["get-user-email", email],
    queryFn: async () => {
      const response = await authFetch(`${API_URL}/user/email/${email}`, {});

      if(!response.ok){
          let messageError = `Erro ao validar email. status ${response.status}`
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

      if (response.status === 200) {
        console.log(result)
        return result as userFullType;
      }

      if (response.status === 404) {
        throw {
            status: 404,
            message: "Erro ao validar Email",
        };
      }

      throw new Error("Erro inesperado");
    },
    enabled: !!email,
    retry: false,
  });
};
