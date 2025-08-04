const uploadItemsContainer = document.querySelector('.uploadItemsContainer');//target the upload feature
const uploadItemsForm = document.querySelector('#uploadItemsForm');//target upload form
const uploadErrorSummery = document.querySelector('.uploadErrorSummery');//target uplod error summery
const dashboardDetails = document.querySelector('#dashboardDetails');//target dashborad
const deleteItemContainer = document.querySelector('#deleteItemContainer');//target delete features
const updateItemContainer = document.querySelector('#updateItemContainer');//target update features
const updateItemFormContainer = document.querySelector('#updateItemFormContainer')//target update item form
const updateItemForm = document.querySelector('#updateItemsForm');
const count_api_url = 'http://localhost:3000/api/counter';
async function countTotalApps(){
    const result = await fetch(count_api_url);
    const data = await result.json();
   availabelItems.innerText = data[0].count;
}
async function countGames(){
    const result = await fetch(`${count_api_url}?types=games`);
    const data = await result.json();
   availabelGames.innerText = data[0].count;
}
async function countApps(){
    const result = await fetch(`${count_api_url}?types=apps`);
    const data = await result.json();
   availabelApps.innerText = data[0].count;
}
countTotalApps();
countGames();
countApps();

function showUploadForm(){//this function call when admin click upload button
    uploadItemsContainer.style.display = "flex";
    dashboardDetails.style.display = 'none';
    deleteItemContainer.style.display = 'none';
    updateItemContainer.style.display = 'none';
}

function closeErrorSummeryByXmark(){//this method call when admin click cross sign in error summer conainer
    uploadErrorSummery.style.display = 'none';
}

function showDashboard(){//this method call when admin click dashborad button
   dashboardDetails.style.display = 'inline';
   uploadItemsContainer.style.display = 'none';
   deleteItemContainer.style.display = 'none';
   updateItemContainer.style.display = 'none';

}

const fetchApiURL = 'http://localhost:3000/api/getApps';
async function showDeleteItems(){//this method call when user click delete App  button
   deleteItemContainer.style.display = 'flex';
   uploadItemsContainer.style.display = 'none';
    dashboardDetails.style.display = 'none';
    updateItemContainer.style.display = 'none';
    deleteItemContainer.innerHTML = '';
    const result = await fetch(fetchApiURL);
    const items = await result.json();
    
    items.forEach((item) => {
        deleteItemContainer.innerHTML += `
           <div class="updateAndDeleteInfo">
                <div class="updateAndDeleteFrontIcon">
                    <img src="http://localhost:3000/upload/${item.appicon}" alt="vasu">
                </div>
                <p>${item.appname}</p>
                <button type="submit" onclick="deleteItem(${item.id})">delete</button>
          </div>     
        `;
    });
}

async function deleteItem(id) {
    if(confirm('are you sure to delete?')){
        const result = await fetch(`http://localhost:3000/api/itemdelete?id=${id}`,{
        method: 'DELETE',
        });
    }
        window.location.reload();
}

async function showUpdateItem() {
    dashboardDetails.style.display = 'none';
    uploadItemsContainer.style.display = 'none';
    deleteItemContainer.style.display = 'none';
    updateItemContainer.style.display = 'flex';

    const result = await fetch(fetchApiURL);
    const items = await result.json();
    updateItemContainer.innerHTML  = "";
    items.forEach((item) => {
        updateItemContainer.innerHTML += `
         <div class="updateAndDeleteInfo">
                <div class="updateAndDeleteFrontIcon">
                    <img src="http://localhost:3000/upload/${item.appicon}">
                </div>
                <p>${item.appname}</p>
                <button type="submit" onclick="updateItem(${item.id})">update</button>
            </div>     
        `;
    })
}

async function updateItem(id){
    updateItemFormContainer.style.display = 'flex';
    const result = await fetch(`http://localhost:3000/api/readitem?id=${id}`);
    const item = await result.json();
    updateItemForm.innerHTML = "";
    updateItemForm.innerHTML = `
       <div>
            <input type='hidden' name='id' value='${item[0].id}'>
                 <label for="appName">app name</label>
                        <input type="text" id="appName" name="appName" placeholder="Enter App Name" value="${item[0].appname}">
                    </div>
                    <div>
                        <fieldset>
                            <legend>change app Icon</legend>
                            <input type="file" name="appIcon" class="common" accept=".jpg,.jpeg,.png,.webp">
                        </fieldset>
                    </div>
                    <div>
                        <label for="">select type</label>
                            <span id="radioContainer">
                                <span>
                                    <label for="apps">apps</label>
                                    <input type="radio" id="apps" name="appType" value="apps" ${item[0].apptype == 'apps' ? 'checked' : ''}>
                                </span>
                                <span>
                                    <label for="games">games</label>
                                    <input type="radio" id="games" name="appType" value="games" ${item[0].apptype == 'games' ? 'checked' : ''}>
                                </span>
                            </span>

                    </div>
                    <div>
                        <label for="categories">select categories</label>
                        <select id="categories" name="categories">
                            <option value="educational" ${item[0].categories == 'educational'?'selected':''}>educational</option>
                            <option value="shopping" ${item[0].categories == 'shopping'?'selected':''}>shopping</option>
                            <option value="newsAndMagazines" ${item[0].categories == 'newsAndMagazines'?'selected':''}>news &amp; magazines</option>
                            <option value="business" ${item[0].categories == 'business'?'selected':''}>business</option>
                        </select>
                    </div>
                    <div>
                        <label for="description">description</label>
                        <textarea name="description" id="description" placeholder="Write description here">${item[0].description}</textarea>
                    </div>
                    <button type="submit" id="upDateBtn">update</button> 
    `;
}

updateItemForm.addEventListener('submit',async(e) => {
    e.preventDefault();
    // console.log('form submit',e.get(appIcon));
     const formData = new FormData(e.target);
    //  console.log('form data',formData.get('appName'),formData.get('categories'));
    const result = await fetch('http://localhost:3000/api/update',{
        method:'PUT',
        body:formData,
    });
    const data = await result.json();
    if(data.length > 0){
     const ul = document.querySelector('.uploadErrorSummery ul');
        ul.innerHTML = '';
        data.forEach((errorMsg) => {
            let li = document.createElement('li');
            li.innerText = errorMsg.msg;
            ul.append(li);
        });
        uploadErrorSummery.style.display = 'flex';
    }else{
        window.location.reload();
    }
})







const uploadURL = "http://localhost:3000/api/upload";
uploadItemsForm.addEventListener('submit',async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);//get form data
    const result = await fetch(uploadURL,{//send request in upload api
        method:'POST',
        body:formData,
    });
    const response = await result.json();
  if(response.message == 'success'){//admin successully upload apps
        uploadItemsContainer.style.display = "none";
        uploadItemsForm.reset();
        window.location.reload();
  }else{//admin cannnot fill required field
        const ul = document.querySelector('.uploadErrorSummery ul');
        ul.innerHTML = '';
        response.forEach((errorMsg) => {
            let li = document.createElement('li');
            li.innerText = errorMsg.msg;
            ul.append(li);
        });
        uploadErrorSummery.style.display = 'flex';
  }
});


function closeUpdateItemFomrByXmark(){
    updateItemFormContainer.style.display = 'none';
}


