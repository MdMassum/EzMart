export interface User {
    name:string,
    email:string,
    role?:string,
    age?:number
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    user?: any;  
}