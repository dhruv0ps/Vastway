const ImageService = require("../services/galleryService");

const uploadImage = async (req, res) => {
  try {
    const imageUrl = req.file.path;
    console
    const image = await ImageService.uploadImage(imageUrl, req.body);
    res.status(201).json({ status: true, data: image, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: null, err: { message: error.message } });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await ImageService.getImages();
    res.json({ status: true, data: images, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: null, err: { message: error.message } });
  }
};

const updateImage = async (req, res) => {
  try {
    const image = await ImageService.updateImage(req.params.id, req.body, req.file);
    res.json({ status: true, data: image, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: null, err: { message: error.message } });
  }
};

const deleteImage = async (req, res) => {
  try {
    const response = await ImageService.deleteImage(req.params.id);
    res.json({ status: true, data: response, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: null, err: { message: error.message } });
  }
};

module.exports = {
  uploadImage,
  getImages,
  updateImage,
  deleteImage,
};
