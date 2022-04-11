const registerController = async (req, res, next) => {
  try {
      res.send('ok')
  } catch (err) {
    console.log(err);
  }
};

const loginController = async (req, res, next) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

export { registerController, loginController };
