// transition.js
document.addEventListener("DOMContentLoaded", () => {
  // Run fade-in when page loads
  document.body.style.opacity = "0";
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });

  // Add fade-out effect on navigation links
  document.querySelectorAll("a").forEach(link => {
    const url = link.getAttribute("href");
    if (url && !url.startsWith("#") && !url.startsWith("javascript")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = url;
        }, 400);
      });
    }
  });
});
