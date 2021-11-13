import web3 from "./web3";
import Factory from "./contracts/Factory.json";

const instance = new web3.eth.Contract(
  Factory.abi,
  "0x8De3FFbaa741e38Fd279575bC5e27B925c1A82F8"
);

export default instance;
