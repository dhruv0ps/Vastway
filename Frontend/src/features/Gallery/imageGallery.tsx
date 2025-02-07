import React, { useState, useEffect } from 'react';
import { Check, Square, Search, Link } from 'lucide-react';
import { clsx } from 'clsx';
import { galleryAPI } from '../../config/apiRoutes/galleryRoutes';
interface ImageFile {
    file?: File;
    url: string;
    id?: string;
    size?: number;
    dimensions?: string;
}

interface ImageDetails {
    title?: string;
    caption?: string;
    altText?: string;
    url?: string;
}

type Tab = 'upload' | 'library';
type FilterType = 'images';

export const ImageGallery: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('upload');
    const [filterType, setFilterType] = useState<FilterType>('images');
    const [images, setImages] = useState<ImageFile[]>([]);
    const [sampleimages, setSampleimages] = useState<ImageFile[]>([]);
    const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
    const [imageDetails, setImageDetails] = useState<Record<string, ImageDetails>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL || "http://localhost:5050";
    // Sample images for the Media Library
    //   const sampleImages = [
    //     { url: 'https://images.unsplash.com/photo-1502790671504-542ad42d5189?auto=format&fit=crop&w=800&q=60', id: '1' },
    //     { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=60', id: '2' },
    //     { url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=60', id: '3' },
    //     { url: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=60', id: '4' },
    //   ];
    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await galleryAPI.GetImages();
            setSampleimages(response.data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };
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
        setSelectedImages((prev) =>
            prev.includes(image)
                ? prev.filter((img) => img !== image)
                : [...prev, image]
        );

        // Initialize details if not exists
        if (!imageDetails[image.url]) {
            setImageDetails((prev) => ({
                ...prev,
                [image.url]: {
                    title: '',
                    caption: '',
                    altText: '',
                    description: '',
                    url: image.url,
                },
            }));
        }
    };

    const handleDetailChange = (image: ImageFile, key: keyof ImageDetails, value: string) => {
        setImageDetails((prev) => ({
            ...prev,
            [image.url]: { ...prev[image.url], [key]: value },
        }));
    };

    // const handleDelete = (image: ImageFile) => {
    //     setImages((prev) => prev.filter((img) => img !== image));
    //     setSelectedImages((prev) => prev.filter((img) => img !== image));
    // };

    const clearSelection = () => {
        setSelectedImages([]);
    };
    const handleCreateNewImage = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", file.name);

        try {
            const response = await galleryAPI.UploadImage(formData);
            const newImage = { ...response.data, id: response.data.id || `temp-${Date.now()}` };
            setImages((prev) => [...prev, newImage]);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    return (
        <div className=" bg-white shadow-2xl m-10">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Create Gallery</h2>

            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Main Content Area */}
                <div className="flex-1 flex">
                    <div className="flex-1 flex flex-col">
                        {/* Tabs */}
                        <div className="border-b px-6">
                            <div className="flex gap-6">
                                <button
                                    className={clsx(
                                        'px-4 py-3 font-medium',
                                        activeTab === 'upload'
                                            ? 'text-gray-900 border-b-2 border-gray-900'
                                            : 'text-gray-500 hover:text-gray-700'
                                    )}
                                    onClick={() => setActiveTab('upload')}
                                >
                                    Upload Files
                                </button>
                                <button
                                    className={clsx(
                                        'px-4 py-3 font-medium',
                                        activeTab === 'library'
                                            ? 'text-gray-900 border-b-2 border-gray-900'
                                            : 'text-gray-500 hover:text-gray-700'
                                    )}
                                    onClick={() => setActiveTab('library')}
                                >
                                    Media Library
                                </button>
                            </div>
                        </div>

                        {/* Filters and Search */}
                        <div className="p-6 border-b flex justify-between items-center">
                            <div className="flex gap-4">
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value as FilterType)}
                                    className="border rounded px-3 py-1.5 text-sm"
                                >
                                    <option value="images">Images</option>
                                    <option value="audio">Audio</option>
                                    <option value="video">Video</option>
                                </select>
                                <select
                                    className="border rounded px-3 py-1.5 text-sm"
                                >
                                    <option>All dates</option>
                                </select>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-1.5 border rounded text-sm w-64"
                                />
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Gallery Grid */}
                        <div className="flex-1 overflow-auto p-6">
                            {activeTab === 'upload' && (
                                <div className="mb-6">
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
                            )}

                            <div className="grid grid-cols-5 gap-4">
                                {(activeTab === 'upload' ? images : sampleimages).map((img, index) => (
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
                                        <img src={img.url.includes('uploads') ? `${baseImageUrl}/${img.url}` : img.url}
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

                        {/* Selected Items Bar */}
                        {selectedImages.length > 0 && (
                            <div className="border-t px-6 py-3 bg-white flex items-center gap-4">
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
                                {/* <button onClick={handleCreateNewImage} className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary-600">
                  Create a new gallery
                </button> */}
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Attachment Details */}
                    {selectedImages.length === 1 && (
                        <div className="w-80 border-l p-6 overflow-y-auto">
                            <h3 className="font-medium mb-4">ATTACHMENT DETAILS</h3>
                            <div className="space-y-4">
                                <img
                                    src={selectedImages[0].url}
                                    alt="Selected preview"
                                    className="w-full aspect-square object-cover rounded-lg mb-4"
                                />
                                {selectedImages[0].file && (
                                    <div className="text-sm text-gray-600">
                                        <p>{selectedImages[0].file.name}</p>
                                        <p>{new Date().toLocaleDateString()}</p>
                                        <p>{Math.round(selectedImages[0].size! / 1024)} KB</p>
                                        <p>{selectedImages[0].dimensions}</p>
                                    </div>
                                )}
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
                                        value={imageDetails[selectedImages[0].url]?.title || ''}
                                        onChange={(e) => handleDetailChange(selectedImages[0], 'title', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm text-gray-600">Caption</label>
                                    <input
                                        type="text"
                                        value={imageDetails[selectedImages[0].url]?.caption || ''}
                                        onChange={(e) => handleDetailChange(selectedImages[0], 'caption', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm text-gray-600">Alt Text</label>
                                    <input
                                        type="text"
                                        value={imageDetails[selectedImages[0].url]?.altText || ''}
                                        onChange={(e) => handleDetailChange(selectedImages[0], 'altText', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                    />
                                </div>
                                <div><button
                                    onClick={() => {
                                        if (selectedImages.length > 0 && selectedImages[0].file) {
                                            handleCreateNewImage(selectedImages[0].file);
                                        }
                                    }}
                                    className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary-600"
                                >
                                    Create a new gallery
                                </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};