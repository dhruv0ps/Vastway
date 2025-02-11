import React, { useState } from 'react';
import { MediaLibrary } from './MediaLibrary';
import { UploadComponent } from './uploadcomponent';
import { ImageFile, ImageDetails } from '../../config/models/gallery';
import { galleryAPI } from '../../config/apiRoutes/galleryRoutes';
import { Tabs } from 'flowbite-react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from "react-toastify";

export const ImageGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [_imageDetails, setImageDetails] = useState<Record<string, ImageDetails>>({});
  // const [isUploading, setIsUploading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [limit, _setLimit] = useState(10);

  const refreshGallery = async () => {
    try {
      const response = await galleryAPI.GetImages({  limit });
      return response.data;
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Error fetching gallery data");
      return [];
    }
  };

  // Handle tab change
  const handleTabChange = async (tab: number) => {
    const newTab = tab === 0 ? 'upload' : 'library';
    setActiveTab(newTab);
    setSelectedImages([]); 
    setImageDetails({}); 
    setRefreshKey(prev => prev + 1); 
    
    if (newTab === 'library') {
      await refreshGallery();
    }
  };

  // const handleUpload = async () => {
  //   setIsUploading(true);
  //   try {
  //     for (const image of selectedImages) {
  //       const formData = new FormData();
  //       if (!image.file) {
  //         console.error("File is undefined for image:", image);
  //         return;
  //       }
  //       formData.append("image", image.file);
        
  //       const details = imageDetails[image.url];
  //       if (details) {
  //         formData.append("title", details.title || image.file.name);
  //         formData.append("caption", details.caption || '');
  //         formData.append("altText", details.altText || '');
  //       }

  //       const response = await galleryAPI.UploadImage(formData);
  //       if(response.status) {
  //         toast.success("Image uploaded successfully!");
  //       }
  //     }
  //     setLimit(10);
  //     setSelectedImages([]);
  //     setImageDetails({});
  //     await refreshGallery();
  //   } catch (error) {
  //     toast.error("Error uploading images");
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  // const handleDetailChange = (image: ImageFile, key: keyof ImageDetails, value: string) => {
  //   setImageDetails(prev => ({
  //     ...prev,
  //     [image.url]: {
  //       ...prev[image.url],
  //       [key]: value
  //     }
  //   }));
  // };

  return (
    <div className='p-8'>

   
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
      <Tabs 
        aria-label="Image gallery tabs" 
        style="underline"
        onActiveTabChange={handleTabChange}
      >
        <Tabs.Item 
          active={activeTab === 'upload'}
          icon={() => <Upload className="w-4 h-4" />}
          title="Upload Files"
        >
          <div className="flex">
            <div className="flex-1">
              <UploadComponent
                key={`upload-${refreshKey}`}
                onImageSelect={setSelectedImages}
                selectedImages={selectedImages}
              />
            </div>
            
            {/* {selectedImages.length > 0 && (
              <div className="w-80 border-l border-gray-200 p-4 lg:p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Attachment Details</h3>
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
                </div>
                
                {selectedImages.map((image, index) => (
                  <div key={index} className="space-y-4 mb-8">
                    <img
                      src={image.url}
                      alt="Selected preview"
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="space-y-3">
                      <div>
                        <div className="mb-2 block">
                          <label htmlFor={`title-${index}`} className="text-sm font-medium text-gray-900">
                            Title
                          </label>
                        </div>
                        <TextInput
                          id={`title-${index}`}
                          type="text"
                          value={imageDetails[image.url]?.title || ''}
                          onChange={(e) => handleDetailChange(image, 'title', e.target.value)}
                          placeholder="Enter title"
                          sizing="sm"
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <label htmlFor={`caption-${index}`} className="text-sm font-medium text-gray-900">
                            Caption
                          </label>
                        </div>
                        <TextInput
                          id={`caption-${index}`}
                          type="text"
                          value={imageDetails[image.url]?.caption || ''}
                          onChange={(e) => handleDetailChange(image, 'caption', e.target.value)}
                          placeholder="Enter caption"
                          sizing="sm"
                        />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <label htmlFor={`alt-${index}`} className="text-sm font-medium text-gray-900">
                            Alt Text
                          </label>
                        </div>
                        <TextInput
                          id={`alt-${index}`}
                          type="text"
                          value={imageDetails[image.url]?.altText || ''}
                          onChange={(e) => handleDetailChange(image, 'altText', e.target.value)}
                          placeholder="Enter alt text"
                          sizing="sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        </Tabs.Item>

        <Tabs.Item
          active={activeTab === 'library'}
          icon={() => <ImageIcon className="w-4 h-4" />}
          title="Media Library"
        >
          <MediaLibrary
            key={`library-${refreshKey}`}
            onImageSelect={setSelectedImages}
            selectedImages={selectedImages}
          />
        </Tabs.Item>
      </Tabs>
    </div>
    </div>
  );
};

export default ImageGallery;