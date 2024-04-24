export interface iCart {
    id?: number;
    user_id: number;
    created_at: Date;
};

export interface iCartItem {
    id?: number;
    cart_id: number;
    item_id: number;
    quantity: number;
};