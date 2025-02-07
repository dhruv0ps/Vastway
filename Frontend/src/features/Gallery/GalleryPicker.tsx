import { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import { galleryAPI } from "../../config/apiRoutes/galleryRoutes";

interface Image {
  id: string;
  url: string;
  title: string;
}

interface Props {
  onSelect: (imageUrl: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const GalleryPicker: React.FC<Props> = ({ onSelect, isOpen, onClose }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL || "http://localhost:5050";

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    try {
      const response = await galleryAPI.GetImages();
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedImage) {
      onSelect(selectedImage);
      onClose();
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <Modal.Header>Select an Image from Gallery</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className={`cursor-pointer border rounded-lg p-2 text-center ${
                selectedImage === img.url ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(img.url)}
            >
              <img
                src={`${baseImageUrl}/${img.url}`}
                alt={img.title}
                className="w-full h-20 object-cover rounded-md"
              />
              <p className="text-xs mt-2">{img.title}</p>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleConfirmSelection} disabled={!selectedImage} className="bg-primary text-white">
          Confirm Selection
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GalleryPicker;
