import styles from './page.module.scss';
import logoImg from '/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';



export default function Page() {

  function handleLogin(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
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

            <button type="submit">
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
