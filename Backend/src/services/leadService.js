const {Lead,LeadCategory} = require("../config/models/LeadModel")
 const LeadService = {

  async createLead(data) {
    try {
      const lead = await Lead.create(data);
      return lead;
    } catch (error) {
      throw new Error(error)
    }
  },


  async getAllLeads() {
    try {
      const leads = await Lead.find().populate("categories");
      return leads;
    } catch (error) {
        throw new Error(error)
    }
  },


  async getLeadById(id) {
    try {
      const lead = await Lead.findById(id).populate("categories");
      if (!lead) {
        throw new Error("Lead Not Found");
      }
        
      return lead;
    } catch (error) {
        throw new Error(error)
    }
  },


  async updateLead(id, data) {
    try {
      const updatedLead = await Lead.findByIdAndUpdate(id, data, { new: true });
      if (!updatedLead) {
        throw new Error( "Lead not found" );
      }
        
     return updatedLead
    } catch (error) {
        throw new Error(error)
    }
  },

  async deleteLead(id) {
    try {
      const deletedLead = await Lead.findByIdAndDelete(id);
      if (!deletedLead) throw new Error("Lead not found") ;
      return deletedLead
    } catch (error) {
        throw new Error(error)
    }
  },

  
  async createLeadCategory(name) {
    try {
      const category = await LeadCategory.create({ name });
      return category
    } catch (error) {
        throw new Error(error)
    }
  },

  async getAllLeadCategories() {
    try {
      const categories = await LeadCategory.find();
      return categories
    } catch (error) {
        throw new Error(error)
    }
  },


  async deleteLeadCategory(id) {
    try {
      const category = await LeadCategory.findByIdAndDelete(id);
      if (!category) throw new Error( "Category not found") ;
      return category
    } catch (error) {
        throw new Error(error)
    }
  },
  async updateLeadCategory(id, data) {
    try {
      const updatedCategory = await LeadCategory.findByIdAndUpdate(id, data, { new: true });
      if (!updatedCategory) throw new Error("Category not found");
      return updatedCategory;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getLeadCategory(id) {
    try {
      const category = await LeadCategory.findById(id);
      if (!category) throw new Error("Category not found");
      return category;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = LeadService