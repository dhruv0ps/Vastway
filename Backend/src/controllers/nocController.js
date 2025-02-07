const NocCodeService = require("../services/nocCodeService");

const NocCodeController = {
  async createNocCode(req, res) {
    try {
      const nocCode = await NocCodeService.createNocCode(req.body);
      return res.json({ status: true, data: nocCode, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },

  async getAllNocCodes(req, res) {
    try {
      const nocCodes = await NocCodeService.getAllNocCodes();
      return res.json({ status: true, data: nocCodes, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },

  async getNocCodeById(req, res) {
    try {
      const nocCode = await NocCodeService.getNocCodeById(req.params.id);
      if (!nocCode)
        return res.json({ status: false, data: {}, err: "NOC Code not found" });

      return res.json({ status: true, data: nocCode, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },

  async updateNocCode(req, res) {
    try {
      const updatedNocCode = await NocCodeService.updateNocCode(
        req.params.id,
        req.body
      );
      if (!updatedNocCode)
        return res.json({ status: false, data: {}, err: "NOC Code not found" });

      return res.json({ status: true, data: updatedNocCode, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },

  async deleteNocCode(req, res) {
    try {
      const deletedNocCode = await NocCodeService.deleteNocCode(req.params.id);
      if (!deletedNocCode)
        return res.json({ status: false, data: {}, err: "NOC Code not found" });

      return res.json({ status: true, data: deletedNocCode, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },
  async bulkUpload(req, res) {
    try {
      const result = await NocCodeService.bulkUpload(req.file);
      return res.json({ status: true, data: result, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },
};
module.exports = NocCodeController;
