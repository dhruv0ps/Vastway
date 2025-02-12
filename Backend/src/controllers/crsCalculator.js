const creService = require("../services/crsService");

const calculateCRS = async(req,res) => {
 try {
   
    const category = await creService.calculateCRS(req.body);
    
    return res.json({ status: true, data: category, err: {} });
  } catch (error) {
    return res.json({ status: false, data: {}, err: error.message });
  }
}

module.exports ={
    calculateCRS
}