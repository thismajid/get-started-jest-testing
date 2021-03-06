import mongoose from "mongoose";
import { hash, verify } from "argon2";

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
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

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const { password } = this;
    this.password = await hash(password);
    return next();
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = async function (password) {
  return await verify(this.password, password);
  // return compareSync(password, this.password);
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.__v;
  delete user.password;
  return user;
};

const User = mongoose.model("User", UserSchema);

export default User;
