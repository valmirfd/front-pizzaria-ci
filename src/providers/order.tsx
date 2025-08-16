"use client"

import { createContext, ReactNode, useState } from "react";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';



export interface OrderItemProps {
    id: string;
    amount: string;
    order_id: string;
    product_id: string;
    created_at: string;
    table: string;
    status: string;
    draft: string;
    nome_mesa: string;
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
}

type OrderProviderProps = {
    children: ReactNode;
}


export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState<OrderItemProps[]>([]);


    async function onRequestOpen(order_id: string) {
        const token = getCookieClient();


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


    return (
        <OrderContext.Provider
            value={{
                isOpen,
                onRequestOpen,
                onRequestClose,
                order,
            }}
        >
            {children}
        </OrderContext.Provider>
    );



}