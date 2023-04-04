const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongooseDelete = require('mongoose-delete');


const StorageScheme = new mongoose.Schema({
  url: {
    type: String,
  },
  filename: {
    type: String,
  },
}, {
  timestamps: true, //TODO CreatedAt, updatedAt
  versionKey: false
});


StorageScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storage", StorageScheme);  //Nombre de la tabla de la base de datos no relacional
