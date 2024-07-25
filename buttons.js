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