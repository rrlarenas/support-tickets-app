const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const User = require("../modules/userModule");
//@desc   Registra nueva usuario
//@route  /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);

    throw new Error("por favor ingrese la información");
  }
  //Buscar si usuario existe
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Usuario ya existe");
  }

  //Hash Pasword
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Crear usuario

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Informacion inválida");
  }
});

//@desc   Inicia Session usuario
//@route  /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
const {email,password} = req.body

    const user = await  User.findOne({email})
    //Check User / Passwd HASH
    if(user &&(await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
          });
    }else{
        res.status(401)
        throw new Error('Credenciales inválidas')
    }

  res.send("Login Route");
});


//@desc   Obtiene usuario actual
//@route  /api/users/me
//@access Private

const getMe = asyncHandler(async (req, res) => {
    const user = {
        user: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
     res.status(200).json(user)
}
)


//Generate TOKEN

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = {
  registerUser,
  loginUser,
  getMe
};
