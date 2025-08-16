"use client"

import styles from './styles.module.scss';
import { X } from 'lucide-react';
import { use } from 'react';
import { OrderContext } from '@/providers/order';


export function Modalorder() {
    const { onRequestClose, order } = use(OrderContext);

    console.log(order[0].table);
    //console.log(order[0].created_at);

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
                        <span className={styles.nome}>
                            <b>{order[0].nome_mesa}</b>
                        </span>
                    )}

                    {order.map(item => (
                        <section className={styles.item} >
                            <span>
                                Qtd: {item.amount} - <b>{item.name_product}</b>
                            </span>
                            <span className={styles.description}>
                                {item.description}
                            </span>

                        </section>
                    ))}






                    <button className={styles.buttonOrder}>
                        Concluir pedido
                    </button>

                </article>

            </section>
        </dialog>
    );
}