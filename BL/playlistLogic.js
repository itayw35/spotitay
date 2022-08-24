const playlistController = require("../DL/controllers/playlistController");
const userController = require("../DL/controllers/userController");
async function makeplaylist(playlist, userId) {
  if (!playlist) {
    throw { code: 400, message: "missing details" };
  }
  const newPlayList = await playlistController.read({
    name: playlist.name,
    userId: userId,
    isActive: true,
  });
  if (newPlayList.length > 0) {
    throw { code: 400, message: "playlist already exists" };
  }
  playlist.userId = userId;
  const myNewPlayList = await playlistController.create(playlist);
  return { code: 200, message: `${myNewPlayList.name} was created` };
}
async function getPlayList(playlist, userId) {
  const newPlayList = playlist
    ? await playlistController.read({
        name: playlist,
        userId: userId,
        isActive: true,
      })
    : await playlistController.read({ userId: userId, isActive: true });
  if (newPlayList.length < 1) {
    throw { code: 400, message: "playlist does not exist" };
  }
  return newPlayList;
}
async function addSong(data, userId) {
  const { name, id } = data.song;
  if (!name || !id) throw { code: 400, message: "missing details" };
  const newPlayList = await playlistController.read({
    name: data.playlist,
    userId: userId,
  });
  if (newPlayList.length < 1) {
    throw { code: 400, message: "playlist does not exist" };
  }
  playlistController.update(
    { name: newPlayList[0].name, userId: userId },
    { $addToSet: { songs: { songName: name, id: id } } }
  );

  return {
    code: 200,
    message: `${name} added to playlist ${newPlayList[0].name}`,
  };
}
async function removeSong(data, userId) {
  const { playlist, song } = data;
  const updatedPlaylist = await playlistController.read({
    name: playlist,
    userId: userId,
  });
  if (updatedPlaylist.length < 1) {
    throw { code: 400, message: "playlist does not exist" };
  }
  playlistController.update(
    { userId: userId, name: playlist },
    { $pull: { songs: { id: song } } }
  );
  return { code: 200, message: "the song was deleted" };
}
async function removePlaylist(playlist, userId) {
  playlistController.update(
    { name: playlist.name, userId: userId },
    { isActive: false }
  );
  return { code: 200, message: "playlist was removed" };
}
async function sharePlaylist(playlist, userId, email) {
  const friend = await userController.read({ email: email }, "userId");
  return { message: friend };
}
module.exports = {
  makeplaylist,
  addSong,
  getPlayList,
  removeSong,
  removePlaylist,
  sharePlaylist,
};
