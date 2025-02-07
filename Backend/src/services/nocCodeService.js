const NocCode = require("../config/models/nocCodeModel");
const  ExcelService = require("../services/excelService");

 const NocCodeService = {
    async createNocCode(data) {
      return await NocCode.create(data);
    },
  
    async getAllNocCodes() {
      return await NocCode.find();
    },
  
    async getNocCodeById(id) {
      return await NocCode.findById(id);
    },
  
    async updateNocCode(id, data) {
      return await NocCode.findByIdAndUpdate(id, data, { new: true });
    },
  
    async deleteNocCode(id) {
      return await NocCode.findByIdAndDelete(id);
    },
    async bulkUpload(file) {
        try {
          let data;
          if (file.mimetype === "text/csv") {
            data = await ExcelService.parseCSV(file.path);
          } else if (
            file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.mimetype === "application/vnd.ms-excel"
          ) {
            data = ExcelService.parseExcel(file.path);
          } else {
            throw new Error("Unsupported file type.");
          }
    
          const formattedData = data.map((noc) => ({
            tier: noc["Tier"] || "",
            nocCode: noc["NOC Code"] || "",
            classTitle: noc["Class Title"] || "",
          }));
    
          const savedNocCodes = await NocCode.insertMany(formattedData, { ordered: false });
          return { status: true, data: savedNocCodes, err: {} };
        } catch (error) {
          return { status: false, data: {}, err: error.message };
        }
      }
  };

  module.exports = NocCodeService;