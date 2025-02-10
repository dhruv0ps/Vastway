import React, { useState } from 'react';
import { Check, Square } from 'lucide-react';
import { clsx } from 'clsx';
import { ImageFile } from "../../config/models/gallery";

interface UploadComponentProps {
  onImageSelect: (images: ImageFile[]) => void;
  selectedImages: ImageFile[];
}

export const UploadComponent: React.FC<UploadComponentProps> = ({ onImageSelect, selectedImages }) => {
  const [images, setImages] = useState<ImageFile[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages: ImageFile[] = Array.from(e.target.files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
        size: file.size,
      }));
      setImages([...images, ...newImages]);
    }
  };

  const handleImageSelect = (image: ImageFile) => {
    const newSelection = selectedImages.includes(image)
      ? selectedImages.filter((img) => img !== image)
      : [...selectedImages, image];
    onImageSelect(newSelection);
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
                'relative border-2 rounded-lg cursor-pointer transition-all duration-200',
                selectedImages.includes(img)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
              onClick={() => handleImageSelect(img)}
            >
              <img
                src={img.url}
                alt="Upload preview"
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
  );
};