const customHeader = (req, res, next) => {
    console.log(req.headers)
    try {
        const apiKey = req.headers.api_key;
        if (apiKey === "mau-01") {
            next();
        } else {
            res.status(403);
            res.send({ error: "la_apikey_no_es_correcta" });
        }
    } catch (e) {
        res.status(403);
        res.send({ error: "algo_ocurrio_con_el_custom_header" });
    }
};

module.exports = customHeader;
