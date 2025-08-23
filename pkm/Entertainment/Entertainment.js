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

const appsData = [
  {
    image: '../homepage/fs14.jpg',
    name: 'FS14 - Tractor Simulator',
    isFree: true,
    downloadLink: '#',
    knowMoreLink: '../knowMore/knowMore.html'
  },
  {
    image: '../homepage/fs14.jpg',
    name: 'Cool Music Player',
    isFree: true,
    downloadLink: '#',
    knowMoreLink: '../knowMore/knowMore.html'
  },
  {
    image: '../homepage/fs14.jpg',
    name: 'Photo Editor Pro',
    isFree: true,
    downloadLink: '#',
    knowMoreLink: '../knowMore/knowMore.html'
  }
];

const appsSection = document.getElementById('appsSection');

appsData.forEach(app => {
  const card = document.createElement('div');
  card.className = 'appsContainer';
  card.innerHTML = `
    <div class="appImage">
      <img src="${app.image}" alt="${app.name}" />
    </div>
    <div class="appDetails">
      ${app.isFree ? '<p class="freeTag">FREE</p>' : ''}
      <p>${app.name}</p>
    </div>
    <div class="appButtons">
      <a href="${app.downloadLink}"><button class="downloadBtn">Download</button></a>
      <a href="${app.knowMoreLink}"><button class="knowMoreBtn">Know More</button></a>
    </div>
  `;
  appsSection.appendChild(card);
});
