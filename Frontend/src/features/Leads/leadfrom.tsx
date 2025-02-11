import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextInput, Button, FileInput, Label, Textarea } from "flowbite-react";
import { toast } from "react-toastify";
import { leadCategoryAPI } from "../../config/apiRoutes/leadRoutes";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AutocompleteLeadCategory from "../../util/AutocompleteLeadCategory";

interface Lead {
  name: string;
  phoneNumber: string;
  emailId: string;
  address: string;
  categories: LeadCategory[];
  images: File[];
  notes: string;
}

interface LeadCategory {
  _id: string;
  name: string;
}

const LeadForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<LeadCategory[]>([]);
  const [formData, setFormData] = useState<Lead>({
    name: "",
    phoneNumber: "",
    emailId: "",
    address: "",
    categories: [],
    images: [],
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [filePreviews, setFilePreviews] = useState<{ file: File | null; preview: string }[]>([]);

  useEffect(() => {
    if (id) fetchLead(id);
  }, [id]);

  const fetchLead = async (leadId: string) => {
    try {
      const response = await leadCategoryAPI.getLeadById(leadId);
      const leadData = response.data;

      setFormData({
        name: leadData.name,
        phoneNumber: leadData.phoneNumber,
        emailId: leadData.emailId,
        address: leadData.address,
        categories: leadData.categories || [], 
        images: [],
        notes: leadData.notes,
      });

      setSelectedCategories(leadData.categories || []);

      // Handle existing images
      if (leadData.images && leadData.images.length > 0) {
        setFilePreviews(
          leadData.images.map((imgUrl: string) => ({ 
            file: null, 
            preview: imgUrl 
          }))
        );
      }
    } catch (error) {
      toast.error("Failed to fetch lead.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (category: LeadCategory) => {
    if (!selectedCategories.some(cat => cat._id === category._id)) {
      const updatedCategories = [...selectedCategories, category];
      setSelectedCategories(updatedCategories);
      setFormData(prev => ({
        ...prev,
        categories: updatedCategories,
      }));
    }
  };

  const handleCategoryRemove = (categoryId: string) => {
    const updatedCategories = selectedCategories.filter(cat => cat._id !== categoryId);
    setSelectedCategories(updatedCategories);
    setFormData(prev => ({
      ...prev,
      categories: updatedCategories,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const previews = filesArray.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...filesArray],
      }));
      setFilePreviews((prev) => [...prev, ...previews]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("emailId", formData.emailId);
    data.append("address", formData.address);
    data.append("notes", formData.notes);

    formData.categories.forEach((category) => {
      data.append("categories", category._id);
    });

    formData.images.forEach((image) => {
      data.append("images", image);
    });

    try {
      if (id) {
        await leadCategoryAPI.updateLead(id, data);
        toast.success("Lead updated successfully!");
      } else {
        await leadCategoryAPI.createLead(data);
        toast.success("Lead created successfully!");
      }
      navigate("/admin/lead-list");
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
          <TextInput id="emailId" name="emailId" type="email" value={formData.emailId} onChange={handleInputChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="categories">Categories</Label>
          <AutocompleteLeadCategory 
            onSelect={handleCategorySelect} 
            value={selectedCategories}
            onRemove={handleCategoryRemove}
          />
        </div>

        {/* Document & Image Uploads */}
        <div className="mb-4">
          <Label htmlFor="documents">Upload Documents & Images</Label>
          <FileInput 
            id="images" 
            name="documents" 
            multiple 
            onChange={handleFileChange} 
            accept="image/*, application/pdf, .doc, .docx, .txt" 
          />

          {/* File Previews */}
          {filePreviews.length > 0 && (
            <div className="mt-3 p-2 border rounded bg-gray-50">
              <h3 className="text-sm font-semibold">Uploaded Files:</h3>
              <ul className="space-y-2 mt-2">
                {filePreviews.map(({  preview }, index) => (
                  <li key={index} className="flex items-center justify-between p-2 border rounded bg-white">
                    {preview && (
                      <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded mr-3" />
                    )}
                    <Button size="xs" color="red" onClick={() => handleRemoveFile(index)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="notes">Notes</Label>
          <ReactQuill value={formData.notes} onChange={(value) => setFormData({ ...formData, notes: value })} />
        </div>
        
        <Button type="submit" isProcessing={loading} className="w-full bg-primary text-white">
          {id ? "Update Lead" : "Create Lead"}
        </Button>
      </form>
    </div>
  );
};

export default LeadForm;