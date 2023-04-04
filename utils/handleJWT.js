const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * debes de pasar el objeto del usuario
 * @param {*} user
 */
const tokenSign = (user) => {
const sign = jwt.sign(
    {
        _id: user._id,
        role: user.role
    },
    JWT_SECRET,
    {
        expiresIn:"2h"
    }
);
    return sign
};


/**
 * 
 * @param {*} tokenJWT
 * @returns 
 */
const verifyToken = async (tokenJWT) => {
    try{
        return jwt.verify(tokenJWT, JWT_SECRET)
    } catch(e) {
        return null
    }
}

module.exports = {tokenSign, verifyToken}