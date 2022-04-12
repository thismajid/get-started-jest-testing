import SendResponse from "../utils/sendResponse.js";
import { register, login } from "../services/auth.js";

const sendResponse = new SendResponse();

const registerController = async (req, res, next) => {
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
  try {
    const { body } = req;
    const token = await login(body);
    return sendResponse
      .setSuccess(200, "Login successfully", { access_token: token })
      .send(res);
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

export { registerController, loginController };
