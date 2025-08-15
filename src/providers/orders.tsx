"use client"

import { createContext, ReactNode, useState } from "react";
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';



export interface OrderItemProps {
    id: string;
    table: number;
    name: string | null;
    draft: boolean;
    status: boolean;
    items: {
        id: string;
        amount: number;
        order_id: string;
        product_id: string;
        created_at: string;
    }
    products: {
        id: string;
        name: string;
        price: string;
        description: string;
        category_id: string;
        images: {
            image: string;
        }
    };

}

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => void;
    onRequestClose: () => void;
}

type OrderProviderProps = {
    children: ReactNode;
}


export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState([]);


    function onRequestOpen(order_id: string) {
        console.log(order_id);
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
            }}
        >
            {children}
        </OrderContext.Provider>
    );



}