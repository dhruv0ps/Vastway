import { useEffect, useState } from "react";
import { Modal, TextInput, Button, Label, Checkbox } from "flowbite-react";
import { HiMail, HiUser, HiPhone } from "react-icons/hi";
import { toast } from "react-toastify";

const UserFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    consent: false,
  });

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userPhoneNumber = localStorage.getItem("userPhoneNumber");
    const userConsent = localStorage.getItem("userConsent");

    if (!userName || !userEmail || !userPhoneNumber || userConsent !== "true") {
      setIsOpen(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, consent: e.target.checked });
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phoneNumber) {
      toast.warn("Please fill in all fields.");
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.consent) {
      toast.error("You must agree to receive promotional calls or SMS.");
      return;
    }

    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userPhoneNumber", formData.phoneNumber);
    localStorage.setItem("userConsent", "true");

    setIsOpen(false);
  };

  const handlePreventClose = () => {
    toast.error("You must fill out the form before closing.");
  };

  return (
    <Modal show={isOpen} size="md" popup dismissible={false} onClose={handlePreventClose}>
      <Modal.Header className="px-6 pt-6 pb-0 text-center">
        <h2 className="text-2xl font-bold text-primary dark:text-white">
          Welcome to Vastway Immigration Inc.
        </h2>
        {/* <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-1">
          Please enter your details
        </h3> */}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          {/* Name Input */}
          <div className="space-y-1">
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
              Name
            </Label>
            <TextInput
              id="name"
              name="name"
              icon={HiUser}
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
              Email
            </Label>
            <TextInput
              id="email"
              name="email"
              type="email"
              icon={HiMail}
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Phone Number Input */}
          <div className="space-y-1">
            <Label htmlFor="phoneNumber" className="text-gray-700 dark:text-gray-300 font-medium">
              Phone Number
            </Label>
            <TextInput
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              icon={HiPhone}
              placeholder="Enter your 10-digit phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Checkbox for Promotional Calls */}
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleCheckboxChange}
              className="w-5 h-5 rounded focus:ring-primary focus:border-primary"
            />
            <Label htmlFor="consent" className="text-sm text-gray-700 dark:text-gray-300">
              I agree to receive promotional calls or SMS from 
              <span className="font-semibold text-primary"> Vastway Immigration Inc.</span>
            </Label>
          </div>

          {/* Submit Button */}
          <div className="w-full mt-4">
            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold transition duration-200 ease-in-out 
                         hover:bg-primary-dark focus:ring-4 focus:ring-primary-light shadow-lg"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserFormModal;
