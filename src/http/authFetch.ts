const getToken = () => localStorage.getItem("token")

interface FetchOptions extends RequestInit  {
    headers?: Record<string, string>
}

export const authFetch = async (input: RequestInfo, options: FetchOptions = {}): Promise<Response> => {
    const token = getToken()
    const headers: Record<string, string> = options.headers ? {...options.headers} : {}

    if (options.body && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json"
    }

    if(token){
        headers['Authorization'] = `Bearer ${token}`
    } else {
        delete headers['Authorization']
    }

    return fetch(input, {
        ...options,
        headers: headers,
        credentials: !headers['Authorization'] ? "include" : 'omit'
    })
}
