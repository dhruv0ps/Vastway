import { apiUrl } from "../apiConfig/apiUrl";
import { axiosRequest } from "../apiConfig/axiosRequest";

// Create a NOC Code
const CreateNocCode = async (body: any) => {
    return await axiosRequest.post<any>(`${apiUrl.NocCode}`, body);
};

// Get all NOC Codes
const GetAllNocCodes = async () => {
    return await axiosRequest.get<any>(`${apiUrl.NocCode}`);
};

// Get NOC Code by ID
const GetNocCodeById = async (id: string) => {
    return await axiosRequest.get<any>(`${apiUrl.NocCode}/${id}`);
};

// Update NOC Code
const UpdateNocCode = async (id: string, body: any) => {
    return await axiosRequest.put<any>(`${apiUrl.NocCode}/${id}`, body);
};

// Delete NOC Code
const DeleteNocCode = async (id: string) => {
    return await axiosRequest.del<any>(`${apiUrl.NocCode}/${id}`);
};


const BulkUpload = async (body: any) => {
    return await axiosRequest.post<any>(`${apiUrl.NocCode}/bulk-upload`, body,);
};

export const nocCodeAPI = {
    CreateNocCode,
    GetAllNocCodes,
    GetNocCodeById,
    UpdateNocCode,
    DeleteNocCode,
    BulkUpload
};
