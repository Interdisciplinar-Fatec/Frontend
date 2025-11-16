import { SideBar } from "@/components/sidebar"
import { useAuth } from "@/http/get/useAuth"
import { Navigate } from "react-router-dom"
import {Menu, MessageCircleWarning, PanelLeftOpen} from "lucide-react"
import { useState } from "react"
import { CardListProduct } from "@/components/cardListProducts"
import { CardListOrder } from "@/components/cardListOrder"
import { CardCreateProduct } from "@/components/cardCreateProducts"
import { CardCreateOrder } from "@/components/cardCreateOrder"
import { CardListUser } from "@/components/cardListUser"

export  function DashboardPage(){
    const {isLoading,data} = useAuth()
    const [toggle, setToggle] = useState<boolean>(false)

    const [activeCard, setActiveCard] = useState<"user" | "order" | "product" | null>(null)

    if(isLoading) { return <div className="text-white bg-[#171819]"><h2>Carregando...</h2></div>}
    if (!data?.ok || data?.status === false) {
        return <Navigate to="/" replace />
    }

    const handdleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <main className={`h-screen bg-[#ffff] items-center justify-between 
            grid lg:grid-cols-5 lg:grid-rows-1 lg:pt-3 lg:p-0
            grid-cols-1 grid-rows-10 p-4
        `}>
            <section className={`${toggle ? "flex flex-col-reverse row-span-10" : "hidden lg:flex"} gap-2 w-full h-full 
                lg:col-span-1 lg:row-span-1 p-3
            `}>
                <SideBar 
                    className={`lg:grid ${toggle ? "grid" : "hidden"}`} 
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                />
               <div className={`w-full flex justify-end p-1  ${toggle ? "flex" : "hidden"}`}>
                    {
                        toggle && (
                            <PanelLeftOpen className={` lg:hidden text-black`} onClick={() => handdleToggle()} />
                        ) 
                    }
               </div>
            </section>
            {/* flex flex-wrap */}
            <section className={` ${toggle ? "hidden lg:col-span-2" : "md:col-span-5 overflow-y-auto flex"} h-full
                lg:col-span-4 lg:row-span-1 lg:flex
                row-span-10 col-span-1 lg:rounded-tl-3xl rounded-lg flex-col
            `}>
                <div className="bg-[#EEF1F5] min-h-20 lg:rounded-tl-3xl flex flex-col items-end">
                    <div className="w-full flex justify-between p-3">
                        <h2 className="">Dashboard</h2>
                        {
                            !toggle && (
                                <Menu className={` lg:hidden text-black`} onClick={() => handdleToggle()} />
                            ) 
                        }
                    </div>
                    <hr className="w-full border-2 border-[#FFFFFF]" />
                </div>
                {
                    activeCard === null ? (
                        <div className="bg-[#EEF1F5] flex-1 flex justify-center items-center">
                            <div className="flex flex-col justify-center items-center border-2 border-gray-300 border-dashed p-2">
                                <MessageCircleWarning className="text-[#6B8BFF]" />
                                <h2 className="font-semibold">Nenhuma tabela selecionada!</h2>
                                <h2 className="text-xs text-gray-700">Selecione uma tabela para começar os trabalhos</h2>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#EEF1F5] flex flex-col flex-1 p-4 gap-2">
                            <div className="flex-1 rounded-lg border-2 border-[#FFFFFF]">
                                {activeCard === "user" && !toggle && <CardListUser />}
                                {activeCard === "order" && !toggle && <CardListOrder />}
                                {activeCard === "product" && !toggle && <CardListProduct />}
                            </div>
                            
      
                            <div className="flex-1 rounded-lg border-2 border-[#FFFFFF]">
                                {activeCard === "order" && !toggle && <CardCreateOrder />}
                                {activeCard === "product" && !toggle && <CardCreateProduct />}
                            </div>
                        </div> 
                    )
                }
            </section>
        </main>
    )
}