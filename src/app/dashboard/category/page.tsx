import styles from './styles.module.scss'
import { Button } from "@/app/dashboard/components/button"
import { api } from '@/services/api'
import { redirect } from 'next/navigation'
import { getCookieServer } from '@/lib/cookieServer'

export default function Category() {

    async function handleRegisterCategory(formData: FormData) {
        "use server"

        const nome = formData.get("nome")

        if (nome === "") return;

        const data = {
            nome: nome,
        }

        const token = await getCookieServer();

        await api.post("categorias", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .catch((err) => {
                console.log(err);
                return;
            })

        redirect("/dashboard")

    }


    return (
        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <form
                className={styles.form}
                action={handleRegisterCategory}
            >
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome da categoria, ex: Pizzas"
                    required
                    className={styles.input}
                />

                <Button name="Cadastrar" />
            </form>
        </main>
    )
}