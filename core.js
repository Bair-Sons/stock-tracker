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
  const apiKey = "-1EKJ7TPP7K9V0OP7";
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const price = data["Global Quote"]["05. price"];
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

  const gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";

  const symbolHeader = document.createElement("div");
  symbolHeader.className = "grid-header";
  symbolHeader.textContent = "Symbol";
  gridContainer.appendChild(symbolHeader);

  const priceHeader = document.createElement("div");
  priceHeader.className = "grid-header";
  priceHeader.textContent = "Price";
  gridContainer.appendChild(priceHeader);

  const blankPlaceholder = document.createElement("div");
  gridContainer.appendChild(blankPlaceholder);

  for (const [symbol, price] of Object.entries(savedPrices)) {
    const symbolCell = createGridItem(symbol);
    const priceCell = createGridItem(price);
    const editButton = createEditButton(symbol, symbolCell, priceCell);

    gridContainer.appendChild(symbolCell);
    gridContainer.appendChild(priceCell);
    gridContainer.appendChild(editButton);
  }

  savedPricesDiv.appendChild(gridContainer);
}

function createGridItem(textContent) {
  const item = document.createElement("div");
  item.className = "grid-item";
  item.textContent = textContent;
  return item;
}