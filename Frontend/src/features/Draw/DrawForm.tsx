
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import {  TextInput, Button, Textarea,FileInput,Label,Radio } from "flowbite-react";
import AutocompleteCategory from "../../util/AutoCompleteCategory";
import { Category,subCategory } from "../../config/models/category";
import AutocompleteSubCategory from "../../util/AutoCompleteSubcategory";
import { drawrAPi } from "../../config/apiRoutes/drawroutes";
import GalleryPicker from "../Gallery/GalleryPicker";
import AutoCompleteNocCode from "../../util/AutoCompleteNocCode";
interface NocCode {
  _id: string;
  nocCode: string;
  classTitle: string;
  
}
const DrawForm = () => {
  const navigate = useNavigate()
  const {id} = useParams();
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedSubcategories, setSelectedSubcategories] = useState<subCategory[]>([])
  const [imageSource, setImageSource] = useState<"upload" | "gallery">("upload"); 
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null); 
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategories: [] as Array<subCategory | string>,
    publishedBy: "Vastway Immigration",
    invitationsIssued: "",
    drawDate: "",
    crsCutoff: "",
    score: "",
    rankRequired: "",
    tieBreakingRule: "",
    additionalInfo: "",
    image: null as File | null,
    imageCaption: "",
    nocCodes: [] as NocCode[],
    metaTitle: "", 
    metaDescription: "", 
    linkEdit: "",
  });
  useEffect(() => {
    if (id) {
      fetchDrawData(id);
    }
  }, [id]);

  const fetchDrawData = async (drawId: string) => {
    try {
      const res = await drawrAPi.GetDrawById(drawId);
      if (res.data) {
        const draw = res.data;
        setFormData({
          title: draw.title || "",
          category: draw.category?._id || "",
          subCategories: draw.subCategories || [],
          publishedBy: draw.publishedBy || "Vastway Immigration",
          invitationsIssued: draw.invitationsIssued || "",
          drawDate: draw.drawDate ? new Date(draw.drawDate).toISOString().split('T')[0] : "",
          crsCutoff: draw.crsCutoff || "",
          score: draw.score || "",
          rankRequired: draw.rankRequired || "",
          tieBreakingRule: draw.tieBreakingRule || "",
          additionalInfo: draw.additionalInfo || "",
          image:draw.image || "",
          imageCaption: draw.imageCaption || "",
          nocCodes: draw.nocCodes || [],
          metaTitle: draw.metaTitle || "", 
          metaDescription: draw.metaDescription || "",
          linkEdit: draw.linkEdit || "",
        });

        setSelectedCategory(draw.category || null);
        setSelectedSubcategories(draw.subCategories || []);

        if (draw.imageUrl) {
          setSelectedImageUrl(draw.imageUrl);
          setPreviewImage(draw.imageUrl);
          setImageSource("gallery");
        }

        if(draw.image) {
          setSelectedImageUrl(draw.image);
          setPreviewImage(draw.image);
          setImageSource("upload")
        }
      }
    } catch (error) {
      toast.error("Failed to fetch draw details.");
    }
  };
  const handleNocSelect = (noc: NocCode) => {
    setFormData((prev) => ({
      ...prev,
      nocCodes: Array.isArray(prev.nocCodes) ? [...prev.nocCodes, noc] : [noc], 
    }));
  };
  
  const handleNocRemove = (nocId: string) => {
    setFormData((prev) => ({
      ...prev,
      nocCodes: prev.nocCodes ? prev.nocCodes.filter((noc) => noc._id !== nocId) : [], 
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Only PNG, JPEG, and WEBP are allowed.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB.");
        return;
      }

      setSelectedImageFile(file);
      setSelectedImageUrl(null); 
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const handleCategorySelect = (category: Category) => {
    setFormData(prev => ({ ...prev, category: category._id ?? "", subCategories: [] })); 
    setSelectedCategory(category);
    setSelectedSubcategories([]); 
  };
  const handleSelectImageFromGallery = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setSelectedImageFile(null); 
    setPreviewImage(imageUrl); 
  };
  const handleSubcategorySelect = (subcategory: subCategory) => {
    if (!subcategory._id) return; // 
    if (!selectedSubcategories.some((sub) => sub._id === subcategory._id)) {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
      setFormData(prev => ({
        ...prev,
        subCategories: [...prev.subCategories, subcategory._id ?? ""], 
      }));
    }
  };
  

  const handleRemoveSubcategory = (subcategoryId: string | undefined) => {
    if (!subcategoryId) return;
    setSelectedSubcategories((prev) => prev.filter(sub => sub._id !== subcategoryId));
    setFormData((prev) => ({
      ...prev,
      subCategories: prev.subCategories.filter(sub => {
        if (typeof sub === "string") {
          return sub !== subcategoryId;
        } else if (typeof sub === "object" && sub._id) {
          return sub._id !== subcategoryId;
        }
        return true;
      }),
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("publishedBy", formData.publishedBy);
    formDataToSend.append("invitationsIssued", formData.invitationsIssued);
    formDataToSend.append("drawDate", formData.drawDate);
    formDataToSend.append("crsCutoff", formData.crsCutoff);
    formDataToSend.append("score", formData.score);
    formDataToSend.append("rankRequired", formData.rankRequired);
    formDataToSend.append("tieBreakingRule", formData.tieBreakingRule);
    formDataToSend.append("additionalInfo", formData.additionalInfo);
    formDataToSend.append("imageCaption", formData.imageCaption);
    formDataToSend.append("metaTitle", formData.metaTitle);
    formDataToSend.append("metaDescription", formData.metaDescription);
    formDataToSend.append("linkEdit", formData.linkEdit);
  
    formData.subCategories.forEach((subCategory) => {
      if (typeof subCategory === "object" && subCategory._id) {
        formDataToSend.append("subCategories[]", subCategory._id); 
      } else if (typeof subCategory === "string") {
        formDataToSend.append("subCategories[]", subCategory);
      }
    });
    formData.nocCodes.forEach((noc) => {
      formDataToSend.append("nocCodes[]", noc._id); 
    })
  
    if (selectedImageFile) {
      formDataToSend.append("image", selectedImageFile);
    } else if (selectedImageUrl) {
      formDataToSend.append("imageUrl", selectedImageUrl);
    }
    try {
      if (id) {
        // Update existing draw
        const res = await drawrAPi.UpdateDraw(id, formDataToSend);
        if (res.status) {
          toast.success("Draw updated successfully.");
          navigate(-1);
        }
      } else {
        const res = await drawrAPi.AddDraw(formDataToSend);
        if (res.status) {
          toast.success("Draw successfully added.");
          navigate("/drawlist");
        }
      }
    } catch (error) {
      toast.error("Failed to submit draw.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="mb-6 flex items-center justify-between">
        <Button color="gray" onClick={() => navigate(-1)}>
          <span className="flex gap-2 items-center">
            <FaChevronLeft />
            Back
          </span>
        </Button>
        <h2 className="text-2xl font-semibold">Add New Draw</h2>
        <p></p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="col-span-2">
          <Label htmlFor="title" value="Title" />
          <TextInput
            id="title"
            type="text"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

      
        <div className="col-span-2">
          <Label htmlFor="category" value="Category" />
          <AutocompleteCategory key={formData.category} onSelect={handleCategorySelect} value={selectedCategory} />
        </div>

       
        <div className="col-span-2">
          <Label htmlFor="subcategory" value="Subcategories" />
          {selectedCategory ? (
            <AutocompleteSubCategory
              key={formData.subCategories.join(",")}
              onSelect={handleSubcategorySelect}
              category={selectedCategory}
              value={selectedSubcategories.length > 0 ? selectedSubcategories[selectedSubcategories.length - 1] : undefined}
            />
          ) : (
            <TextInput disabled placeholder="Select a category first" />
          )}

          {/* Display Selected Subcategories */}
          {selectedSubcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSubcategories.map((sub) => (
                <span key={sub._id} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full flex items-center">
                  {sub.name}
                  <button
                    type="button"
                    className="ml-2 text-red-600 hover:text-red-800"
                    onClick={() => handleRemoveSubcategory(sub._id)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Published By */}
        <div>
          <Label htmlFor="publishedBy" value="Published By" />
          <TextInput id="publishedBy" type="text" value={formData.publishedBy} disabled />
        </div>

        {/* Image Upload */}
       

        {/* Invitations Issued */}
        <div>
          <Label htmlFor="invitationsIssued" value="Invitations Issued" />
          <TextInput
            id="invitationsIssued"
            type="number"
            value={formData.invitationsIssued}
            onChange={(e) => setFormData({ ...formData, invitationsIssued: e.target.value })}
            required
          />
        </div>

        
        <div>
          <Label htmlFor="drawDate" value="Draw Date" />
          <input
            id="drawDate"
            type="date"
            className="w-full"
            value={formData.drawDate}
            onChange={(e) => setFormData({ ...formData, drawDate: e.target.value })}
            required
          />
        </div>

        {/* CRS Cutoff */}
        <div>
          <Label htmlFor="crsCutoff" value="CRS Cutoff (Optional)" />
          <TextInput id="crsCutoff" type="text" placeholder="CRS Cutoff (Optional)" value={formData.crsCutoff} onChange={(e) => setFormData({ ...formData, crsCutoff: e.target.value })} />
        </div>

        
        <div>
          <Label htmlFor="rankRequired" value="Rank Required" />
          <TextInput id="rankRequired" type="text"  placeholder="Rank Required" value={formData.rankRequired} onChange={(e) => setFormData({ ...formData, rankRequired: e.target.value })} required />
        </div>

       
        <div>
          <Label htmlFor="tieBreakingRule" value="Tie Breaking Rule" />
          <TextInput id="tieBreakingRule" type="text"  placeholder="Tie Breaking Rule" value={formData.tieBreakingRule} onChange={(e) => setFormData({ ...formData, tieBreakingRule: e.target.value })} required />
        </div>

     
        <div className="col-span-2">
          <Label htmlFor="additionalInfo" value="Additional Information" />
          <Textarea id="additionalInfo" placeholder="Enter additional information..." value={formData.additionalInfo} onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })} rows={4} />
        </div>
        <div className="col-span-2">
          <Label>Image Source</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <Radio checked={imageSource === "upload"} onChange={() => setImageSource("upload")} />
              Upload Image
            </label>
            <label className="flex items-center gap-2">
              <Radio checked={imageSource === "gallery"} onChange={() => setImageSource("gallery")} />
              Select from Gallery
            </label>
          </div>
        </div>
        
        {/* Upload Image */}
        {imageSource === "upload" && (
          <div className="col-span-2">
            <Label htmlFor="image" value="Upload Image (16:9 ratio, 2MB, PNG/JPEG/WEBP)" />
            <FileInput id="image" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
            {previewImage && (
              <img src={previewImage} alt="Uploaded preview" className="w-40 h-40 object-cover rounded mt-2" />
            )}
          </div>
        )}

        
        {imageSource === "gallery" && (
          <div className="col-span-2">
            <Button onClick={() => setIsGalleryOpen(true)} className="bg-primary text-white">Open Gallery</Button>
            {previewImage && (
              <img src={previewImage} alt="Selected preview" className="w-40 h-40 object-cover rounded mt-2" />
            )}
          </div>
        )}

     
        <GalleryPicker isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} onSelect={handleSelectImageFromGallery} />
        <div className="col-span-2">
          <Label htmlFor="tieBreakingRule" value="ImageCaption" />
          <TextInput id="imageCaption" type="text"  value={formData.imageCaption} onChange={(e) => setFormData({ ...formData, imageCaption: e.target.value })} required />
        </div>
        <div className="col-span-2">
          <Label htmlFor="metaTitle" value="Meta Title" />
          <TextInput
            id="metaTitle"
            type="text"
            placeholder="Enter meta title"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
          />
        </div>

       
        <div className="col-span-2">
          <Label htmlFor="linkEdit" value="Link Edit (Slug)" />
          <TextInput
            id="linkEdit"
            type="text"
            placeholder="Enter custom URL slug"
            value={formData.linkEdit}
            onChange={(e) => setFormData({ ...formData, linkEdit: e.target.value })}
          />
        </div>

   
        <div className="col-span-2">
          <Label htmlFor="metaDescription" value="Meta Description" />
          <Textarea
            id="metaDescription"
            placeholder="Enter meta description for SEO"
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            rows={4}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="nocCodes">NOC Codes</Label>
          <AutoCompleteNocCode
            selectedNocCodes={formData.nocCodes}
            onSelect={handleNocSelect}
            onRemove={handleNocRemove}
          />
        </div>
        {/* Submit Button */}
        <div className="col-span-2">
          <Button type="submit"  className="w-full bg-primary text-white">Submit Draw</Button>
        </div>
      </form>
    </div>
  );
};

export default DrawForm;
