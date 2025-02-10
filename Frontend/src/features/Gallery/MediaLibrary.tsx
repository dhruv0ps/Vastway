import React, { useState, useEffect } from 'react';
import { Check, Square, Search, Link } from 'lucide-react';
import { clsx } from 'clsx';
import { galleryAPI } from '../../config/apiRoutes/galleryRoutes';
import { ImageFile, ImageDetails } from '../../config/models/gallery';

interface MediaLibraryProps {
  onImageSelect: (images: ImageFile[]) => void;
  selectedImages: ImageFile[];
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onImageSelect, selectedImages }) => {
  const [filterType, setFilterType] = useState<'images'>('images');
  const [sampleImages, setSampleImages] = useState<ImageFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageDetails, setImageDetails] = useState<Record<string, ImageDetails>>({});
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await galleryAPI.GetImages();
      setSampleImages(response.data);

    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageSelect = (image: ImageFile) => {
    console.log("🔍 Image Selected:", image);

    const isSelected = selectedImages.some((img) => img.url === image.url);
  
    const newSelection = isSelected
      ? selectedImages.filter((img) => img.url !== image.url) 
      : [...selectedImages, image]; 
  
    console.log("📌 Updated Selected Images:", newSelection);
  
    onImageSelect(newSelection);
  
   
    setImageDetails((prev) => {
      const existingDetails = prev[image.url] || {}; 
      const updatedDetails: Record<string, ImageDetails> = {
        ...prev,
        [image.url]: {
          title: existingDetails.title || image.title || "",
          caption: existingDetails.caption || image.caption || "",
          altText: existingDetails.altText || image.altText ||"",
          url: image.url,
        },
      };
  
      console.log("📝 Updated Image Details:", updatedDetails); 
      return updatedDetails;
    });
  };
  




  const handleDetailChange = (image: ImageFile, key: keyof ImageDetails, value: string) => {
    console.log(`Updating ${key} for Image:`, image.url, "New Value:", value);

    setImageDetails((prev) => {
      const updatedDetails = {
        ...prev,
        [image.url]: {
          ...prev[image.url],
          [key]: value
        },
      };

      return updatedDetails;
    });


    onImageSelect([...selectedImages]);
  };



  const filteredImages = sampleImages.filter(img =>
    img.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
   
        <div className="p-4 lg:p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-4 w-full sm:w-auto">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'images')}
              className="border rounded px-3 py-1.5 text-sm"
            >
              <option value="images">Images</option>
            </select>
            <select className="border rounded px-3 py-1.5 text-sm">
              <option>All dates</option>
            </select>
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Side Panel for Image Details */}
      {selectedImages.length === 1 && (
        <div className="w-80 border-l p-4 lg:p-6 overflow-y-auto bg-white">
          <h3 className="font-medium mb-4">ATTACHMENT DETAILS</h3>
          <div className="space-y-4">
            <img
              src={selectedImages[0].url}
              alt="Selected preview"
              className="w-full aspect-square object-cover rounded-lg mb-4"
            />
            <div className="text-sm text-gray-600">
              <p>Uploaded on {new Date().toLocaleDateString()}</p>
              {selectedImages[0].dimensions && (
                <p>Dimensions: {selectedImages[0].dimensions}</p>
              )}
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
  );
};