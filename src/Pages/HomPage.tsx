import { FormOrder } from "@/components/login";
import { useAuth } from "@/http/useAuth";
import { Navigate } from "react-router-dom";

export  function HomePage(){
    const {data} = useAuth()

    if (data?.ok || data?.status === true) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <main className="h-screen bg-[#171819] flex flex-col items-center justify-center gap-14">
            <section className="text-white text-2xl flex-1 flex flex-col items-center justify-end w-screen">
               <img 
                src="/home_ft.png" 
                alt="Ícone de eletrodomésticos"
                 className="w-[140px] md:w-[200px] lg:w-[250px] h-auto object-contain"
                />
                <h2 className="font-bold text-sm md:text-lg lg:text-3xl">Conserto de Eletrodomésticos</h2>
            </section>
            <section className="flex flex-col w-full max-w-sm items-center gap-4 flex-1">
                <FormOrder />
            </section>
        </main>
    )
}