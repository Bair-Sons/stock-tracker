document.addEventListener("DOMContentLoaded", onPageLoad);

function onPageLoad() {
  const trackButton = document.getElementById("track-button");
  trackButton.addEventListener("click", () => {
    const stockSymbol = document
      .getElementById("stock-symbol")
      .value.trim()
      .toUpperCase();
    if (isValidSymbol(stockSymbol)) {
      fetchStockPrice(stockSymbol);
    } else {
    }
  });
  loadSavedPrices();
}

function isValidSymbol(symbol) {
  return /^[A-Z]{0,5}$/.test(symbol);
}

function displayStockPrice(symbol, price, errorMsg = null) {
  const stockPriceDiv = document.getElementById("stock-price");
  if (errorMsg) {
    stockPriceDiv.textContent = errorMsg;
  } else if (price) {
    stockPriceDiv.textContent = `The current price of ${symbol} is $${price}`;
  } else {
    stockPriceDiv.textContent = `Could not fetch price for ${symbol}. Please check the symbol and try again.`;
  }
}

async function fetchStockPrice(symbol) {
  const apiKey = "-1EKJ7TPP7K9V0OP7"; // Replace with your Alpha Vantage API key
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const price = data["Global Quote"]["04. price"];
    if (price) {
      displayStockPrice(symbol, price);
      saveStockPrice(symbol, price);
    } else {
      displayStockPrice(symbol, null);
    }
  } catch (error) {
    displayStockPrice(
      symbol,
      null,
      "Error fetching stock price. Please try again later."
    );
  }
}

function saveStockPrice(symbol, price) {
  let savedPrices = JSON.parse(localStorage.getItem("savedPrices")) || {};
  savedPrices[symbol] = price;
  localStorage.setItem("savedPrices", JSON.stringify(savedPrices));
  loadSavedPrices();
}

function loadSavedPrices() {
  const savedPricesDiv = document.getElementById("saved-prices");
  let savedPrices = JSON.parse(localStorage.getItem("savedPrices")) || {};

  savedPricesDiv.innerHTML = "<h1>Saved Prices:</h1>";

  // Create a container for the grid
  const gridContainer = document.createElement("div");
  gridContainer.className = "grid-container"; // Ensure CSS class is applied for grid layout

  // Create headers for the grid
  const symbolHeader = document.createElement("div");
  symbolHeader.className = "grid-header";
  symbolHeader.textContent = "Symbol";
  gridContainer.appendChild(symbolHeader);

  const priceHeader = document.createElement("div");
  priceHeader.className = "grid-header";
  priceHeader.textContent = "Price";
  gridContainer.appendChild(priceHeader);

  // Create a grid item for each saved stock price
  for (const [symbol, price] of Object.entries(savedPrices)) {
    const symbolCell = document.createElement("div");
    symbolCell.className = "grid-item";
    symbolCell.textContent = symbol;

    const priceCell = document.createElement("div");
    priceCell.className = "grid-item";
    priceCell.textContent = `$${price}`;

    gridContainer.appendChild(symbolCell);
    gridContainer.appendChild(priceCell);
  }
  savedPricesDiv.appendChild(gridContainer);
}
