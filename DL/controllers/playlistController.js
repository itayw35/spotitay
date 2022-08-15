const playlistModel = require("../models/playlist");

const create = async function (obj) {
  const res = await playlistModel.playlistModel.create(obj);
  return res;
};
const read = async function (query) {
  const res = await playlistModel.playlistModel.find(query);
  return res;
};
const readOne = async function (id) {
  const res = await playlistModel.playlistModel.findById(id);
  return res;
};
const update = async function (query, data) {
  const res = await playlistModel.playlistModel.updateOne(query, data);
  return res;
};
const del = async function (query) {
  const res = await update(query, { isActive: false });
  return res;
};

module.exports = { create, read, update, del, readOne };
