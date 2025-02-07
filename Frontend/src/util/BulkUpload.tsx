import { useState } from "react";
import { Modal, FileInput, Button } from "flowbite-react";
import { toast } from "react-toastify";
import { nocCodeAPI } from "../config/apiRoutes/nocCodeRoutes";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshList: () => void;
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose, refreshList }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await nocCodeAPI.BulkUpload(formData);
      toast.success("Bulk upload successful!");
      refreshList();
      onClose();
    } catch (error) {
      toast.error("Bulk upload failed.");
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Bulk Upload NOC Codes</Modal.Header>
      <Modal.Body>
        <FileInput 
          accept=".csv, .xlsx" 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpload} disabled={!file}>Upload</Button>
        <Button color="gray" onClick={onClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BulkUploadModal;
