

async function fetchTxSearch(height, pageNumber, pageSize) {
  const url = "https://public-node1-rpc.emoney.network";

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    "Content-Type": "application/json"
  };

  const body = JSON.stringify({
    jsonrpc: "2.0",
    method: "tx_search",
    params: {
      query: `tx.height>${height}`,
      page: `${pageNumber}`,
      per_page: `${pageSize}`
    },
    id: 1
  });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.text();
  return result;
}

// Example usage:
fetchTxSearch(1, 1, 30)
  .then(console.log)
  .catch(console.error);
