import { ArrowUp } from "lucide-react"

export function ExemploNavegacao(){
    return (
        <div className="h-screen bg-gray-900 flex flex-col items-center justify-center gap-4">
            <h1 className="text-white">
                Você navegou entre paginas!
            </h1>
            <p className="text-white flex gap-2"> Olhe a URL e apague tudo depois da barra <ArrowUp /></p>
        </div>
    )
}