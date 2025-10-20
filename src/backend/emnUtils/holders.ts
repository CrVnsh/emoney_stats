import Web3 from "web3";
import { loadAppState, saveAppState } from "@/backend/utils/stateManager";
import { getLatestBlock } from "./block";

// E Money Network Mainnet RPC URL
const rpcUrl = "https://rpc-publicnode.emoney.io/";
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

const appState = loadAppState();
let startBlock = appState.start || 1;
const latestblock = await getLatestBlock();
const endBlock = latestblock !== undefined ? Number(latestblock) : 2347066; // or latest block
let pause = false;
const activeAddresses = new Set();
if (appState.addresses && appState.addresses.lenght !== 0) {
  appState.addresses.forEach((address: string) => {
    activeAddresses.add(address);
  });
}
async function getHoldersFromRange(start, end) {
  console.log("get all holders");

  const getBlockProms: Array<Promise<any>> = [];
  for (let i = start; i <= end; i++) {
    const block = web3.eth.getBlock(i, true);
    getBlockProms.push(block);
  }
  try {
    const getBlockRes = await Promise.all(getBlockProms);
    getBlockRes.forEach((block) => {
      if (block && block.transactions) {
        block.transactions.forEach((tx) => {
          if (tx.from) activeAddresses.add(tx.from.toLowerCase());
          if (tx.to) activeAddresses.add(tx.to.toLowerCase());
        });
      }
    });
    console.log(`startBlock: ${start} endBlock: ${end}`);
    //console.log([...activeAddresses]);
  } catch (error) {
    startBlock -= 300;
    pause = true;
    setTimeout(() => {
      pause = false;
    }, 60_000);
  }
}
function internalIntervalFunc(myInterval?: NodeJS.Timeout) {
  console.log(`startBlock: ${startBlock} endBlock: ${endBlock}`);
  if (startBlock + 300 <= endBlock) {
    getHoldersFromRange(startBlock, startBlock + 300);
    startBlock += 300;
  } else {
    getHoldersFromRange(startBlock, endBlock);
    clearInterval(myInterval);
  }
}
function getAllHolders() {
  internalIntervalFunc();
  const myInterval = setInterval(() => {
    if (!pause) internalIntervalFunc(myInterval);
  }, 3_000);
}
getAllHolders();

process.on("SIGINT", () => {
  console.log("\n🛑 Server is shutting down...");

  const dataToSave = {
    addresses: [...activeAddresses],
    start: startBlock - 300,
  };

  saveAppState(dataToSave);

  console.log("✅ File saved successfully.");

  process.exit(0);

});
