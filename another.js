document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var firstName = document.getElementById("firstName").value.trim();
  var lastName = document.getElementById("lastName").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  var errors = false;

  document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");

  if (firstName === "") {
    document.getElementById("firstNameError").style.display = "block";
    errors = true;
  }

  if (lastName === "") {
    document.getElementById("lastNameError").style.display = "block";
    errors = true;
  }

  if (email === "" || !email.includes("@")) {
    document.getElementById("emailError").style.display = "block";
    errors = true;
  }

  if (password.length < 8) {
    document.getElementById("passwordError").style.display = "block";
    errors = true;
  }

  if (password.includes(" ")) {
    alert("Password must not contain spaces.");
    errors = true;
  }

  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").style.display = "block";
    errors = true;
  }

  if (!errors) {
    alert("Registration successful!");
    document.getElementById("registrationForm").reset();
  }
});
