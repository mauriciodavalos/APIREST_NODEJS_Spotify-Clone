const bcrypt = require('bcryptjs');

const saltRounds = 10; // Número de rondas de cifrado de contraseña

/**
 * Función para cifrar la contraseña del usuario.
 * Devuelve la contraseña cifrada o un error si no se puede cifrar.
 * @param {*} passwordPlain - Contraseña en texto plano.
 */
const encryptPassword = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, 10)
  return hash
}

/**
 * Función para comparar la contraseña del usuario con la contraseña cifrada almacenada.
 * Devuelve true si las contraseñas coinciden, false si no coinciden o un error si no se puede comparar.
 * @param {string} passwordPlain - Contraseña en texto plano.
 * @param {string} hashedPassword - Contraseña cifrada almacenada.
 */
const comparePassword = async (passwordPlain, hash) => {
    const match = await bcrypt.compare(password, hash);

};

module.exports = { encryptPassword, comparePassword };
