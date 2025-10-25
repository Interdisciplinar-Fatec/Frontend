import { SideBar } from "@/components/sidebar"
import { useAuth } from "@/http/useAuth"
import { Navigate } from "react-router-dom"
import {PanelLeftOpen} from "lucide-react"
import {PanelLeftClose} from "lucide-react"
import { useState } from "react"
import { CardUser } from "@/components/cardUser"
import { CardProduct } from "@/components/cardProducts"

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
        <main className={`h-screen bg-[#171819] items-center justify-center gap-14
            grid grid-cols-5 grid-rows-1 p-6
            
        `}>
            <SideBar 
                className={`hidden md:block ${toggle ? "block" : "hidden"}`} 
                setCardOrder={setCardOrder} 
                setCardUser={setCardUser} 
                setCardProduct={setCardProduct}
            />
            {
                toggle ? (
                    <PanelLeftClose className={`absolute top-5 left-5 md:hidden ${toggle ? "text-black" : "text-white"}`} onClick={() => handdleToggle()} />
                ) : (
                    <PanelLeftOpen className={`absolute top-5 left-5 md:hidden ${toggle ? "text-black" : "text-white"}`} onClick={() => handdleToggle()} />
                )
            }
            {/* flex flex-wrap */}
            <section className={`h-full md:col-span-3 lg:col-span-4 pr-6 ${toggle ? "col-span-2" : "col-span-5 overflow-y-auto"} 
                
                grid-cols-2 grid-rows-2 place-items-stretch space-y-4
            `}>

                { cardUser && <CardUser /> }
                { cardProduct && <CardProduct /> }

            </section>
        </main>
    )
}