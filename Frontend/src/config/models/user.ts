export interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    status: "ACTIVE" | "DELETED"
}