const { matchedData } = require("express-validator");
const { encryptPassword, comparePassword } = require("../utils/handlePassword")
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handleJWT");
const { handleHttpError } = require("../utils/handleError");
const { compare } = require("bcryptjs");

const registerCtrl = async (req, res) => {
    try {req = matchedData(req);
    const password = await encryptPassword(req.password);
    const body = {...req, password};
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
        token: tokenSign(dataUser),
        user:dataUser
    };
    res.status(201)
    res.send({data});
} catch (e) {
    handleHttpError(res, "Error_en_registro_de_usuario")
    }
};

const loginCtrl = async (req, res) => {
    try {
        req = matchedData (req);
        const user = await usersModel.findOne({email:req.email}).select("password username role email");
        if(!user){
            handleHttpError(res, "usuario_no_existe", 404)
            return
        }

        const hashPassword = user.get("password");

        const check = await compare(req.password, hashPassword)

        if(!check) {
            handleHttpError(res, "password_no_valido", 401)
            return
        }

        user.set("password", undefined, {strict:false})
        const data = {
            token: tokenSign(user),
            user
        }
        res.status(200)
        res.send({data})

    } catch (e) {
        handleHttpError(res, "Error_en_login_de_usuario")
        return
    }
}

module.exports = {registerCtrl, loginCtrl};