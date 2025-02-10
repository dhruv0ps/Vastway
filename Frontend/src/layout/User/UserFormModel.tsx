import { useEffect, useState } from "react";
import Modal from "react-modal";
import { TextInput, Button, Label } from "flowbite-react";

Modal.setAppElement("#root"); 

const UserFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const isFormFilled = localStorage.getItem("formFilled");
    if (!isFormFilled) {
      setIsOpen(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill in all fields.");
      return;
    }

    localStorage.setItem("formFilled", "true");
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userEmail", formData.email);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="User Information"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          width: "400px",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          height: "350px"
        },
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" value="Name" className="block text-left text-sm font-medium text-gray-700 mb-2" />
          <TextInput
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="email" value="Email" className="block text-left text-sm font-medium text-gray-700 mb-2" />
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-4 bg-primary text-white">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default UserFormModal;