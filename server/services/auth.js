import User from "../models/user.js";

const register = async (registerData) => {
  try {
    const { email } = registerData;
    const userExist = await findOneByEmail(email);
    console.log(userExist);
    if (userExist) throw new Error("User exist");
    return await createUser(registerData);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const findOneByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createUser = async (newUser) => {
  try {
    return await new User(newUser).save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// try {
// } catch (err) {
//   console.log(err);
//   throw err;
// }

export { register, findOneByEmail, createUser };
