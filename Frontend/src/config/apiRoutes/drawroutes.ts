import { apiUrl } from "../apiConfig/apiUrl";
import { axiosRequest } from "../apiConfig/axiosRequest";

const AddCategory = async (body: any) => {
    return await axiosRequest.post<any>(apiUrl.Category, body)
}
const GetCategories = async () => {
    return await axiosRequest.get<any>(apiUrl.Category)
}
const UpdateCategories = async (id: string, body: any) => {
    return await axiosRequest.put<any>(`${apiUrl.Category}/${id}`, body)
}
const AddsubCategory = async (id: any, body: any) => {
    return await axiosRequest.post<any>(`${apiUrl.subcategory}/${id}`, body)
}
const GetsubCategories = async (id: any) => {
    return await axiosRequest.get<any>(`${apiUrl.subcategory}/${id}`)
}
const UpdatesubCategories = async (id: string, body: any) => {
    return await axiosRequest.put<any>(`${apiUrl.subcategory}/${id}`, body)
}

const AddDraw = async (body: any) => {
    return await axiosRequest.post<any>(apiUrl.Draw, body)
}
const GetDraw = async () => {
    return await axiosRequest.get<any>(apiUrl.Draw)
}
const GetDrawById = async (id:any) => {
    return await axiosRequest.get<any>(`${apiUrl.Draw}/${id}`)
}
const UpdateDraw = async (id:string,body:any) => {
    return await axiosRequest.put<any>(`${apiUrl.Draw}/${id}`,body)
}
export const drawrAPi = {
    GetCategories,
    AddCategory,
    UpdateCategories, AddsubCategory,
    GetsubCategories,
    UpdatesubCategories,AddDraw,GetDraw,GetDrawById,UpdateDraw
}