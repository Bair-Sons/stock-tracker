
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("track-button").addEventListener("click", () => {
      const stockSymbol = document
        .getElementById("stock-symbol")
        .value.toUpperCase();
      if (stockSymbol) {
        fetchStockPrice(stockSymbol);
      } else {
        alert("Please enter a stock symbol.");
      }
    });
  });

  async function fetchStockPrice(symbol) {
    const apiKey = "YOUR_API_KEY"; // Replace with your Alpha Vantage API key
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const price = data["Global Quote"]["05. price"];
      displayStockPrice(symbol, price);
    } catch (error) {
      console.error("Error fetching stock price:", error);
      alert("Error fetching stock price. Please try again later.");
    }
  }

  function displayStockPrice(symbol, price) {
    const stockPriceDiv = document.getElementById("stock-price");
    if (price) {
      stockPriceDiv.innerHTML = `The current price of ${symbol} is $${price}`;
    } else {
      stockPriceDiv.innerHTML = `Could not fetch price for ${symbol}. Please check the symbol and try again.`;
    }
  }
}
