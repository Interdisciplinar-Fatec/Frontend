import { SideBar } from "@/components/sidebar"
import { useAuth } from "@/http/get/useAuth"
import { Navigate } from "react-router-dom"
import {BoxIcon, FileSpreadsheet, PanelLeftOpen, UserRound} from "lucide-react"
import {PanelLeftClose} from "lucide-react"
import { useState } from "react"
import { CardUser } from "@/components/cardUser"
import { CardProduct } from "@/components/cardProducts"
import { CardOrder } from "@/components/cardOrder"

export  function DashboardPage(){
    const {isLoading,data} = useAuth()
    const [toggle, setToggle] = useState<boolean>(false)

    const [cardUser, setCardUser] = useState<boolean>(false)
    const [cardOrder, setCardOrder] = useState<boolean>(false)
    const [cardProduct, setCardProduct] = useState<boolean>(false)

    if(isLoading) { return <div className="text-white bg-[#171819]"><h2>Carregando...</h2></div>}
    if (!data?.ok || data?.status === false) {
        return <Navigate to="/" replace />
    }

    const handdleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <main className={`h-screen bg-[#171819] items-center justify-between gap-14
            p-6 grid lg:grid-cols-5 lg:grid-rows-1
            grid-cols-1 grid-rows-8             
        `}>
            <section className={`${toggle && "flex flex-col-reverse row-span-8"} gap-2 w-full h-full 
                lg:col-span-1 lg:row-span-1
                row-span-1 col-span-1 
            `}>
                <SideBar 
                    className={`hidden lg:flex ${toggle ? "flex" : "hidden"}`} 
                    setCardOrder={setCardOrder} 
                    setCardUser={setCardUser} 
                    setCardProduct={setCardProduct}
                />
                {
                    toggle ? (
                        <PanelLeftClose className={`self-start lg:hidden text-white`} onClick={() => handdleToggle()} />
                    ) : (
                        <PanelLeftOpen className={`self-start lg:hidden text-white`} onClick={() => handdleToggle()} />
                    )
                }
            </section>
            {/* flex flex-wrap */}
            <section className={` ${toggle ? "hidden lg:col-span-2 lg:block" : "md:col-span-5 overflow-y-auto"} space-y-4 h-full  pr-6
                lg:col-span-4 lg:row-span-1 
                row-span-7 col-span-1 
            `}>
                 {/* place-items-stretch */}
            
                <div className={`${toggle ? "hidden" : "flex"} flex gap-4 flex-col sm:flex-row items-center justify-center w-full`}>
                    <div className="w-full sm:max-w-40 bg-white flex flex-col items-center xxs:grid grid-cols-2 grid-rows-2 rounded-lg p-4">
                        <UserRound className="row-span-1 col-span-1"/>
                        <h2 className="hidden xxs:block row-span-1 col-span-1 text-xs xs:text-sm text-start ">Clientes</h2>
                        <h2 className="row-span-1 col-span-2 text-xs xs:text-sm">{30}</h2>
                    </div>
                    <div className="w-full sm:max-w-40  bg-white flex flex-col items-center xxs:grid grid-cols-2 grid-rows-2 rounded-lg p-4">
                        <BoxIcon className="row-span-1 col-span-1"/>
                        <h2 className="hidden xxs:block row-span-1 col-span-1 text-xs xs:text-sm text-start ">Produtos</h2>
                        <h2 className="row-span-1 col-span-2 text-xs xs:text-sm">{90}</h2>
                    </div>
                    <div className="w-full sm:max-w-40  bg-white flex flex-col items-center xxs:grid grid-cols-2 grid-rows-2 rounded-lg p-4">
                        <FileSpreadsheet className="row-span-1 col-span-1"/>
                        <h2 className="hidden xxs:block row-span-1 col-span-1 text-xs xs:text-sm text-start ">Pedidos</h2>
                        <h2 className="row-span-1 col-span-2 text-xs xs:text-sm">{10}</h2>
                    </div>
                </div>
                { cardUser && !toggle  && <CardUser /> }
                { cardProduct && !toggle  && <CardProduct /> }
                { cardOrder && !toggle && <CardOrder /> }

            </section>
        </main>
    )
}