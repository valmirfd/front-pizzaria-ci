import { cookies } from 'next/headers';
import styles from './page.module.scss';
import logoImg from '/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { api } from '@/services/api';



export default function Page() {

  async function handleLogin(formData: FormData) {
    "use server"

    const email = formData.get("email")
    const password = formData.get("password")

    if (email === "" || password === "") {
      return;
    }

    try {

      const response = await api.post("login", {
        email,
        password
      })

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
      console.log(err);
      return;
    }

    redirect("/dashboard")

  }

  return (

    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt='Logo da pizzaria'
        />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input
              className={styles.input}
              type="text"
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

            <button type="submit" className={styles.button}>
              Login
            </button>

          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>

        </section>

      </div>

    </>

  );
}
