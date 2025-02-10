const LeadService = require("../services/leadService");

 const LeadController = {
  
  async createLead(req, res) {
    try {
      const leadData = {
        ...req.body,
        images: req.files ? req.files.map((file) => file.path) : [],
      };

      const result = await LeadService.createLead(leadData);
      return res.json({ status: true, data: result, err: {} });
    } catch (error) {
      return res.status(500).json({ status: false, data: {}, err: error.message });
    }
  },

  async getAllLeads(req, res) {
    try {
      const result = await LeadService.getAllLeads();
      return res.json({ status: true, data: result, err: {} });
    } catch (error) {
      return res.status(500).json({ status: false, data: {}, err: error.message });
    }
  },

  async getLeadById(req, res) {
    try {
      const result = await LeadService.getLeadById(req.params.id);
      return res.json({ status: true, data: result, err: {} });
    } catch (error) {
      return res.status(500).json({ status: false, data: {}, err: error.message });
    }
  },

  async updateLead(req, res) {
    try {
      const leadData = {
        ...req.body,
        images: req.files ? req.files.map((file) => file.path) : [],
      };
      const result = await LeadService.updateLead(req.params.id, leadData);
      return res.json({ status: true, data: result, err: {} });
    } catch (error) {
      return res.status(500).json({ status: false, data: {}, err: error.message });
    }
  },

  async deleteLead(req, res) {
    try {
      const result = await LeadService.deleteLead(req.params.id);
      return res.json({ status: true, data: result, err: {} });
    } catch (error) {
      return res.status(500).json({ status: false, data: {}, err: error.message });
    }
  },

  async createLeadCategory(req, res) {
    try {
      const result = await LeadService.createLeadCategory(req.body.name);
      return res.json({ status: true, data: result, err: {} });
    } catch (error) {
      return res.status(500).json({ status: false, data: {}, err: error.message });
    }
  },

  async getAllLeadCategories(req, res) {
    try {
      const result = await LeadService.getAllLeadCategories();
      return res.json({ status: true, data: result, err: {} });
    } catch (error) {
      return res.status(500).json({ status: false, data: {}, err: error.message });
    }
  },

  async deleteLeadCategory(req, res) {
    try {
      const result = await LeadService.deleteLeadCategory(req.params.id);
      return res.json({ status: true, data: result, err: {} });
    } catch (error) {
      return res.status(500).json({ status: false, data: {}, err: error.message });
    }
  },
  async getLeadCategoryById(req, res) {
    try {
      const category = await LeadService.getLeadCategory(req.params.id);
      return res.json({ status: true, data: category, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },

  async updateLeadCategory(req, res) {
    try {
      const updatedCategory = await LeadService.updateLeadCategory(req.params.id, req.body);
      return res.json({ status: true, data: updatedCategory, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
}
};
module.exports = LeadController;