const drawService = require("../services/drawService");

const drawController = {
  async addDraw(req, res) {
    try {
      const drawData = req.body;
      if (req.file) {
        drawData.image = req.file.path; 
      }

      const draw = await drawService.createDraw(drawData);
      return res.json({ status: true, data: draw, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },

  async getAllDraws(req, res) {
    try {
      const draws = await drawService.getAllDraws();
      return res.json({ status: true, data: draws, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },

  async getDrawById(req, res) {
    try {
      const { id } = req.params;
      const draw = await drawService.getDrawById(id);
      if (!draw) return res.status(404).json({ status: false, data: {}, err: "Draw not found" });

      return res.json({ status: true, data: draw, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },
  async getDrawByLinkEdit(req, res) {
    try {
      const { id } = req.params;
      const draw = await drawService.getDrawByLinkEdit(id);
      if (!draw) return res.status(404).json({ status: false, data: {}, err: "Draw not found" });

      return res.json({ status: true, data: draw, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },

  async updateDraw(req, res) {
    try {
      const { id } = req.params;
      const drawData = req.body;
      if (req.file) {
        drawData.image = req.file.path; // Update image path
      }

      const updatedDraw = await drawService.updateDraw(id, drawData);
      return res.json({ status: true, data: updatedDraw, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },

  async deleteDraw(req, res) {
    try {
      const { id } = req.params;
      const deletedDraw = await drawService.deleteDraw(id);
      return res.json({ status: true, data: deletedDraw, err: {} });
    } catch (error) {
      return res.json({ status: false, data: {}, err: error.message });
    }
  },
};

module.exports = drawController;
