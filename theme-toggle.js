document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const elements = [
    "h1",
    "input",
    "button",
    "#stock-price",
    ".grid-container",
    ".grid-header",
    ".grid-item",
  ];

  const savedTheme = localStorage.getItem("theme") || "light-mode";
  body.classList.add(savedTheme);
  elements.forEach((selector) => {
    document
      .querySelectorAll(selector)
      .forEach((el) => el.classList.add(savedTheme));
  });

  themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "dark-mode" : "light-mode";
    body.classList.toggle("dark-mode", theme === "dark-mode");
    body.classList.toggle("light-mode", theme === "light-mode");
    elements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.toggle("dark-mode", theme === "dark-mode");
        el.classList.toggle("light-mode", theme === "light-mode");
      });
    });
    localStorage.setItem("theme", theme);
  });
});
