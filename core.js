document.addEventListener("DOMContentLoaded", onPageLoad);

function onPageLoad() {
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  const trackButton = document.getElementById("track-button");
  trackButton.addEventListener("click", handleTrackButtonClick);

  loadSavedPrices();
}

function handleTrackButtonClick() {
  const stockSymbol = document
    .getElementById("stock-symbol")
    .value.trim()
    .toUpperCase();
  if (isValidSymbol(stockSymbol)) {
    fetchStockPrice(stockSymbol);
  }
}

function isValidSymbol(symbol) {
  return /^[A-Z]{1,5}$/.test(symbol);
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
  const apiKey = process.env.API_KEY;
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
    displayStockPrice(symbol, null, "Error fetching stock price. Please try again later.");
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

  savedPricesDiv.innerHTML = "<h2>Saved Prices</h2>";

  const gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";

  const symbolHeader = createGridHeader("Symbol");
  const priceHeader = createGridHeader("Price");
  gridContainer.appendChild(symbolHeader);
  gridContainer.appendChild(priceHeader);
  gridContainer.appendChild(document.createElement("div"));

  const sortedEntries = Object.entries(savedPrices).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  sortedEntries.forEach(([symbol, price]) => {
    const symbolCell = createGridItem(symbol);
    const priceCell = createGridItem(price);
    const editButton = createEditButton(symbol, symbolCell, priceCell);

    gridContainer.appendChild(symbolCell);
    gridContainer.appendChild(priceCell);
    gridContainer.appendChild(editButton);
  });

  savedPricesDiv.appendChild(gridContainer);
}

function createGridHeader(textContent) {
  const header = document.createElement("div");
  header.className = "grid-header";
  header.textContent = textContent;
  return header;
}

function createGridItem(textContent) {
  const item = document.createElement("div");
  item.className = "grid-item";
  item.textContent = textContent;
  return item;
}

function removeStock(symbol, symbolCell, priceCell, editButton) {
  let savedPrices = JSON.parse(localStorage.getItem("savedPrices")) || {};
  delete savedPrices[symbol];
  localStorage.setItem("savedPrices", JSON.stringify(savedPrices));
  symbolCell.remove();
  priceCell.remove();
  editButton.remove();
}

function createEditButton(symbol, symbolCell, priceCell) {
  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.addEventListener("click", () =>
    removeStock(symbol, symbolCell, priceCell, editButton)
  );
  return editButton;
}
