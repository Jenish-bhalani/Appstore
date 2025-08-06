document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const responseMsg = document.getElementById("responseMsg");

  if (name && email && message) {
    responseMsg.textContent = "Thanks for reaching out! We'll get back to you soon.";
    responseMsg.style.color = "#00ffcc";
    this.reset();
  } else {
    responseMsg.textContent = "Please fill out all fields.";
    responseMsg.style.color = "#ff6666";
  }
});
