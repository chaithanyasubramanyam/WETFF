const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const wetffPath = path.resolve(__dirname, "contracts", "wetff.sol");
const source = fs.readFileSync(wetffPath, "utf8");

const output = solc.compile(source, 1).contracts;
// console.log(output);

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}

// var input = {
//   language: "Solidity",
//   sources: {
//     "wetff.sol": {
//       content: source,
//     },
//   },
//   settings: {
//     outputSelection: {
//       "*": {
//         "*": ["*"],
//       },
//     },
//   },
// };

// const output = JSON.parse(solc.compile(JSON.stringify(input)));
// // console.log(output.contracts["wetff.sol"]["wetff"]["evm"].bytecode);
// // console.log(output.contracts["wetff.sol"]["wetff"].abi);

// fs.ensureDirSync(buildPath);

// for (let contract in output.contracts["wetff.sol"]) {
//   fs.outputJSONSync(
//     path.resolve(buildPath, contract.replace(":", "") + ".json"),
//     output.contracts["wetff.sol"][contract]
//   );
// }
