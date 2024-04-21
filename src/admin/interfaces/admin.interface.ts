// import { RowDataPacket } from "mysql2";

export default interface iAdmin {
    id?: number;
    name: string;
    email: string;
    mobile_number: number;
    password: string;
    role: number;
    status: number;
    created_at: Date;
    updated_at?: Date;
};