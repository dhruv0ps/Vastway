import React, { useState } from 'react';
import { MediaLibrary } from './MediaLibrary';
import { UploadComponent } from './uploadcomponent';
import { ImageFile } from '../../config/models/gallery'
import { galleryAPI } from '../../config/apiRoutes/galleryRoutes';

type Tab = 'upload' | 'library';

export const ImageGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('upload');
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

  const handleCreateNewImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", file.name);

    try {
      const response = await galleryAPI.UploadImage(formData);
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const clearSelection = () => {
    setSelectedImages([]);
  };
  console.log(selectedImages)
  return (
    <div className=" m-4 lg:m-10 rounded-lg flex flex-col h-[calc(100vh-2rem)] lg:h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex justify-between items-center px-4 lg:px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Create Gallery</h2>
      </div>

      {/* Tabs */}
      <div className="border-b px-4 lg:px-6">
        <div className="flex gap-6">
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === 'upload'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Upload Files
          </button>
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === 'library'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('library')}
          >
            Media Library
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'upload' ? (
          <UploadComponent
            onImageSelect={setSelectedImages}
            selectedImages={selectedImages}
          />
        ) : (
          <MediaLibrary
            onImageSelect={setSelectedImages}
            selectedImages={selectedImages}
          />
        )}
      </div>

      {/* Selected Items Bar */}
      {selectedImages.length > 0 && (
        <div className="border-t px-4 lg:px-6 py-3 bg-white">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-gray-600">
              {selectedImages.length} selected
            </span>
            <button
              onClick={clearSelection}
              className="text-red-600 text-sm hover:underline"
            >
              Clear
            </button>
            <div className="flex-1 overflow-x-auto flex gap-2">
              {selectedImages.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt="Selected thumbnail"
                  className="w-10 h-10 object-cover rounded"
                />
              ))}
            </div>
            <button
              onClick={() => {
                if (selectedImages.length > 0 && selectedImages[0].file) {
                  handleCreateNewImage(selectedImages[0].file);
                }
              }}
              className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
            >
              Create Gallery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};