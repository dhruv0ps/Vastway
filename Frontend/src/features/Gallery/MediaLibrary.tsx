import React, { useState, useEffect } from 'react';
import { Check, Square, Search, Link } from 'lucide-react';
import { clsx } from 'clsx';
import { galleryAPI } from '../../config/apiRoutes/galleryRoutes';
import { ImageFile, ImageDetails } from '../../config/models/gallery';
import { Button, Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
interface MediaLibraryProps {
  onImageSelect: (images: ImageFile[]) => void;
  selectedImages: ImageFile[];

}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onImageSelect, selectedImages }) => {
  const [sampleImages, setSampleImages] = useState<ImageFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageDetails, setImageDetails] = useState<Record<string, ImageDetails>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit, _setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchImages();
  }, [searchQuery, sortOrder, page, limit]);

  const fetchImages = async () => {
    try {
      const response = await galleryAPI.GetImages({ search: searchQuery, sort: sortOrder, page, limit });
      setSampleImages(response.data.images);
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
    setPage(1);
  }, 500);

  const handleImageSelect = (image: ImageFile) => {
    const isSelected = selectedImages.some((img) => img.url === image.url);
    const newSelection = isSelected
      ? selectedImages.filter((img) => img.url !== image.url)
      : [...selectedImages, image];


    onImageSelect(newSelection);

    setImageDetails((prev) => ({
      ...prev,
      [image.url]: {
        title: prev[image.url]?.title || image.title || "",
        caption: prev[image.url]?.caption || image.caption || "",
        altText: prev[image.url]?.altText || image.altText || "",
        url: image.url,
      },
    }));
  };

  const handleDetailChange = (image: ImageFile, key: keyof ImageDetails, value: string) => {


    setImageDetails((prev) => ({
      ...prev,
      [image.url]: {
        ...prev[image.url],
        [key]: value,
      },
    }));

    onImageSelect([...selectedImages]);
  };
  const handleUpload = async () => {
    setIsUploading(true);
    try {
      for (const image of selectedImages) {
        if (image._id) {
          const res = await galleryAPI.UpdateImage(image._id, imageDetails[image.url]);
          if (res.status) {
            toast.success("Image update SuccessFully")
          }
        }
      }

    } catch (error) {
      toast.error("Error updating images")
    } finally {
      setIsUploading(false);
    }
  };
  const filteredImages = sampleImages.filter((img) =>
    img.url.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleDelete = async (image: ImageFile) => {
    if (!image._id) {
      toast.error("Image ID is missing. Cannot delete.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;

    try {
      const response = await galleryAPI.DeleteImage(image._id);

      if (response.status) {
        toast.success("Image deleted successfully");


        setSampleImages((prevImages) => prevImages.filter((img) => img._id !== image._id));
        onImageSelect(selectedImages.filter((img) => img._id !== image._id));
      } else {
        toast.error("Failed to delete the image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("An error occurred while deleting the image.");
    }
  };

  return (
    <>
      <div className="flex h-full">
        {/* Main Content */}

        <div className="flex-1 flex flex-col">
          <div className="p-4 lg:p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-4 w-full sm:w-auto">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="border rounded px-3 py-1.5 text-sm"
              >
                <option value="asc">Ascending(Title)</option>
                <option value="desc">Descending(Title)</option>
              </select>
            </div>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => debouncedSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 border rounded text-sm w-full sm:w-64"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="flex-1 overflow-auto p-4 lg:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredImages.map((img, index) => (
                <div
                  key={img.id || index}
                  className={clsx(
                    'relative border-2 rounded-lg cursor-pointer transition-all duration-200',
                    selectedImages.includes(img)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                  onClick={() => handleImageSelect(img)}
                >
                  <img
                    src={img.url}
                    alt="Gallery preview"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    {selectedImages.includes(img) ? (
                      <Check className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

       
        {selectedImages.length === 1 && (
          <div className="w-80 border-l p-4 lg:p-6 overflow-y-auto bg-white">
            <h3 className="font-medium mb-4">ATTACHMENT DETAILS</h3>
            <div className="space-y-4">
              <div className='flex justify-between'>
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  size="sm"
                  className='bg-primary text-white'
                >
                  {isUploading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Uploading...
                    </>
                  ) : (
                    'Upload'
                  )}
                </Button>
                <Button
                  onClick={() => handleDelete(selectedImages[0])}
                  color="failure"
                  size="sm"

                >
                  Delete
                </Button> </div>
              <img
                src={selectedImages[0].url}
                alt="Selected preview"
                className="w-full aspect-square object-cover rounded-lg mb-4"
              />
              <div className="text-sm text-gray-600">
                <p>Uploaded on {new Date().toLocaleDateString()}</p>
                {selectedImages[0].dimensions && <p>Dimensions: {selectedImages[0].dimensions}</p>}
                {selectedImages[0].size && (
                  <p>File size: {Math.round(selectedImages[0].size / 1024)} KB</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">URL</label>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                  <Link className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{selectedImages[0].url}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Title</label>
                <input
                  type="text"
                  value={imageDetails[selectedImages[0]?.url]?.title || ''}
                  onChange={(e) => handleDetailChange(selectedImages[0], 'title', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Caption</label>
                <input
                  type="text"
                  value={imageDetails[selectedImages[0]?.url]?.caption || ''}
                  onChange={(e) => handleDetailChange(selectedImages[0], 'caption', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Alt Text</label>
                <input
                  type="text"
                  value={imageDetails[selectedImages[0]?.url]?.altText || ''}
                  onChange={(e) => handleDetailChange(selectedImages[0], 'altText', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        )}

      </div>
      <div className="flex justify-between items-center p-4 border-t">
        <button disabled={page === 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))} className="border px-3 py-1 rounded">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage((prev) => prev + 1)} className="border px-3 py-1 rounded">Next</button>
      </div>
    </>
  );
};
