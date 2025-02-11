import { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import { galleryAPI } from "../../config/apiRoutes/galleryRoutes";
import { debounce } from "lodash";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [limit, _setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen, searchQuery, sortOrder, page, limit]);

  const fetchImages = async () => {
    try {
      const response = await galleryAPI.GetImages({ search: searchQuery, sort: sortOrder, page, limit });
      setImages(response.data.images);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
    setPage(1);
  }, 500);

  const handleConfirmSelection = () => {
    if (selectedImage) {
      onSelect(selectedImage);
      onClose();
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="lg" className="flex items-center justify-center">
      <Modal.Header>Select an Image from Gallery</Modal.Header>
      <Modal.Body>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="border px-3 py-1.5 text-sm w-full"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="border px-3 py-1.5 text-sm"
          >
             <option value="asc">Ascending(Title)</option>
             <option value="desc">Descending(Title)</option>
          </select>
        </div>
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
                src={img.url}
                alt={img.title}
                className="w-full h-20 object-cover rounded-md"
              />
              <p className="text-xs mt-2">{img.title}</p>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
      <div className="flex-col">
      <div className="flex space-x-4 justify-center items-center w-full">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="border px-3 py-1 rounded"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="border px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
        <div className="flex  gap-2 mt-4">
          <Button onClick={handleConfirmSelection} disabled={!selectedImage} className="bg-primary text-white">
            Confirm 
          </Button>
          <Button color="gray" onClick={onClose}>Cancel</Button>
        </div></div>
      </Modal.Footer>
    </Modal>
  );
};

export default GalleryPicker;
