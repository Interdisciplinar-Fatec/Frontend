import { useAuth } from "@/http/useAuth"
import { Navigate } from "react-router-dom"

export  function DashboardPage(){
    const {isLoading,data} = useAuth()

    if(isLoading) { return <div className="text-white bg-[#171819]"><h2>Carregando...</h2></div>}
    if (!data?.ok || data?.status === false) {
        return <Navigate to="/" replace />
    }

    return (
        <main className="h-screen bg-[#171819] flex flex-col items-center justify-center gap-14">
          <h2 className="text-white">Dashboard</h2>
        </main>
    )
}