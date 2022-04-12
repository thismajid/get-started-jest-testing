import { register } from "../services/auth.js";

const registerController = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await register(body);
    return res.status(201).json({
      status: "success",
      message: "New user created successfully",
      body: newUser,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const loginController = async (req, res, next) => {
  try {
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { registerController, loginController };
