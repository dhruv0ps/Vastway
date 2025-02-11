import { useEffect, useState } from "react";
// import Modal from "react-modal";
import { Modal,TextInput, Button, Label } from "flowbite-react";
import { HiMail, HiUser } from "react-icons/hi"
import { toast } from "react-toastify";
// Modal.setAppElement("#root"); 

const UserFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

   
    if (!userName || !userEmail) {
      setIsOpen(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast("Please fill in all fields.");
      return;
    }

    
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userEmail", formData.email);

    
    setIsOpen(false);
  };

  return (
    <Modal show={isOpen} size="md" popup dismissible={false}>
      <Modal.Header className="px-6 pt-6 pb-0">
        <h3 className="text-xl flex items-center justify-center font-medium text-gray-900 dark:text-white">
          Enter Your Details
        </h3>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <div>
            <div className="mt-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              name="name"
              icon={HiUser}
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <div className="mt-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              icon={HiMail}
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full mt-4">
            <Button type="submit" className="w-full bg-primary text-white">
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserFormModal;