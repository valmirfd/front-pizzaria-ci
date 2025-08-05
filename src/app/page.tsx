import styles from './page.module.scss';
import logoImg from '/public/logo.svg';
import Image  from 'next/image';


export default function Page() {
  return (

    <>
      <div className={styles.containerCenter}>
        <Image 
          src={logoImg}
          alt='Logo da pizzaria'
        />

        <section className={styles.login}>
          <form>

          </form>
        </section>

      </div>

    </>
   
  );
}
