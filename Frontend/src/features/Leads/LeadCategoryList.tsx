import { useState, useEffect } from "react";
import { Table, Button, TextInput, Modal, Spinner } from "flowbite-react";

import { toast } from "react-toastify";
import { leadCategoryAPI } from "../../config/apiRoutes/leadRoutes";

interface LeadCategory {
  _id: string;
  name: string;
}

const LeadCategoryList: React.FC = () => {
  const [categories, setCategories] = useState<LeadCategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await leadCategoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error("Error fetching lead categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }

    try {
      const response = await leadCategoryAPI.createCategory({ name: newCategoryName });
      setCategories([...categories, response.data]);
      toast.success("Category added successfully!");
      setNewCategoryName("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to add category.");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await leadCategoryAPI.deleteCategory(id);
      setCategories(categories.filter((category) => category._id !== id));
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="container mx-auto p-6 px bg-white shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lead Categories</h2>
        <Button color="blue" className="bg-primary text-white" onClick={() => setIsModalOpen(true)}>
          
          Add Category
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner size="xl" />
        </div>
      ) : (
        <Table hoverable striped >
          <Table.Head>
            <Table.HeadCell className="bg-primary text-white">Category Name</Table.HeadCell>
            <Table.HeadCell className="bg-primary text-white">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {categories.map((category) => (
              <Table.Row key={category._id}>
                <Table.Cell>{category.name}</Table.Cell>
                <Table.Cell>
                  <Button size="sm" className="bg-primary text-white"onClick={() => handleDeleteCategory(category._id)}>
                   
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      {/* Add Category Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Add Lead Category</Modal.Header>
        <Modal.Body>
          <TextInput
            placeholder="Enter category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddCategory} className="bg-primary text-white">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeadCategoryList;
