import Ajv from "ajv";
import SendResponse from "./../../utils/sendResponse.js";

const sendResponse = new SendResponse();

const ajv = new Ajv({ allErrors: true });

const loginValidator = async (req, res, next) => {
  try {
    const schema = {
      type: "object",
      properties: {
        email: {
          type: "string",
          pattern: "^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[a-zA-Z]{2,4}",
        },
        password: {
          type: "string",
          pattern:
            "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})",
        },
      },
      required: ["email", "password"],
      additionalProperties: true,
    };

    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      let msg;
      validate.errors.forEach(async (err) => {
        msg += `${err.instancePath} ${err.message}`;
      });
      return sendResponse.setError(400, msg).send(res);
    }
    next();
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

const registerValidator = async (req, res, next) => {
  try {
    const schema = {
      type: "object",
      properties: {
        firstName: { type: "string", minLength: 2, maxLength: 30 },
        lastName: { type: "string", minLength: 2, maxLength: 30 },
        email: {
          type: "string",
          pattern: "^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[a-zA-Z]{2,4}",
        },
        password: {
          type: "string",
          pattern:
            "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})",
        },
      },
      required: ["firstName", "lastName", "email", "password"],
      additionalProperties: true,
    };

    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      let msg = "";
      validate.errors.forEach(async (err) => {
        msg += `${err.instancePath} ${err.message}`;
      });
      return sendResponse.setError(400, msg).send(res);
    }
    next();
  } catch (err) {
    return sendResponse.setError(400, err.message).send(res);
  }
};

export { registerValidator, loginValidator };
