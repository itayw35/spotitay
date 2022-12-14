const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/auth");
const playlistLogic = require("../BL/playlistLogic");

router.post("/make-playlist", jwtAuth, async (req, res) => {
  try {
    const playlist = await playlistLogic.makeplaylist(req.body, req._id);
    res.status(200).send(playlist.message);
  } catch (err) {
    res.send({ code: err.code, message: err.message });
  }
});
router.get("/get-playlists/:playlist?", jwtAuth, async (req, res) => {
  try {
    const playlists = await playlistLogic.getPlayList(
      req.params.playlist,
      req._id
    );
    res.status(200).send(playlists);
  } catch (err) {
    res.send({ code: err.code, message: err.message });
  }
});
router.put("/add-song", jwtAuth, async (req, res) => {
  try {
    const addSong = await playlistLogic.addSong(req.body, req._id);
    res.status(200).send(addSong.message);
  } catch (err) {
    res.send({ code: err.code, message: err.message });
  }
});
router.delete("/remove-song", jwtAuth, async (req, res) => {
  try {
    const deleteSong = await playlistLogic.removeSong(req.body, req._id);
    res.status(200).send(deleteSong.message);
  } catch (err) {
    res.send({ code: err.code, message: err.message });
  }
});
router.put("/remove-playlist", jwtAuth, async (req, res) => {
  try {
    const deletePlaylist = await playlistLogic.removePlaylist(
      req.body,
      req._id
    );
    res.status(200).send(deletePlaylist.message);
  } catch (err) {
    res.send({ code: err.code, message: err.message });
  }
});
router.post("/share-playlist", jwtAuth, async (req, res, next) => {
  try {
    const sharedPlaylist = await playlistLogic.sharePlaylist(
      req.body.playlist,
      req._id,
      req.body.email
    );
    res.status(200).send(sharedPlaylist.message);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
module.exports = router;
