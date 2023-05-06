const { Router, response } = require("express");

const { authRegister, authLogin } = require("../services/user_services");

const {
  customResponseError,
  customResponseSuccess,
} = require("../utils/customAPIResponse");



const route = Router();

route.post("/login", async (req, res) => {
  const { error } = schemaLogin.validate(req.body);
  if (error)
    return res.status(400).json(customResponseError(error.details[0].message));

  try {
    const response = await authLogin(req.body);
    if (response.token.length > 100) {
      res.status(200).send(customResponseSuccess(response));
    } else {
      res
        .status(400)
        .json(customResponseError("No se pudo iniciar sesión, reintente..."));
    }
  } catch (error) {
    return res.status(400).json(customResponseError(error));
  }
});

route.post("/register", async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json(customResponseError("El campo 'name' es obligatorio"));
      return;
    }
    const data = await authRegister(req.body);
    if(data.state){
      const response = { token: "Osjqbgk1brk1krncblqjgow91827461", state: true, userId: data.user.id };
      res.status(201).json(customResponseSuccess(response));
    } 
    else {
      const response = { token: false, state: "El usuario ya está registrado" };
      res.status(200).json(customResponseSuccess(response));
    }
  } catch (error) {
    res.status(400).json(customResponseError("error"));
  }
});

module.exports = route;
