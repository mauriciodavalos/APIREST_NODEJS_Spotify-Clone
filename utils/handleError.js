const handleHttpError = (res, message = "algo_sucedio", code = 403) => {
    res.status(code);
    res.send({ error: message })
};

module.exports = {handleHttpError};