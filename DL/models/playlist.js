const mongoose = require("mongoose");
const playListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "user",
  },
  name: { type: String, required: true },
  songs: [{ songName: { type: String }, id: { type: String } }],
  isActive: { type: Boolean, default: true },
});
const playlistModel = mongoose.model("playlist", playListSchema);
exports.playlistModel = playlistModel;
