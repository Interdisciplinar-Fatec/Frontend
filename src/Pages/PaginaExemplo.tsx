import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type GetUsersResponse = Array<{
    id: string,
    name: string,
    email: string,
    created_at: Date
}>

export function PaginaExemplo(){

    const {data} = useQuery({
        queryKey: ['get-users'],
        queryFn: async () => {
            const result = await fetch(" http://localhost:3333/users")
            const resultJson:GetUsersResponse = await result.json()
            return resultJson;
        }
    })

    return (
        <div className="h-screen bg-gray-900 flex flex-col items-center justify-center gap-4">
            <h1 className="text-white">
                Pagina de Exemplo!
            </h1>
            <Link to="/navegacao" className="text-green-300 rounded-2xl p-1 text-sm hover:bg-gray-200 hover:text-green-950 ">Roteamento entre paginas</Link>

            <div className="h-96 bg-gray-700 w-1/2 flex flex-col items-center justify-center text-center p-2 gap-2">
                {
                    data?.map(user => {
                        return (
                            <div className="text-white flex gap-6 border-gray-500 border-1 p-1" key={user.id}>
                                <h2>{user.name}:</h2>
                                <h2>{user.email}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}