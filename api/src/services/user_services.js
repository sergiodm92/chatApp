require("dotenv").config();

const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tokenSecret = process.env.TOKEN_SECRET

const authRegister = async (data) => {
  const { name, password } = data;
  const isUserExist = await User.findOne({
    where: { name },
  });
  if (isUserExist) {
    throw "Usuario ya registrado";
  }

  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    password: pass,
  });

  try {
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

const authLogin = async (data) => {
  const { name, password } = data;

  const user = await User.findOne({
    where: { name },
  });

  if (!user) throw Error("Usuario no encontrado");

  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) console.log("validacion correcta");
  if (!validPassword) throw Error("contraseña no válida");

  const token = jwt.sign(
    {
      name,
      id: user.id,
    },
    tokenSecret
  );
  let response = {token: token, id: user.id}
  return response;
};

module.exports = {
  authLogin,
  authRegister,
};
