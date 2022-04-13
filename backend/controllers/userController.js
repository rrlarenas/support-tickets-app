const asyncHandler = require('express-async-handler')

//@desc   Registra nueva usuario
//@route  /api/users
//@access Public

const registerUser = asyncHandler( async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
      res.status(400)
      
      throw new Error('por favor ingrese la información')
  }
  res.send("Register Route");
}
)

//@desc   Inicia Session usuario
//@route  /api/users/login
//@access Public
const loginUser = asyncHandler( async (req, res) => {
  res.send("Login Route");
}
)

module.exports = {
  registerUser,
  loginUser,
}

