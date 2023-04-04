const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongooseDelete = require('mongoose-delete');


const TracksScheme = new mongoose.Schema({
  name: {
    type: String,
  },
  album: {
    type: String,
  },
  cover: {
    type: String,
    validate: {
      validator: (req) => {
        return true;
      },
    },
  },
  artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
  },
  duration: {
    start: {
      type: Number,
    },
    end: {
      type: Number,
    },
  },
  mediaId: {
    type: mongoose.Types.ObjectId,
  },
}, {
  timestamps: true, //TODO CreatedAt, updatedAt
  versionKey: false
});

/**
 * Implementar metodo propio con relacion a storage
 */
TracksScheme.statics.findAllData = function() {
    const joinData = this.aggregate([ //TRACKS
      {
        $lookup: {
            from: "storages", //Tracks ---> Storages
            localField: "mediaId", //Tracks.mediaId
            foreignField: "_id", //Storage._id
            as: "audio" //Alias!
          },
     },
     {
      $unwind:"$audio"
     }
    ])
    return joinData
};


TracksScheme.statics.findOneData = function(id) {
  const joinData = this.aggregate([ //TRACKS}
    {
    $match:{
      _id:mongoose.Types.ObjectId(id)
    }
    },
    {
      $lookup: {
          from: "storages", //Tracks ---> Storages
          localField: "mediaId", //Tracks.mediaId
          foreignField: "_id", //Storage._id
          as: "audio" //Alias!
        },
   },
   {
    $unwind:"$audio"
   }
  ])
  return joinData
//return this.find({ name: new RegExp(name, 'i') });
};


TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TracksScheme);  //Nombre de la tabla de la base de datos no relacional
