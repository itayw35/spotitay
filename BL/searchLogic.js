const axios = require("axios");
const { response } = require("express");

async function searchYT(inp) {
  const options = {
    method: "GET",
    url: "https://simple-youtube-search.p.rapidapi.com/search",
    params: { query: inp, safesearch: "false" },
    headers: {
      "X-RapidAPI-Key": "012f311edbmsh839fa5b8774d442p153b65jsnaad3e1208c56",
      "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
    },
  };

  const res = await axios.request(options).catch(function (error) {
    console.error(error);
  });
  console.log(res.data.results);
  return res.data.results;
}
module.exports = { searchYT };
