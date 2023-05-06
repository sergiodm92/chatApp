require("dotenv").config();

const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tokenSecret = process.env.TOKEN_SECRET;

const authRegister = async (data) => {
  try {
    const name = data.name;
    const userdb = await User.findOne({
      where: { name },
    });
    if (userdb) {
      return { user: userdb, state: true };
    } else {
      const user = await User.create({
        name
      })
      const savedUser = await user.save();
      const userDB = await User.findOne({
        where: { name },
      });
      return { user: userDB, state: true };
    }
  } catch (error) {
    return false
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
  let response = { token: token, id: user.id };
  return response;
};

module.exports = {
  authLogin,
  authRegister,
};
