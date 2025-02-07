import { useState, useEffect } from "react";
import { Button, TextInput, Label, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { nocCodeAPI } from "../../config/apiRoutes/nocCodeRoutes";

interface NocCode {
  tier: string;
  nocCode: string;
  classTitle: string;
}

const NocCodeForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [nocData, setNocData] = useState<NocCode>({ tier: "", nocCode: "", classTitle: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(!!id);

  useEffect(() => {
    if (id) {
      fetchNocCode(id);
    }
  }, [id]);

  const fetchNocCode = async (nocId: string) => {
    try {
      const response = await nocCodeAPI.GetNocCodeById(nocId);
      setNocData(response.data.data);
    } catch (error) {
      toast.error("Error fetching NOC Code");
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNocData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await nocCodeAPI.UpdateNocCode(id, nocData);
        toast.success("NOC Code updated successfully!");
      } else {
        await nocCodeAPI.CreateNocCode(nocData);
        toast.success("NOC Code created successfully!");
      }
      navigate("/noc-codes");
    } catch (error) {
      toast.error("Error saving NOC Code");
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">{id ? "Edit NOC Code" : "Add New NOC Code"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="tier">Tier</Label>
          <TextInput id="tier" name="tier" value={nocData.tier} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="nocCode">NOC Code</Label>
          <TextInput id="nocCode" name="nocCode" value={nocData.nocCode} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="classTitle">Class Title</Label>
          <TextInput id="classTitle" name="classTitle" value={nocData.classTitle} onChange={handleChange} required />
        </div>
        <Button type="submit" isProcessing={loading} className="w-full">
          {id ? "Update NOC Code" : "Create NOC Code"}
        </Button>
      </form>
    </div>
  );
};

export default NocCodeForm;
