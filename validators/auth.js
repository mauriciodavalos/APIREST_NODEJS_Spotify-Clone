const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorRegister = [
  check('username')
    .notEmpty()
    .withMessage('El nombre de usuario es requerido')
    .isLength({ min: 3 })
    .withMessage('El nombre de usuario debe tener al menos 3 caracteres'),

  check('email')
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email no es válido'),

  check('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  (req, res, next) => {
      return validateResults (req, res, next)
  }    

];

const validatorLogin = [
  check("email")
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage("El email no es válido"),

  check("password")
    .exists()
    .notEmpty()
    .withMessage("La contraseña es requerida"),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {validatorRegister, validatorLogin};