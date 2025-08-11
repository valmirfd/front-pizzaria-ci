
import Image from "next/image";
import Link from "next/link";
import styles from '../page.module.scss';
import logoImg from '/public/logo.svg';
import { api } from "@/services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Signup() {

    async function handleRegister(formData: FormData) {
        "use server"

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const password_confirm = formData.get("password_confirm");

        if (username === "" || email === "" || password === "" || password_confirm === "") {
            console.log("PREENCHA TODOS OS CAMPOS")
            return;
        }


        try {
            const response = await api.post("register", {
                username,
                email,
                password,
                password_confirm
            });

            if (!response.data.token) {
                return;
            }

            const expressTime = 60 * 60 * 2 * 1000;

            (await cookies()).set("session", response.data.token, {
                maxAge: expressTime,
                path: "/",
                httpOnly: false,
                secure: process.env.NODE_ENV === "production"
            })

        } catch (err) {
            console.log("error")
            console.log(err)
            return;
        }

        redirect("/dashboard");

    }

    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt='Logo da pizzaria'
                    priority={true}
                />

                <section className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form action={handleRegister}>
                        <input
                            className={styles.input}
                            type="text"
                            required
                            name="username"
                            placeholder='Digite seu username'
                        />
                        <input
                            className={styles.input}
                            type="email"
                            required
                            name='email'
                            placeholder='Digite seu email'
                        />
                        <input
                            className={styles.input}
                            type="password"
                            required
                            name='password'
                            placeholder='Digite sua senha'
                        />

                        <input
                            className={styles.input}
                            type="password"
                            required
                            name='password_confirm'
                            placeholder='Confirme sua senha'
                        />

                        <button type="submit">
                            Cadastrar
                        </button>

                    </form>

                    <Link href="/" className={styles.text}>
                        Já possui uma conta? Faça o ligin
                    </Link>

                </section>

            </div>

        </>
    );
}