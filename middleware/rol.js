const { handleHttpError } = require("../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */

const checkRol = (roles) => (req, res, next) => {
    try{
        const { user } = req;
        console.log({user})
        const rolesByUser = user.role;

        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle)) //true
        if(!checkValueRol) {
            handleHttpError(res, "user_not_permission", 403)
            return
        }

        next();
    } catch(e){
        handleHttpError(res, "Error verifying user role", 403);
    }
}

module.exports = checkRol;