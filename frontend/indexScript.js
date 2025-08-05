const barOptions = document.querySelector('.barOptions');//bar options
const bar = document.querySelector('#bar');//bar sign
const xmark = document.querySelector('#xmark');//xmark of bar
const appsDetailsContainer = document.querySelector('.appsDetailsContainer');//detials box

//this event is used to display bar option
bar.addEventListener('click', (e) => {
    barOptions.style.display = 'flex'
});
//this event is used to hide bar option by xmark
xmark.addEventListener('click', (e) => {
    barOptions.style.display = 'none'
})



//fetchItems in the database
const fetchApiURL = 'http://localhost:3000/api/getApps';

//this function is used to get all items in the datase and display
async function fetchItems() {
    const result = await fetch(fetchApiURL);
    const data = await result.json();
    console.log('data is', data);
    const main = document.querySelector('main');
    // console.log('appsContainer is',appsContainer);
    // appsContainer.innerHTML = '';
    data.forEach((item) => {
        console.log('items', item);
        main.innerHTML += `  <div class="appsContainer">
            <div id="image">
                <img src='http://localhost:3000/upload/${item.appicon}' alt="">
            </div>
            <div id="appNames">
                <p id="free">free</p>
                <p>${item.appname}</p>
            </div>
            <div id="btns">
               <a href="#"><button id="downloadBtn" onclick='download(${item.id})'>download</button></a> 
               <a href="#"><button id="knowMoreBtn" onclick='showDetails(${item.id})'>know more</button></a> 
            </div>
        </div> `
    });
}
fetchItems();

//this function is used to display app details when click know more button
async function showDetails(id) {
    appsDetailsContainer.style.display = 'flex';
    const result = await fetch(`${fetchApiURL}?id=${id}`);
    const data = await result.json();
    console.log('data is', data[0].appicon);
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
                <button>download</button>
            </div>
        </div>
    </div> 
    `;
}

//this function is used to close details box by xmark using oclick event
function closeDetailsBox(){
    appsDetailsContainer.style.display = 'none';
}


//this function call when click download button in the app
async function download(id) {
   window.location.href = `http://localhost:3000/api/download?id=${id}`;
}