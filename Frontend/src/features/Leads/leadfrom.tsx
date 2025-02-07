import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextInput, Button, FileInput, Label, Textarea, Select } from "flowbite-react";
import { toast } from "react-toastify";
import { leadCategoryAPI } from "../../config/apiRoutes/leadRoutes";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Lead {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  categories: string[];
  documents: File[];
  notes: string;
}

interface LeadCategory {
  _id: string;
  name: string;
}

const LeadForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<LeadCategory[]>([]);
  const [formData, setFormData] = useState<Lead>({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    categories: [],
    documents: [],
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (id) fetchLead(id);
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await leadCategoryAPI.getAllCategories();
      setCategories(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  const fetchLead = async (leadId: string) => {
    try {
      const response = await leadCategoryAPI.getLeadById(leadId);
      setFormData(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch lead.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setFormData({ ...formData, categories: selectedOptions });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, documents: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("notes", formData.notes);
    formData.categories.forEach((category) => data.append("categories[]", category));
    formData.documents.forEach((doc) => data.append("documents", doc));

    try {
      if (id) {
        await leadCategoryAPI.updateLead(id, data);
        toast.success("Lead updated successfully!");
      } else {
        await leadCategoryAPI.createLead(data);
        toast.success("Lead created successfully!");
      }
      navigate("/leads");
    } catch (error) {
      toast.error("Failed to save lead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{id ? "Edit Lead" : "Add New Lead"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <TextInput id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <TextInput id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email ID</Label>
          <TextInput id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="categories">Select Categories</Label>
          <Select id="categories" name="categories" multiple onChange={handleCategoryChange} required>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="documents">Upload Documents</Label>
          <FileInput id="documents" name="documents" multiple onChange={handleFileChange} />
        </div>
        <div className="mb-4">
          <Label htmlFor="notes">Notes</Label>
          <ReactQuill value={formData.notes} onChange={(value:any) => setFormData({ ...formData, notes: value })} />
        </div>
        <Button type="submit" isProcessing={loading} className="w-full">
          {id ? "Update Lead" : "Create Lead"}
        </Button>
      </form>
    </div>
  );
};

export default LeadForm;
