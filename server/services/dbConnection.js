import mongoose from "mongoose";

const dbConnection = (() => {
  let instance;

  const createInstance = () => {
    return mongoose
      .createConnection("mongodb://localhost:27017/test-with-jest")
      .asPromise();
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export default dbConnection;
