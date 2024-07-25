document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  chrome.storage.sync.get(["darkMode"], (result) => {
    darkModeToggle.checked = result.darkMode || false;
  });

  darkModeToggle.addEventListener("change", () => {
    const darkMode = darkModeToggle.checked;
    chrome.storage.sync.set({ darkMode });
  });
});