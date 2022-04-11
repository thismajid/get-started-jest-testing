import Ajv from "ajv";

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
      return res.status(400).send(msg);
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default loginValidator;
