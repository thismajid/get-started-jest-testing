import SendResponse from "../utils/sendResponse.js";
import { register } from "../services/auth.js";

const registerController = async (req, res, next) => {
  const sendResponse = new SendResponse();
  try {
    const { body } = req;
    const newUser = await register(body);
    return sendResponse
      .setSuccess(201, "New User created successfully", newUser)
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const loginController = async (req, res, next) => {
  // const SendResponse = new SendResponse();
  try {
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { registerController, loginController };
