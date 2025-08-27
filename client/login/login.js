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
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError'); 

  emailError.style.display = 'none';
  passwordError.style.display = 'none';

  let isValid = true;

  const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  if (email === "") {
    emailError.textContent = "Email is required";
    emailError.style.display = "block";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Enter a valid email address";
    emailError.style.display = "block";
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
