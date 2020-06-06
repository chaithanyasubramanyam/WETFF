import web3 from "./web3";
const compiledwetff = require("./build/wetff.json");

// This is just an instance campaignFactory available to other file
// we Hard coded is unlink our campaign file because there is only 1 factory and many campaigns

const instance = new web3.eth.Contract(
  JSON.parse(compiledwetff.interface),
  "0x7154DaAf1AC7C52421158271Bb831b2Dc58Ba2FF"
);

export default instance;
