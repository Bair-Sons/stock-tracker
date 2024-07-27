document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  const applyDarkMode = (enabled) => {
    document.body.classList.toggle("dark-mode", enabled);
  };

  const updateDarkModeSetting = (enabled) => {
    localStorage.setItem("dark-mode", enabled ? "enabled" : "disabled");
  };

  if (localStorage.getItem("dark-mode") === "enabled") {
    applyDarkMode(true);
    darkModeToggle.checked = true;
  }

  darkModeToggle.addEventListener("change", () => {
    const isEnabled = darkModeToggle.checked;
    applyDarkMode(isEnabled);
    updateDarkModeSetting(isEnabled);
  });
});
