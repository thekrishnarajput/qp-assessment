export interface iOrder {
    id?: number;
    user_id: number;
    created_at: Date;
};

export interface iOrderItem {
    id?: number;
    order_id: number;
    item_id: number;
    quantity: number;
};