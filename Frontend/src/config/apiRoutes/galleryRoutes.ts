import { apiUrl } from "../apiConfig/apiUrl";
import { axiosRequest } from "../apiConfig/axiosRequest";

const UploadImage = async (body:any) => {
    return await axiosRequest.post<any>(`${apiUrl.Gallery}`, body);
};

const GetImages = async () => {
    return await axiosRequest.get<any>(`${apiUrl.Gallery}`);
};

const UpdateImage = async(id: string, body: any) => {
    return await axiosRequest.put<any>(`${apiUrl.Gallery}/${id}`, body);
};

const DeleteImage = async (id:string) => {
    return await axiosRequest.del<any>(`${apiUrl.Gallery}/${id}`);
};

export const galleryAPI = {
    UploadImage,
    GetImages,
    UpdateImage,
    DeleteImage
};