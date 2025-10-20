let lastCheckedBlock:bigint = BigInt(2346236);

async function pollForNewBlocks() {
  try {
    const currentBlock = await web3.eth.getBlockNumber();

    if (currentBlock > lastCheckedBlock) {
      for (let i = Number(lastCheckedBlock) + 1; i <= currentBlock; i++) {
        console.log(`⛏️ New block detected: ${i}`);
        await getBlockTransactions(i);
      }
      lastCheckedBlock = currentBlock;
    }
  } catch (error) {
    console.error('❌ Error polling blocks:', error);
  }
}

async function getBlockTransactions(blockNumber: number) {
  const block = await web3.eth.getBlock(blockNumber, true); // Include transactions
  console.log(`📦 Block #${block.number} has ${block.transactions.length} txs`);

  block.transactions.forEach((tx, index) => {
    console.log(`🔹 TX #${index + 1}`);
    console.log(`  From: ${tx.from}`);
    console.log(`  To: ${tx.to}`);
    console.log(`  Value: ${web3.utils.fromWei(tx.value, 'ether')} EMYC`);
  });
}

// Start polling every 10 seconds
console.log("run interval")
setInterval(pollForNewBlocks, 10_000);
