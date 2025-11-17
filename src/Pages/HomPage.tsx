import { FormOrder } from "@/components/login";
import { useAuth } from "@/http/get/useAuth";
import { CheckCookies } from "@/utils/useCheckCookies";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export  function HomePage(){
    const {data} = useAuth()
    const [enabledCookie, isEnabledCookie] = useState<boolean>(false);

     useEffect(() => {
        const enabled = CheckCookies()
        isEnabledCookie(enabled)
    }, [])

    if (data?.ok || data?.status === true) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <main className="h-screen bg-[#171819] flex flex-col items-center justify-center gap-14 relative p-4 rounded-xl shadow-lg">
            
                     <section className="text-white text-2xl flex-1 flex flex-col items-center justify-end w-screen">
                        <img 
                            src="/LOGOTIPO.png" 
                            alt="Ícone de eletrodomésticos"
                            className="w-[140px] md:w-[200px] lg:w-[250px] h-auto object-contain"
                            />
                        </section>
                        <section className="flex flex-col w-full max-w-sm items-center gap-0 flex-1">
                            {/* Texto informativo */}
                            <p className="text-white text-lg font-semibold -mt-12">
                                Entre com a sua credencial
                            </p>
                            <FormOrder />
                                          

                        </section>

            

            { enabledCookie ? null : (
                <section className="w-full fixed bottom-0 flex items-center justify-center  text-white text-center p-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">⚠️ Cookies desativados</h2>
                        <p className="text-sm md:text-base">
                            Ative os cookies do navegador para acessar sua conta e continuar usando o sistema.
                        </p>
                    </div>
                </section>
            )}
        </main>
    )
}