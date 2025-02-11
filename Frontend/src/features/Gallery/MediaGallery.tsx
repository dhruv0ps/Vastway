import React, { useState, useEffect } from 'react';
import { Check, Square,  Search, } from 'lucide-react';
import { clsx } from 'clsx';
import { galleryAPI } from '../../config/apiRoutes/galleryRoutes';

interface ImageFile {
  url: string;
  id?: string;
  title?: string;
  caption?: string;
  altText?: string;
}

export const MediaGallery: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL || "http://localhost:5050";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await galleryAPI.GetImages({});
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageSelect = (image: ImageFile) => {
    setSelectedImages([image]);
  };

  const handleDeleteImage = async (imageId?: string) => {
    if (!imageId) return;
    try {
      await galleryAPI.DeleteImage(imageId);
      setImages(images.filter((img) => img.id !== imageId));
      setSelectedImages([]);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleUpdateDetails = async (image: ImageFile) => {
    if (!image.id) return;
    try {
      await galleryAPI.UpdateImage(image.id, {
        title: image.title,
        caption: image.caption,
        altText: image.altText,
      });
      fetchImages();
    } catch (error) {
      console.error("Error updating image details:", error);
    }
  };

  return (
    <div className="bg-white shadow-2xl m-10">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Media Library</h2>
      </div>

      <div className="p-6 border-b flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-4 py-1.5 border rounded text-sm w-64"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      <div className="grid grid-cols-5 gap-4 p-6">
        {images.map((img) => (
          <div
            key={img.id}
            className={clsx(
              'relative border-2 rounded-lg cursor-pointer transition-all duration-200',
              selectedImages.includes(img) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            )}
            onClick={() => handleImageSelect(img)}
          >
            <img
              src={img.url.includes('uploads/') ? `${baseImageUrl}/${img.url}` : img.url}
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

      {selectedImages.length === 1 && (
        <div className="w-80 border-l p-6 overflow-y-auto">
          <h3 className="font-medium mb-4">EDIT IMAGE DETAILS</h3>
          <img
            src={selectedImages[0].url.includes('uploads/') ? `${baseImageUrl}/${selectedImages[0].url}` : selectedImages[0].url}
            alt="Selected preview"
            className="w-full aspect-square object-cover rounded-lg mb-4"
          />
          <input
            type="text"
            placeholder="Title"
            value={selectedImages[0].title || ''}
            onChange={(e) => setSelectedImages([{ ...selectedImages[0], title: e.target.value }])}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="Caption"
            value={selectedImages[0].caption || ''}
            onChange={(e) => setSelectedImages([{ ...selectedImages[0], caption: e.target.value }])}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="Alt Text"
            value={selectedImages[0].altText || ''}
            onChange={(e) => setSelectedImages([{ ...selectedImages[0], altText: e.target.value }])}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleUpdateDetails(selectedImages[0])}
              className="px-4 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteImage(selectedImages[0].id)}
              className="px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
