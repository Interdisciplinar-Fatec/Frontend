import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PaginaExemplo } from "./Pages/PaginaExemplo";
import { ExemploNavegacao } from "./Pages/ExemploNavegacao";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function App() {
  
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<PaginaExemplo />} index/>
            <Route element={<ExemploNavegacao />} path="/navegacao"/>
          </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
