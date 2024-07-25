document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  if (!themeToggle) {
    return;
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  themeToggle.checked = savedTheme === "dark";

  themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "dark" : "light";
    applyTheme(theme);
  });
});

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  }
}
