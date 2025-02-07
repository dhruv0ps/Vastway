const userService = require('../services/userService');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        return res.json({ status: true, data: user, err: {} });
    } catch (error) {
        console.log("here erre",error)
        return res.json({ status: false, data: {}, err: error.message });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const user = await userService.get_all_users();
        if (user) {
            return res.json({ status: true, data: user, err: {} });
        } else {
            return res.json({ status: false, data: {}, err: 'no user found' });
        }
    } catch (error) {
        return res.json({ status: false, data: {}, err: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            return res.json({ status: true, data: user, err: {} });
        } else {
            return res.json({ status: false, data: {}, err: 'User not found' });
        }
    } catch (error) {
        return res.json({ status: false, data: {}, err: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (user) {
            return res.json({ status: true, data: user, err: {} });
        } else {
            return res.json({ status: false, data: {}, err: 'User not found' });
        }
    } catch (error) {
        return res.json({ status: false, data: {}, err: error.message });
    }
};
const getCurrentUser = async (req, res) => {
    try {
        // console.log(req.user)
        const userId = req.user._id;
        const user = await userService.getCurrentUser(userId);
        if (user) {
            return res.status(200).json({ status: true, data: user, err: {} });
        } else {
            return res.json({ status: false, data: {}, err: 'User not found' });
        }
    } catch (error) {
        return res.json({ status: false, data: {}, err: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        // Assuming you're using middleware to attach the user ID to the request
        // const userId = req.user.userId;
        // await userService.logoutUser(userId);
        return res.json({ status: true, message: 'Logged out successfully', err: {} });
    } catch (error) {
        return res.json({ status: false, data: {}, err: error.message });
    }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    getAllUsers,
    logoutUser,
    getCurrentUser
};
