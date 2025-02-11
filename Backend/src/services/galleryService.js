

const ImageModel = require("../config/models/GalleryModel");

 const ImageService = {
    async uploadImage(imageUrl, body) {
      try {
        if (!imageUrl) throw new Error("No file uploaded");
  
      
        const newImage = new ImageModel({ url: imageUrl, ...body });
        await newImage.save();
        return newImage;
      } catch (error) {
        throw new Error(error);
      }
    },
  
    async getImages({ search = "", sort = "asc", page = 1, limit = 10 }) {
      try {
        const query = {};
    
        if (search) {
          query.title = { $regex: search, $options: "i" };
        }
    
        const sortOption = sort === "desc" ? -1 : 1;
        const skip = (page - 1) * limit;
    
        const images = await ImageModel.find(query)
          .sort({ title: sortOption })
          .skip(skip)
          .limit(limit);
    
        const totalImages = await ImageModel.countDocuments(query);
        const totalPages = Math.ceil(totalImages / limit);
    
        return {
          images,
          totalPages,
          currentPage: page,
          totalImages,
        };
      } catch (error) {
        throw new Error("Error fetching images");
      }
    },
    
  
    async updateImage(id, updateData,file) {
      try {

        const image = await ImageModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!image) throw new Error("Image not found");
        return image;
      } catch (error) {
        throw new Error("Error updating image");
      }
    },
  
    async deleteImage(id) {
      try {
        const image = await ImageModel.findByIdAndDelete(id);
        if (!image) throw new Error("Image not found");
  
        return { message: "Image deleted successfully" };
      } catch (error) {
        throw new Error("Error deleting image");
      }
    }
  };

  module.exports = ImageService;