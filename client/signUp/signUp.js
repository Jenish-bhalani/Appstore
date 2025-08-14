document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const fname = document.getElementById("firstName").value.trim();
  const lname = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value;
  const cpass = document.getElementById("confirmPassword").value;

  let hasError = false;
  const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");

  if (fname === "") {
    document.getElementById("firstNameError").style.display = "block";
    hasError = true;
  }

  if (lname === "") {
    document.getElementById("lastNameError").style.display = "block";
    hasError = true;
  }

  if (email === "" || !emailRegex.test(email)) {
    document.getElementById("emailError").style.display = "block";
    hasError = true;
  }

  if (pass.length < 8) {
    document.getElementById("passwordError").style.display = "block";
    hasError = true;
  }

  if (pass.includes(" ")) {
    alert("Password must not contain spaces.");
    hasError = true;
  }

  if (pass !== cpass) {
    document.getElementById("confirmPasswordError").style.display = "block";
    hasError = true;
  }

  if (!hasError) {
    alert("Registration successful!");
    document.getElementById("registrationForm").reset();
  }
});
