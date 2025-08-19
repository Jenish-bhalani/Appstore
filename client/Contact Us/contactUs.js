  const barOptions = document.querySelector('#barOptions'); 
  const bar = document.querySelector('#bar'); 
  const logoutBtn = document.querySelector('#logoutBtn'); 

// Toggle sidebar (hamburger)
bar.addEventListener('click', () => {
  barOptions.classList.toggle('active');
});

// Handle logout button
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert("You have been logged out."); 
    // 👉 Replace alert with real logout logic when backend is ready
    // Example: window.location.href = "/login.html";
  });
}
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fname = document.getElementById("firstName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  if (!fname || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Invalid email. Use only lowercase letters and digits.");
    return;
  }

  alert("Thank you for contacting us, " + fname + "!");
  this.reset();
});
