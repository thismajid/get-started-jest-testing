import User from "../models/user.js";
import jwt from "jsonwebtoken";

const register = async (registerData) => {
  try {
    const { email } = registerData;
    const userExist = await findOneByEmail(email);
    if (userExist) throw new Error("User exist");
    return await createUser(registerData);
  } catch (err) {
    throw err;
  }
};

const login = async (loginData) => {
  try {
    const { email, password } = loginData;
    const userExist = await findOneByEmail(email);
    if (!userExist || !(await userExist.comparePassword(password)))
      throw new Error("Invalid credential");
    return signToken({ sub: userExist._id });
  } catch (err) {
    throw err;
  }
};

const findOneByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw err;
  }
};

const createUser = async (newUser) => {
  try {
    return await new User(newUser).save();
  } catch (err) {
    throw err;
  }
};

const signToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60,
  });
};

// try {
// } catch (err) {
//   console.log(err);
//   throw err;
// }

export { register, login, findOneByEmail, createUser };
