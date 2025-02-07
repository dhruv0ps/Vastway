export interface Category {
    _id?: string;
    name: string;
    singleDigitKey: number;
    status: 'ACTIVE' | 'DELETED';
};

export interface subCategory {
    _id?: string;
    ID: string;
    name: string
    category: Category,
   
    status: string
}