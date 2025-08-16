"use client"

import { createContext, ReactNode, useState } from "react";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';



export interface OrderItemProps {
    id_principal: string;
    amount: number;
    id_oder: string;
    id_product: string;
    data_order: string;
    order_id: string;
    table: string;
    status: string;
    draft: string;
    nome_mesa: string;
    product_id: string;
    category_id: string;
    name_product: string;
    description: string;
    price: string;
    image: string;
}

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode;
}


export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState<OrderItemProps[]>([]);
    const router = useRouter();


    async function onRequestOpen(order_id: string) {
        const token = await getCookieClient();


        try {
            const response = await api.get("items/detail", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    order_id: order_id
                }
            });

            setOrder(response.data.data);

        } catch (err) {
            console.log(err);
            toast.error("Falha ao buscar detalhes do pedido!")
            return;
        }

        setIsOpen(true);
    }

    function onRequestClose() {
        setIsOpen(false);
    }

    async function finishOrder(order_id: string) {
        const token = await getCookieClient();

        const data = {
            order_id: order_id
        }


        try {

            await api.put("orders/finish", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (err) {
            console.log(err);
            toast.error("Falha ao finalizar este pedido!");
            return;
        }

        toast.success("Pedido finalizado com sucesso!");
        router.refresh();
        setIsOpen(false);
    }


    return (
        <OrderContext.Provider
            value={{
                isOpen,
                onRequestOpen,
                onRequestClose,
                order,
                finishOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );



}