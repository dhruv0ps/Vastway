const jwt = require('jsonwebtoken');
const User = require("../config/models/userModel");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log("here")
  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("here2", decoded)
    // Fetch the user from the database and populate the role
    const user = await User.findById(decoded.userId).populate({
      path: 'role',
      populate: {
        path: 'permissions'
      }
    });
    // console.log(user)

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Please login again to proceed" });
  }
};

module.exports = { authenticateToken };