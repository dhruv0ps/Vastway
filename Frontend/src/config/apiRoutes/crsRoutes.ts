import { apiUrl } from "../apiConfig/apiUrl";
import { axiosRequest } from "../apiConfig/axiosRequest";

const calculateCRS = async (body: any) => {
    return await axiosRequest.post<any>(`${apiUrl.crs}`, body)
}

export const crsApi = {
calculateCRS
}