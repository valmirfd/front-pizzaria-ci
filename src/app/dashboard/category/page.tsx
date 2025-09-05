import styles from './styles.module.scss';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';
import { CategoryProps } from "@/lib/category.type";

async function getCategories(): Promise<CategoryProps[] | []> {

    try {

        const token = await getCookieServer();

        const response = await api.get("categories/list", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.data || [];

    } catch (err) {
        console.log(err);
        return [];
    }
}



export default async function Category() {

    const categories = await getCategories();


    return (
        <>
            <h1>Aqui categories</h1>
        </>
    )
}