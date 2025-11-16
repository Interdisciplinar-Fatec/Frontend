import type { userFullType } from "@/http/types/get-user-full-data-type";
import type { getUserType } from "@/http/types/get-users-type";

export function isUserFullArray(
    data: userFullType | getUserType | undefined
): data is userFullType {
    return Array.isArray(data) &&  data.length > 0&& "CPF" in data[0]
}
      