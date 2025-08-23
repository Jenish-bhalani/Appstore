// Sidebar navigation (preserved behavior)
document.querySelectorAll(".sidebar ul li").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    document.querySelectorAll(".content-section").forEach(section => section.classList.remove("active"));
    document.getElementById(item.getAttribute("data-section")).classList.add("active");
  });
});

// Form open/close (now supports popup/modal behavior)
// openForm(id, editIndex) - if editIndex is provided, form will be used to edit that index
function openForm(id, editIndex = null) {
  const formContainer = document.getElementById(id);
  // set modal mode
  formContainer.classList.remove('hidden');
  formContainer.classList.add('modal-active');
  document.getElementById('modalBackdrop').classList.remove('hidden');
  formContainer.setAttribute('aria-hidden','false');

  // set dataset edit index
  formContainer.dataset.editIndex = editIndex !== null ? editIndex : '';

  // if app form, update title when editing
  if (id === 'appForm') {
    const title = document.getElementById('appFormTitle');
    title.textContent = (editIndex !== null) ? 'Edit App' : 'Add App';
  }
  if (id === 'gameForm') {
    const title = document.getElementById('gameFormTitle');
    title.textContent = (editIndex !== null) ? 'Edit Game' : 'Add Game';
  }
}

function closeForm(id) {
  const formContainer = document.getElementById(id);
  formContainer.classList.add('hidden');
  formContainer.classList.remove('modal-active');
  document.getElementById('modalBackdrop').classList.add('hidden');
  formContainer.setAttribute('aria-hidden','true');

  // clear dataset edit index
  formContainer.dataset.editIndex = '';
  // also reset the inner form
  const innerForm = formContainer.querySelector('form');
  if (innerForm) innerForm.reset();

  // clear current file name displays
  if (id === 'appForm') {
    document.getElementById('appCurrentLogo').textContent = '';
    document.getElementById('appCurrentZip').textContent = '';
  } else if (id === 'gameForm') {
    document.getElementById('gameCurrentLogo').textContent = '';
    document.getElementById('gameCurrentZip').textContent = '';
  }
}

// modal backdrop click closes any open form
document.getElementById('modalBackdrop').addEventListener('click', () => {
  // find any modal-active form and close it
  const modal = document.querySelector('.form-container.modal-active');
  if (modal) closeForm(modal.id);
});

// close buttons
document.getElementById('closeAppForm').addEventListener('click', () => closeForm('appForm'));
document.getElementById('closeGameForm').addEventListener('click', () => closeForm('gameForm'));

// Buttons that open forms
document.getElementById('openAddApp').addEventListener('click', () => openForm('appForm'));
document.getElementById('openAddGame').addEventListener('click', () => openForm('gameForm'));

// Placeholder data arrays (kept small as before)
let apps = [
  { name: "App One", category: "Education", description: "This is a sample app description.", logoData: "", logoName: "", zipName: "" }
];
let games = [
  { name: "Game One", category: "Action", description: "This is a sample game description.", logoData: "", logoName: "", zipName: "" }
];
let users = [
  { username: "Jenish", email: "jenish@example.com" },
  { username: "Vasu", email: "vasu@example.com" }
];
let messages = [
  { name: "Ankit", email: "ankit@mail.com", message: "Great site!" },
  { name: "Bhaumik", email: "bhaumik@mail.com", message: "Need help with login." }
];

document.addEventListener("DOMContentLoaded", () => {
  renderApps();
  renderGames();
  renderUsers();
  renderMessages();

  // App form submission (handles add & edit)
  document.getElementById("appFormElement").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.appName.value.trim();
    const category = form.category.value.trim();
    const description = form.description.value.trim();

    // get current edit index (if editing)
    const editIndexRaw = document.getElementById('appForm').dataset.editIndex;
    const editIndex = editIndexRaw ? parseInt(editIndexRaw, 10) : null;

    // handle files
    const logoFile = form.appLogo.files[0];
    const zipFile = form.appZip.files[0];

    // helper to get dataURL for image (logo) if provided
    const readLogoData = (file) => new Promise((resolve) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

    const logoData = await readLogoData(logoFile);

    if (editIndex !== null && !isNaN(editIndex)) {
      // update existing
      const existing = apps[editIndex];
      existing.name = name;
      existing.category = category;
      existing.description = description;
      if (logoFile) {
        existing.logoData = logoData || existing.logoData;
        existing.logoName = logoFile.name;
      }
      if (zipFile) existing.zipName = zipFile.name;
    } else {
      // add new
      apps.push({
        name,
        category,
        description,
        logoData: logoData || "",
        logoName: logoFile ? logoFile.name : "",
        zipName: zipFile ? zipFile.name : ""
      });
    }

    renderApps();
    closeForm('appForm');
  });

  // Game form submission
  document.getElementById("gameFormElement").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.gameName.value.trim();
    const category = form.category.value.trim();
    const description = form.description.value.trim();

    const editIndexRaw = document.getElementById('gameForm').dataset.editIndex;
    const editIndex = editIndexRaw ? parseInt(editIndexRaw, 10) : null;

    const logoFile = form.gameLogo.files[0];
    const zipFile = form.gameZip.files[0];

    const readLogoData = (file) => new Promise((resolve) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

    const logoData = await readLogoData(logoFile);

    if (editIndex !== null && !isNaN(editIndex)) {
      const existing = games[editIndex];
      existing.name = name;
      existing.category = category;
      existing.description = description;
      if (logoFile) {
        existing.logoData = logoData || existing.logoData;
        existing.logoName = logoFile.name;
      }
      if (zipFile) existing.zipName = zipFile.name;
    } else {
      games.push({
        name,
        category,
        description,
        logoData: logoData || "",
        logoName: logoFile ? logoFile.name : "",
        zipName: zipFile ? zipFile.name : ""
      });
    }

    renderGames();
    closeForm('gameForm');
  });
});

// Render apps
function renderApps() {
  const list = document.getElementById("appList");
  list.innerHTML = apps.map((app, idx) =>
    `<tr>
      <td style="width:80px">${app.logoData ? `<img src="${app.logoData}" alt="${escapeHtml(app.name)}" style="max-width:70px;max-height:50px;border-radius:6px;">` : (app.logoName ? `<div style="font-size:12px;color:#666">${escapeHtml(app.logoName)}</div>` : '')}</td>
      <td>${escapeHtml(app.name)}</td>
      <td>${escapeHtml(app.category)}</td>
      <td>${app.zipName ? `<span style="font-size:13px;color:#333">${escapeHtml(app.zipName)}</span>` : ''}</td>
      <td>
        <button class="btn" onclick="editApp(${idx})">Edit</button>
        <button class="btn cancel" onclick="deleteApp(${idx})">Delete</button>
      </td>
    </tr>`).join("");
  document.getElementById("totalApps").textContent = apps.length;
}

// Render games
function renderGames() {
  const list = document.getElementById("gameList");
  list.innerHTML = games.map((game, idx) =>
    `<tr>
      <td style="width:80px">${game.logoData ? `<img src="${game.logoData}" alt="${escapeHtml(game.name)}" style="max-width:70px;max-height:50px;border-radius:6px;">` : (game.logoName ? `<div style="font-size:12px;color:#666">${escapeHtml(game.logoName)}</div>` : '')}</td>
      <td>${escapeHtml(game.name)}</td>
      <td>${escapeHtml(game.category)}</td>
      <td>${game.zipName ? `<span style="font-size:13px;color:#333">${escapeHtml(game.zipName)}</span>` : ''}</td>
      <td>
        <button class="btn" onclick="editGame(${idx})">Edit</button>
        <button class="btn cancel" onclick="deleteGame(${idx})">Delete</button>
      </td>
    </tr>`).join("");
  document.getElementById("totalGames").textContent = games.length;
}

// Delete functions with confirmation (accept index)
function deleteApp(index) {
  if (confirm("Are you sure you want to delete this app?")) {
    apps.splice(index, 1);
    renderApps();
  }
}

function deleteGame(index) {
  if (confirm("Are you sure you want to delete this game?")) {
    games.splice(index, 1);
    renderGames();
  }
}

// Edit functions (open popup and prefill fields)
function editApp(index) {
  const app = apps[index];
  openForm('appForm', index);
  const form = document.getElementById('appFormElement');
  form.appName.value = app.name;
  form.category.value = app.category;
  form.description.value = app.description;
  document.getElementById('appCurrentLogo').textContent = app.logoName || '';
  document.getElementById('appCurrentZip').textContent = app.zipName || '';
  // clear file inputs (so they don't show previously selected files)
  form.appLogo.value = '';
  form.appZip.value = '';
}

function editGame(index) {
  const g = games[index];
  openForm('gameForm', index);
  const form = document.getElementById('gameFormElement');
  form.gameName.value = g.name;
  form.category.value = g.category;
  form.description.value = g.description;
  document.getElementById('gameCurrentLogo').textContent = g.logoName || '';
  document.getElementById('gameCurrentZip').textContent = g.zipName || '';
  form.gameLogo.value = '';
  form.gameZip.value = '';
}

// Users & Messages rendering and delete with confirmation
function renderUsers() {
  const list = document.getElementById("userList");
  list.innerHTML = users.map((u, idx) =>
    `<tr>
      <td>${escapeHtml(u.username)}</td>
      <td>${escapeHtml(u.email)}</td>
      <td><button class="btn cancel" onclick="deleteUser(${idx})">Delete</button></td>
    </tr>`).join("");
  document.getElementById("totalUsers").textContent = users.length;
}

function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    renderUsers();
  }
}

function renderMessages() {
  const list = document.getElementById("messageList");
  list.innerHTML = messages.map((m, idx) =>
    `<tr>
      <td>${escapeHtml(m.name)}</td>
      <td>${escapeHtml(m.email)}</td>
      <td>${escapeHtml(m.message)}</td>
      <td><button class="btn cancel" onclick="deleteMessage(${idx})">Delete</button></td>
    </tr>`).join("");
}

function deleteMessage(index) {
  if (confirm("Are you sure you want to delete this message?")) {
    messages.splice(index, 1);
    renderMessages();
  }
}

// initial render functions
function renderUsersAndMessages() {
  renderUsers();
  renderMessages();
}

// small helper to escape user-provided text for safe insertion
function escapeHtml(text) {
  if (!text && text !== 0) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// initial load render
document.addEventListener('DOMContentLoaded', () => {
  renderApps();
  renderGames();
  renderUsers();
  renderMessages();
});
