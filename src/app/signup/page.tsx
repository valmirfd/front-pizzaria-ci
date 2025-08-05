import Image from "next/image";
import Link from "next/link";
import styles from '../page.module.scss';
import logoImg from '/public/logo.svg';

export default function Signup() {
    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt='Logo da pizzaria'
                />

                <section className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form>
                        <input
                            className={styles.input}
                            type="text"
                            required
                            name='username'
                            placeholder='Digite seu nome'
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