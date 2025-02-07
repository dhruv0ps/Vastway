import { apiUrl } from "../apiConfig/apiUrl";
import { axiosRequest } from "../apiConfig/axiosRequest";

const getAllCategories = async () => {
  return await axiosRequest.get<any>(`${apiUrl.LeadCategories}`);
};

const createCategory = async (body: any) => {
  return await axiosRequest.post<any>(`${apiUrl.LeadCategories}`, body);
};

const deleteCategory = async (id: string) => {
  return await axiosRequest.del<any>(`${apiUrl.LeadCategories}/${id}`);
};
const getAllLeads = async () => {
    return await axiosRequest.get<any>(`${apiUrl.Lead}`);
  };
  
  const getLeadById = async (id: string) => {
    return await axiosRequest.get<any>(`${apiUrl.Lead}/${id}`);
  };
  
  const createLead = async (body: any) => {
    return await axiosRequest.post<any>(`${apiUrl.Lead}`, body);
  };
  
  const updateLead = async (id: string, body: any) => {
    return await axiosRequest.put<any>(`${apiUrl.Lead}/${id}`, body);
  };
  
  const deleteLead = async (id: string) => {
    return await axiosRequest.del<any>(`${apiUrl.Lead}/${id}`);
  };
export const leadCategoryAPI = {
  getAllCategories,
  createCategory,
  deleteCategory,
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};
