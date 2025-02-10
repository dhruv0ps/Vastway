const express = require("express")
var router = express.Router();
var bodyParser = require("body-parser")
const categoryController = require("../controllers/categoryDrawController");
const drawController = require("../controllers/drawController")
const { authenticateToken } = require("../config/auth");
const { imageUpload } = require("../config/multerConfig");
const galleryController = require("../controllers/galleryController")
const NocCodeController = require("../controllers/nocController")
const LeadController = require("../controllers/leadController");
const {fileUpload} = require("../config/multerConfig");
var jsonParser = bodyParser.json()
router.use(jsonParser)
router.post("/categories", categoryController.addCategory);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.delete("/categories/:id", categoryController.deleteCategory);
router.put("/categories/:id", categoryController.updateCategory);
router.post("/subcategories/:id", categoryController.addSubCategory);
router.get("/subcategories/:id", categoryController.getAllSubCategories);
// router.get("/subcategories/:id", categoryController.getSubCategoryById);
router.delete("/subcategories/:id", categoryController.deleteSubCategory);

router.post("/draws", imageUpload.single("image"), drawController.addDraw);
router.get("/draws", drawController.getAllDraws);
router.get("/draws/:id", drawController.getDrawById);
router.put("/draws/:id", imageUpload.single("image"), drawController.updateDraw);
router.delete("/draws/:id", drawController.deleteDraw);
router.get("/canadian/:id",drawController.getDrawByLinkEdit)

router.post("/gallery",imageUpload.single("image"), galleryController.uploadImage);
router.get("/gallery", galleryController.getImages);
router.put("/gallery/:id",imageUpload.single("image"), galleryController.updateImage);
router.delete("/gallery/:id", galleryController.deleteImage);

router.post("/noccode", NocCodeController.createNocCode);
router.get("/noccode", NocCodeController.getAllNocCodes);
router.get("/noccode/:id", NocCodeController.getNocCodeById);
router.put("/noccode/:id", NocCodeController.updateNocCode);
router.delete("/noccode/:id", NocCodeController.deleteNocCode);
router.post("/noccode/bulk-upload", fileUpload.single("file"), NocCodeController.bulkUpload);

router.post("/leads",imageUpload.array("images",5), LeadController.createLead);
router.get("/leads", LeadController.getAllLeads);
router.get("/leads/:id", LeadController.getLeadById);
router.put("/leads/:id",imageUpload.array("images",5), LeadController.updateLead);
router.delete("/leads/:id", LeadController.deleteLead);


router.post("/lead-categories", LeadController.createLeadCategory);
router.get("/lead-categories", LeadController.getAllLeadCategories);
router.get("/lead-categories/:id", LeadController.getLeadCategoryById);
router.put("/lead-categories/:id", LeadController.updateLeadCategory);
router.delete("/lead-categories/:id", LeadController.deleteLeadCategory);


module.exports = router