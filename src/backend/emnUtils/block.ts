// Example: Fetch the latest block number
export const getLatestBlock = async (): Promise<bigint | undefined> => {
  try {
    const block = await web3.eth.getBlockNumber();
    console.log("Latest block on EMN:", block);
    return block;
  } catch (error) {
    console.error("Failed to connect to E Money Network:", error);
  }
};

