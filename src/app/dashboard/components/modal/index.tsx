"use client"

import styles from './styles.module.scss';
import { X } from 'lucide-react';
import { use } from 'react';
import { OrderContext } from '@/providers/order';
import Image from 'next/image';

export function Modalorder() {
    const { onRequestClose, order, finishOrder } = use(OrderContext);

    //1755187986_7c2b4e4ab2ccaf1aae10.png
    //console.log(order[0].image);

    async function handleFinishOrder() {
        await finishOrder(order[0].order_id)
    }

    return (
        <dialog className={styles.dialogContainer}>

            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color='#FF3f4b' />
                </button>

                <article className={styles.container}>
                    <h2>Detalhes do pedido</h2>
                    <span className={styles.table}>
                        Mesa : <b>{order[0].table}</b>
                    </span>

                    {order[0]?.nome_mesa && (
                        <span className={styles.name}>
                            <b>{order[0].nome_mesa}</b>
                        </span>
                    )}

                    {order.map(item => (
                        <section className={styles.item} key={item.id_principal}>
                            <span>
                                Qtd: {item.amount} - <b>{item.name_product}</b>
                            </span>
                            <span className={styles.description}>
                                {item.description}
                            </span>

                        </section>
                    ))}

                    <div className={styles.banner}>

                        <Image
                            src={`https://ieqpsj.com.br/public/assets/images/produtos/1755100860_ece05d157e3e7aaaf8ff.jpg`}
                            alt='Imagem do produto'
                            width={500}
                            height={250}
                        />



                    </div>



                    <button className={styles.buttonOrder} onClick={handleFinishOrder}>
                        Concluir pedido
                    </button>

                </article>

            </section>
        </dialog>
    );
}