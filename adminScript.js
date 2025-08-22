// Sidebar navigation
document.querySelectorAll(".sidebar ul li").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    document.querySelectorAll(".content-section").forEach(section => section.classList.remove("active"));
    document.getElementById(item.getAttribute("data-section")).classList.add("active");
  });
});

// Form open/close
function openForm(id) {
  document.getElementById(id).classList.remove("hidden");
}
function closeForm(id) {
  document.getElementById(id).classList.add("hidden");
}

// Placeholder data loaders (you’ll replace with backend)
document.addEventListener("DOMContentLoaded", () => {
  loadApps();
  loadGames();
  loadCategories();
  loadUsers();
  loadMessages();
});

function loadApps() {
  const apps = [
    { name: "App One", category: "Education", type: "Free" },
    { name: "App Two", category: "Business", type: "Paid" }
  ];
  const list = document.getElementById("appList");
  list.innerHTML = apps.map(app =>
    `<tr>
      <td>${app.name}</td>
      <td>${app.category}</td>
      <td>${app.type}</td>
      <td>
        <button class="btn">Edit</button>
        <button class="btn cancel">Delete</button>
      </td>
    </tr>`).join("");
}

function loadGames() {
  const games = [
    { name: "Game One", category: "Action", type: "Free" }
  ];
  const list = document.getElementById("gameList");
  list.innerHTML = games.map(game =>
    `<tr>
      <td>${game.name}</td>
      <td>${game.category}</td>
      <td>${game.type}</td>
      <td>
        <button class="btn">Edit</button>
        <button class="btn cancel">Delete</button>
      </td>
    </tr>`).join("");
}

function loadCategories() {
  const categories = ["Education", "Business", "Entertainment"];
  const list = document.getElementById("categoryList");
  list.innerHTML = categories.map(cat =>
    `<li>${cat} <button class="btn cancel">Delete</button></li>`
  ).join("");
}

function loadUsers() {
  const users = [
    { username: "Jenish", email: "jenish@example.com" },
    { username: "Vasu", email: "vasu@example.com" }
  ];
  const list = document.getElementById("userList");
  list.innerHTML = users.map(user =>
    `<tr>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>
        <button class="btn cancel">Delete</button>
      </td>
    </tr>`).join("");
}

function loadMessages() {
  const messages = [
    { name: "Ankit", email: "ankit@mail.com", message: "Great site!" },
    { name: "Bhaumik", email: "bhaumik@mail.com", message: "Need help with login." }
  ];
  const list = document.getElementById("messageList");
  list.innerHTML = messages.map(msg =>
    `<tr>
      <td>${msg.name}</td>
      <td>${msg.email}</td>
      <td>${msg.message}</td>
      <td>
        <button class="btn cancel">Delete</button>
      </td>
    </tr>`).join("");
}
