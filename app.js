require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger")
const { dbConnectMySql } = require("./config/mysql")
const dbConnecNoSql = require('./config/mongo')
const swaggerUI = require("swagger-ui-express")
const openApiConfiguration = require("./docs/swagger")



const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || " development ";

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))


morganBody(app,{
    noColors:true,
    stream: loggerStream,
    skip: function(req, res){
        return res.statusCode < 400
    }

})

const port = (process.env.PORT || 3000)

/**
 * Definir Ruta para documentacion
 */
app.use("/documentation", swaggerUI.serve, swaggerUI.setup(openApiConfiguration))


//**Aqui Invocaremos a las rutas ROUTES**

app.use("/api", require("./routes"))

if (NODE_ENV !== "test") {
    app.listen(port);
};

(ENGINE_DB === "nosql") ? dbConnecNoSql() : dbConnectMySql();

module.exports = app;