document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');

  usernameError.style.display = 'none';
  passwordError.style.display = 'none';

  let isValid = true;

  const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  if (username === "") {
    usernameError.textContent = "Email is required";
    usernameError.style.display = "block";
    isValid = false;
  } else if (!emailPattern.test(username)) {
    usernameError.textContent = "Enter a valid email address";
    usernameError.style.display = "block";
    isValid = false;
  }

  if (password === "") {
    passwordError.textContent = "Password is required";
    passwordError.style.display = "block";
    isValid = false;
  } else if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
    passwordError.style.display = "block";
    isValid = false;
  }

  if (isValid) {
    alert("Login successful!");
  }
});
