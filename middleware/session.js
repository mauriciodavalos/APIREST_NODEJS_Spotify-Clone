const {handleHttpError} = require("../utils/handleError");
const {verifyToken} = require("../utils/handleJWT");
const {usersModel} = require("../models")

const authMiddleware = async (req, res, next) => {
    try{

        if(!req.headers.authorization){
            handleHttpError(res, "Error_not_token_not_session_activated", 401)
            return
        }
        
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken._id){
            handleHttpError(res, "Error_id_token", 401)
            return
        }
        
        const user = await usersModel.findById(dataToken._id)
        req.user = user

        next()

    } catch(e) {
        console.log(e)
        handleHttpError(res, "Error_not_session", 402)
    }
};

module.exports = authMiddleware;