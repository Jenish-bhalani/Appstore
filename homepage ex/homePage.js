const barOptions = document.querySelector('.barOptions');
const bar = document.querySelector('#bar');
const xmark = document.querySelector('#xmark');
const appsDetailsContainer = document.querySelector('.appsDetailsContainer');

// Open sidebar
bar.addEventListener('click', () => {
  barOptions.classList.add('active');
});

// Close sidebar
xmark.addEventListener('click', () => {
  barOptions.classList.remove('active');
});

// Fetch items from database
const fetchApiURL = 'http://localhost:3000/api/getApps';

async function fetchItems() {
  const result = await fetch(fetchApiURL);
  const data = await result.json();

  const main = document.querySelector('main');
  data.forEach((item) => {
    main.innerHTML += `
      <div class="appsContainer">
        <div id="image">
          <img src="http://localhost:3000/upload/${item.appicon}" alt="">
        </div>
        <div id="appNames">
          <p id="free">free</p>
          <p>${item.appname}</p>
        </div>
        <div id="btns">
          <a href="#"><button id="downloadBtn" onclick='download(${item.id})'>download</button></a>
          <a href="#"><button id="knowMoreBtn" onclick='showDetails(${item.id})'>know more</button></a>
        </div>
      </div>`;
  });
}
fetchItems();

// Show details when clicking "Know More"
async function showDetails(id) {
  appsDetailsContainer.classList.add('active');
  const result = await fetch(`${fetchApiURL}?id=${id}`);
  const data = await result.json();

  appsDetailsContainer.innerHTML = `
    <div>
      <i class="fa-solid fa-xmark" onclick='closeDetailsBox()'></i>
    </div>
    <div class="detailsBox">
      <div id="deitailsIcon">
        <img src="http://localhost:3000/upload/${data[0].appicon}" alt="">
      </div>
      <div id="appInfo">
        <div>
          <p class="appInfoHeading">name</p>
          <p><span>${data[0].appname}</span></p>
        </div>
        <div>
          <p class="appInfoHeading">for</p>
          <p><span>${data[0].categories}</span></p>
        </div>
        <div>
          <p class="appInfoHeading">description</p>
          <p><span>${data[0].description}</span></p>
        </div>
        <div>
          <button onclick='download(${id})'>download</button>
        </div>
      </div>
    </div>`;
}

// Close details popup
function closeDetailsBox() {
  appsDetailsContainer.classList.remove('active');
}

// Handle download button
async function download(id) {
  window.location.href = `http://localhost:3000/api/download?id=${id}`;
}
