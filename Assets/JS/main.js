const bookTitle = document.querySelector("#bookTitle");
const bookDesc = document.querySelector("#bookDesc");
const bookUrl = document.querySelector("#bookUrl");
const bookAuthor = document.querySelector("#bookAuthor");
const bookCrtBtn = document.querySelector("#bookCrtBtn")
const booksSection = document.querySelector("#booksSection");








// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getDatabase,
  ref,
  push,
  set,
  get,
  update,
  remove,
  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyDNCRK-QWxKVCb1jo5z5efvOaS2rfSrLpI",
  authDomain: "e-library-5ba21.firebaseapp.com",
  projectId: "e-library-5ba21",
  storageBucket: "e-library-5ba21.appspot.com",
  messagingSenderId: "700586556913",
  appId: "1:700586556913:web:4e85490cf008362826d850",
  measurementId: "G-0RQWK4TGP5"
};

// Initialize Firebase
 const firebaseApp = initializeApp(firebaseConfig); 
 const database = getDatabase(firebaseApp)

// Create
 const createData = (path, data) => {
    const newRef = push(ref(database, path), data);
    //   set(newRef, data);x/
    return newRef.key;
  };
  
  function convertData(d) {
    const newData = Object.entries(d);
  
    const myNewData = newData.map((kicikArr) => {
      const newObj = {
        id: kicikArr[0],
        ...kicikArr[1],
      };
  
      return newObj;
    });
  
    return myNewData;
  }
  
  // Read
  const readData = (path) => {
   
  
    const dataRef = ref(database, path);
    return get(dataRef).then((snapshot) => snapshot.val());
  };
  
  // Update
  const updateData = (path, data) => {
    return update(ref(database, path), data);
  };
  
  // Delete
  const deleteData = (path) => {
    return remove(ref(database, path));
  };
  const isHomePage = window.location.pathname.includes("index.html");
  if (isHomePage) {
    readData("/books")
      .then((data) => {
        const books = convertData(data);
        renderBooks(books);
      })
      .catch((error) => console.error("Error reading data:", error));
  }


  bookCrtBtn?.addEventListener("click" ,function(e){
    e.preventDefault();
    const title = bookTitle.value;
    const description = bookDesc.value;
    const image_url = bookUrl.value;
    const author = bookAuthor.value;

    const form = {
        title,
        description,
        image_url,
        author,
    };

    createData("books", form);
    alert("Added Book");
    console.log(form);
});
function renderBooks(list){
    booksSection.innerHTML = list.map(item =>
        `<div class="card position-relative" style="width: 18rem">
        <img
          src="${item.image_url}"
          class="card-img-top object-fit-cover"
          height="300"
          alt="${item.title}"
        />
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${item.author}</h6>
          <p class="card-text">
          ${item.description.slice(0,30)}...
          </p>
       
        </div>

        <div class="text-danger h2 position-absolute top-0 end-0">
        
        </div>
      </div>`
    ).join("")
    
}


