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

document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  // Reset all error messages
  firstNameError.style.display = "none";
  lastNameError.style.display = "none";
  emailError.style.display = "none";
  passwordError.style.display = "none";
  confirmPasswordError.style.display = "none";

  let isValid = true;
  const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  // First Name validation
  if (firstName === "") {
    firstNameError.textContent = "Please enter your first name.";
    firstNameError.style.display = "block";
    isValid = false;
  }

  // Last Name validation
  if (lastName === "") {
    lastNameError.textContent = "Please enter your last name.";
    lastNameError.style.display = "block";
    isValid = false;
  }

  // Email validation
  if (email === "") {
    emailError.textContent = "Email is required.";
    emailError.style.display = "block";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.style.display = "block";
    isValid = false;
  }

  // Password validation
  if (password === "") {
    passwordError.textContent = "Password is required.";
    passwordError.style.display = "block";
    isValid = false;
  } else if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
    passwordError.style.display = "block";
    isValid = false;
  }

  // Confirm Password validation
  if (confirmPassword === "") {
    confirmPasswordError.textContent = "Please confirm your password.";
    confirmPasswordError.style.display = "block";
    isValid = false;
  } else if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match.";
    confirmPasswordError.style.display = "block";
    isValid = false;
  }

  // If all validations pass
  if (isValid) {
    alert("Registration successful!");
    // You can redirect to a new page or show a success message here
    // window.location.href = "/success.html";
  }
});