import mongoose from "mongoose";

const dbConnection = (() => {
  let instance;

  const createInstance = async () => {
    try {
      return await mongoose.connect("mongodb://localhost/jest-testing");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getInstance: async () => {
      if (!instance) {
        instance = await createInstance();
      }
      return instance;
    },
  };
})();

export default dbConnection;
