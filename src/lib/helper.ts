import { OrderItemProps } from "@/providers/order";

export function calculateTotalOrder(orders: OrderItemProps[]) {
    return orders.reduce((total, item) => {
        const itemTotal = parseFloat(item.price) * item.amount;
        return total + itemTotal
    }, 0)
}