const { Router } = require("express");

const { authRegister, authLogin } = require("../services/user_services");

const {
  customResponseError,
  customResponseSuccess,
} = require("../utils/customAPIResponse");

const Joi = require("@hapi/joi");

const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  password: Joi.string().min(6).max(1024).required(),
});

const schemaLogin = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  password: Joi.string().min(6).max(1024).required(),
});

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
  const { error } = schemaRegister.validate(req.body);
  if (error)
    return res.status(400).json(customResponseError(error.details[0].message));

  try {
    const user = await authRegister(req.body);
    if (typeof user !== "string") {
      res.status(201).json(customResponseSuccess(user));
    } else {
      res
        .status(400)
        .json(customResponseError("No se ha podido registrar, reintente..."));
    }
  } catch (error) {
    res.status(400).json(customResponseError(error));
  }
});

module.exports = route;
