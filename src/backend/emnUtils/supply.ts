import { getWeb3Provider } from "@/backend/emnUtils/web3Provider";
import { getWeb3Provider as getWeb3BNBProvider} from "@/backend/bnbUtils/web3Provider";

import erc20AbiJson from "./emycbsc_contractabi.json";

const web3 = getWeb3Provider();
const web3BSC = getWeb3BNBProvider();

const emycContracts: Array<{
  chain: "BSC" | "EMYC";
  address: string;
  label: string;
}> = [
  {
    chain: "BSC",
    address: "0xb5dEE151EE93fFF272a84ED5c16c06A14b4D2316",
    label: "Investor Vesting contract",
  },
  {
    chain: "BSC",
    address: "0x33B4Dd87D0B28EA5b729a31D4AA2D63143F1032A",
    label: "Investor Claim",
  },
  {
    chain: "BSC",
    address: "0xABb878E7B99D8011fD2AACD54290eB4f656a3492",
    label: "Conversion",
  },
  {
    chain: "EMYC",
    address: "0x57f7b663f6720d61e02c6f9563cf75d82004ef14",
    label: "Validator Node",
  },
  {
    chain: "EMYC",
    address: "0x8411E5a0588bd21Eb30C74B63d8A89BcE8Ce955D",
    label: "Ecosystem",
  },
  {
    chain: "EMYC",
    address: "0xBbf3fCB7809837f66775BFa35A89053c1f92f4dA",
    label: "Marketing",
  },
  {
    chain: "EMYC",
    address: "0xC56cF84bE248faB9443F5bD6892A9D4A1FDfB0c4",
    label: "Foundation Nodes",
  },
  {
    chain: "EMYC",
    address: "0x6fF920569ef26792784F2B912a43DCb2af0a88F3",
    label: "Liquidity",
  },
  {
    chain: "EMYC",
    address: "0x491c91c0a6fa6Aecdc1EB4342FeC3f75Bbc738A9",
    label: "Airdrops & Staking",
  },
  {
    chain: "EMYC",
    address: "0xc2a6e7b34f5BC69749AdDEDB0AA215d3fC09Be9d",
    label: "Teams",
  },
];

async function getAddressInfo(address: string): Promise<number | undefined> {
  try {
    const balanceWei = await web3.eth.getBalance(address);
    const balanceEth = web3.utils.fromWei(balanceWei, "ether");
    return Number(balanceEth);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}
const emycBSCContract = "0xe3f53c0d48360de764dDc2a1A82c3e6DB5d4624d";
async function getAddressInfoBSC(address: string): Promise<number | undefined> {
  try {

    const contract = new web3BSC.eth.Contract(erc20AbiJson, emycBSCContract);
    const tokenBalance = await contract.methods.balanceOf(address).call().then(balance => {
      return web3BSC.utils.fromWei(balance, "ether");
    });
    return Number(tokenBalance);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}
const maxSupply = 400000000;
export const calcEMYCCS = async () => {
  const proms = emycContracts.map((address) => {
    if (address.chain === "EMYC") {
      return getAddressInfo(address.address);
    } else {
      return getAddressInfoBSC(address.address);
    }
  });

  const promRes = await Promise.all(proms);

  return promRes.reduce((a, b) => {
    if (a !== undefined) {
      return a - (b || 0);
    }
  }, maxSupply);
};
