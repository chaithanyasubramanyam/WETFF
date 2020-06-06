const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledWetff = require("./build/wetff.json");

const provider = new HDWalletProvider(
  "universe skirt hat mimic hub replace bunker collect foam excite force album",
  "https://rinkeby.infura.io/v3/435bc476269647dfb0fafcced02594c5"
);

const web3 = new Web3(provider);

const deploy = async () => {
  accounts = await web3.eth.getAccounts();
  console.log("Attempting to login from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledWetff.interface)
  )
    .deploy({ data: "0x" + compiledWetff.bytecode })
    .send({ from: accounts[0], gas: "3000000" });

  console.log("Contract deployed to", result.options.address);
};
deploy();
// Contract deployed at 0x7154DaAf1AC7C52421158271Bb831b2Dc58Ba2FF
