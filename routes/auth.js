const express = require("express");
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const router = express.Router();
const {validatorRegister, validatorLogin} = require("../validators/auth");


/**
 * Ruta de Crear Registro Usuario
 * http://localhost:3001/api
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: Registrar nuevo user
 *          description: Esta ruta es para registrar un usuario
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: Usuario registrado de manera correcta
 *                  '403':
 *                      description: Error por validacion de usuario
 */
router.post('/register', validatorRegister , registerCtrl);

/**
 * Ruta de Login Usuario
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Login user"
 *      description: Iniciar session a un nuevo usuario y obtener el token de sesión
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post('/login', validatorLogin , loginCtrl);

module.exports = router;