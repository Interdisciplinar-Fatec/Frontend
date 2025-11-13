import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../api";

const fetchAuth = async (token?: string) => {

    const Headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if(token){
        Headers['Authorization'] = `Bearer ${token}`;
    }

    const result = await fetch(`${API_URL}/auth`, {
        method: 'GET',
        headers: Headers, 
        credentials: 'include'
    })

    return result;
}

export const useAuth = () => {
    return useQuery({
        queryKey: ['auth-admin'],
        queryFn: async () => {
           
            const authToken = localStorage.getItem("token");
            const response = await fetchAuth(authToken || undefined);

            if (response.ok) {
                const data = await response.json();
                return {
                    ok: response.ok,
                    statusCode: response.status,
                    ...data
                };
            }
            
            throw new Error(`Auth failed with status: ${response.status}`);
        },
        retry: false, 
    })
}