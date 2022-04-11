import mongoose from "mongoose";
import { hash } from "argon2";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
  },
});

const User = mongoose.model("User", userSchema);

User.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const { password } = this;
    this.password = await hash(password);
    return next();
  } else {
    return next();
  }
});

// User.methods.comparePassword = function (password) {
//   return compareSync(password, this.password);
// };

User.methods.toJSON = function () {
  const user = this.toObject();
  delete user.__v;
  delete user.password;
  return user;
};

export default User;
