import Web3 from "web3";

let web3:Web3 | null = null;
const rpcUrl = "https://rpc-publicnode.emoney.io/";

// E Money Network Mainnet RPC URL
export function getWeb3Provider():Web3{
  if(web3 === null) {
    web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  }
  return web3;
}
