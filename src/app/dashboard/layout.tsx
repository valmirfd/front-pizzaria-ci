import { Header } from "./components/header";
import { OrderProvider } from "@/providers/orders";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Header />
            <OrderProvider>
                {children}
            </OrderProvider>
        </>
    );

}