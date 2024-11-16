
export interface User {
    _id:string,
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

export interface ProductInterface{
    _id:string,
    images: string[],
    title: string,
    description: string,
    category: string,
    price: number,
    salePrice: number,
    totalStock: number,
    averageReview: number,
}