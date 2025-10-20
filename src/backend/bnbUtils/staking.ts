import { getWeb3Provider } from "./web3Provider";
import erc20AbiJson from "../emnUtils/emycbsc_contractabi.json";

const web3 = getWeb3Provider();
const emycBSCContract = "0xe3f53c0d48360de764dDc2a1A82c3e6DB5d4624d";
const emycBSCStakingContract = "0xB6A00f8518Df27bA4e8C59D913fFB0c2c36F0B40";
export const getTotalStaked = async () => {
  try {
    const contract = new web3.eth.Contract(erc20AbiJson, emycBSCContract);
    const tokenBalance = await contract.methods
      .balanceOf(emycBSCStakingContract)
      .call()
      .then((balance) => {
        return web3.utils.fromWei(balance, "ether");
      });
    return Number(tokenBalance);
  } catch (err) {
    console.error("❌ Error:", err);
  }
};
