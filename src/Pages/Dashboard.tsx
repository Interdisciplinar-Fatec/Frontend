import { SideBar } from "@/components/sidebar"
import { useAuth } from "@/http/useAuth"
import { Navigate } from "react-router-dom"
import {PanelLeftOpen} from "lucide-react"
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
            <section className={`${toggle && "flex flex-row-reverse row-span-8"} gap-2 w-full h-full 
                lg:col-span-1 lg:row-span-1
                row-span-1 col-span-1      
            `}>
                <SideBar 
                    className={`hidden lg:block ${toggle ? "block" : "hidden"}`} 
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

                { cardUser && !toggle  && <CardUser /> }
                { cardProduct && !toggle  && <CardProduct /> }
                { cardOrder && !toggle && <CardOrder /> }

            </section>
        </main>
    )
}