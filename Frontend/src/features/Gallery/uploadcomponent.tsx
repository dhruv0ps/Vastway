import React, { useState } from "react";
import { Check, Square, Upload } from "lucide-react";
import { clsx } from "clsx";
import { galleryAPI } from "../../config/apiRoutes/galleryRoutes";
import { ImageFile, } from "../../config/models/gallery";
import { toast } from 'react-toastify';
interface UploadComponentProps {
  onImageSelect: (images: ImageFile[]) => void;
  selectedImages: ImageFile[];
}

export const UploadComponent: React.FC<UploadComponentProps> = ({
  onImageSelect,
  selectedImages,
}) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      const newImages = uploadedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        size: file.size,
      }));

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleImageSelect = (image: ImageFile) => {
    const isSelected = selectedImages.some((img) => img.url === image.url);
    const newSelection = isSelected
      ? selectedImages.filter((img) => img.url !== image.url)
      : [...selectedImages, image];

    onImageSelect(newSelection);
  };

  const handleUploadImages = async () => {
    if (selectedImages.length === 0) return;
    setIsUploading(true);

    try {
      for (const image of selectedImages) {
        if (!image.file) continue;

        const formData = new FormData();
        formData.append("image", image.file);
        formData.append("title", image.file.name);

      const res =   await galleryAPI.UploadImage(formData);
      if(res.status){
        toast.success("Images uploaded successfully!");
        onImageSelect([]); 
        setImages([]); 
       }
      }
    } catch (error) {
      toast.error("Error uploading images:")
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 lg:p-6 border-b">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          accept="image/*"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer"
        />
      </div>

      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={clsx(
                "relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-200",
                "border-2",
                selectedImages.some((selectedImg) => selectedImg.url === img.url)
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => handleImageSelect(img)}
            >
              <img
                src={img.url || "/placeholder.svg"}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-1">
                {selectedImages.some(
                  (selectedImg) => selectedImg.url === img.url
                ) ? (
                  <Check className="w-5 h-5 text-blue-500" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImages.length > 0 && (
        <div className="p-4 lg:p-6 border-t flex justify-end">
          <button
            onClick={handleUploadImages}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 disabled:bg-gray-400"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Save & Upload"}
            <Upload className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
