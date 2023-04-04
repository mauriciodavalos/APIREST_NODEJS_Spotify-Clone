const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongooseDelete = require('mongoose-delete');

const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    select : false,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: ["user", "admin"],
    default: "user"
  },
}, {
  timestamps: true, //TODO CreatedAt, updatedAt
  versionKey: false
});


UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserScheme);  //Nombre de la tabla de la base de datos no relacional
