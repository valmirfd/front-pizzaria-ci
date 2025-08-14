import { Form } from "./components/form";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";



export default async function Product() {

    const token = await getCookieServer();
    const response = await api.get("categories/list", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return (
        <main>
            <Form categories={response.data.data} />
        </main>
    );
}