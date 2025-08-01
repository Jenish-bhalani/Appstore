document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  let isValid = true;

  document.getElementById('usernameError').style.display = 'none';
  document.getElementById('passwordError').style.display = 'none';

  if (!username) {
    document.getElementById('usernameError').style.display = 'block';
    isValid = false;
  }

  if (!password) {
    document.getElementById('passwordError').style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    alert('Login successful!');
    // You could redirect or call a backend API here
  }
});
