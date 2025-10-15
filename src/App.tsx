import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrdersPage } from "./Pages/OrdersPage";

const queryClient = new QueryClient()

export function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<HomePage />} index/>
            <Route element={<OrdersPage />} path="/user/order"/>
          </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
