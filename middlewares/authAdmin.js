import { User } from "../models/userModels.js";

export const authAdmin = async (req, res, next) => {
  try {
    //const user = await User.findOne({ id: req.user_id }); debió ser el método findById para utilizar el req.user.id
    const user = await User.findById(req.user.id);
    console.log("user admin", user);
    if (user.role === 0) return res.status(400).json({ msg: "Admin resources access denied." });
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};
