
export default interface iUser {
    id?: number;
    name: string;
    email: string;
    mobile_number: number;
    password: string;
    address?: string;
    role: number;
    status: number;
    created_at: Date;
    updated_at?: Date;
};