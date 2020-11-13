"use strict";



//--------------------------------------------------------------------------
//------ADD FIREBASE--------------------------------------------------------
//--------------------------------------------------------------------------


const firebaseConfig = {
  apiKey: "AIzaSyCJuB73MeqUoTGHggxIUTuhe3R9xpoDO-w",
  authDomain: "pikadu-workshop.firebaseapp.com",
  databaseURL: "https://pikadu-workshop.firebaseio.com",
  projectId: "pikadu-workshop",
  storageBucket: "pikadu-workshop.appspot.com",
  messagingSenderId: "368262139746",
  appId: "1:368262139746:web:d2f85d7c633c9f5c42a63b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);


//--------------------------------------------------------------------------
//------GET ELEMENTS--------------------------------------------------------
//--------------------------------------------------------------------------

let menuToggle = document.querySelector('#menu-toggle'); // Создаем переменную, в которую положим кнопку меню
let menu = document.querySelector('.sidebar'); // Создаем переменную, в которую положим меню

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');

const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');

const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');

//--------------------------------------------------------------------------
//------USERS DATA----------------------------------------------------------
//--------------------------------------------------------------------------

const listUsers = [
  {
    id: '01',
    email: 'maks@mail.com',
    password: '12345',
    displayName: 'MaksJS',
    photo: 'https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg'
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '123456',
    displayName: 'KateKillMaks',
    photo: 'https://archilab.online/images/1/123.jpg'
  },
  {
    id: '03',
    email: 'igor@mail.com',
    password: '123',
    displayName: 'IgorIgor'
  },
];

//--------------------------------------------------------------------------
//------WORK WITH USER------------------------------------------------------
//--------------------------------------------------------------------------

const setUsers = {  

  user: null,

  //registration
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert('email не валиден');
      return;
    }

    if (!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }

    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.slice(0, email.indexOf('@'))};
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрирован');
    }
  },
  //authorization
  logIn(email, password, handler) { 
    if (!regExpValidEmail.test(email)) {
      alert('email не валиден');
      return;
    }

    const user = this.getUser(email);

    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  //edit user profile info
  editUser(username, userPhoto, handler) {
    if (username) {
      this.user.displayName = username;
    }

    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    handler();
  },
  //out of profile
  logOut(handler) {    
    this.user = null;
    handler();  
  },
  //get user from common user list
  getUser(email) {  
    return listUsers.find(item => item.email === email);
  },
  //set info about authorized user into this
  authorizedUser(user) {  
    this.user = user;
  } 
};

//--------------------------------------------------------------------------
//------WORK WITH CONTENT---------------------------------------------------
//--------------------------------------------------------------------------

const setPosts = {

  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что ротмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая ? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал ? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'мое','случайность'],
      author: {
        displayName: 'maks',
        photo: 'https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg'
      },
      date: '11.11.2020, 20:54:00',
      likes: 45,
      comments: 12,
    },
    {
      title: 'Новый пост',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, rem! Recusandae cum distinctio reprehenderit! Dolor quo veniam, hic esse, tempora sequi, laborum eveniet suscipit perspiciatis odio id. Voluptate quo obcaecati mollitia minus ex amet eligendi voluptas ipsa, inventore quis provident. Vero quae ex temporibus provident quo autem unde officia aliquam dolore eius quisquam, ad mollitia sapiente sequi assumenda atque tempora.',
      tags: ['свежее', 'новое', 'мое', 'случайность'],
      author: {
        displayName: 'Kate',
        photo: 'https://archilab.online/images/1/123.jpg'
      },
      date: '10.11.2020, 16:04:35',
      likes: 113,
      comments: 54,
    }
  ],

  addPost(title, text, tags, handler) {
    this.allPosts.unshift({title, text, tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      likes: 0,
      comments: 0,
    });

    if (handler) {
      handler();
    }
  }
};

const showAllPosts = () => {
  let postsHTML = '';

  setPosts.allPosts.forEach(({title, text, date, tags, likes, comments, author}) => {
    postsHTML += `
      <section class = "post" >
        <div class = "post-body">
          <h2 class = "post-title">${title}</h2>
          <p class = "post-text">${text}</p> 
          <div class = "tags">
            ${tags.map(tag => `<a href = "#${tag}" class = "tag">#${tag}</a>`).join('')}
          </div> 
        </div>
        <div class = "post-footer">
          <div class = "post-buttons">
            <button class = "post-button likes">
              <svg width = "19" height = "20" class = "icon icon-like">
              <use xlink: href = "img/icons.svg#like"> </use> </svg> 
              <span class = "likes-counter">${likes}</span>
            </button> 
            <button class = "post-button comments">
              <svg width = "21" height = "21" class = "icon icon-comment">
              <use xlink: href = "img/icons.svg#comment"></use></svg> 
              <span class = "comments-counter">${comments}</span> 
            </button> 
            <button class = "post-button save">
              <svg width = "19" height = "19" class = "icon icon-save">
              <use xlink: href = "img/icons.svg#save"></use></svg> 
            </button>
            <button class = "post-button share">
              <svg width = "17" height = "19" class = "icon icon-share">
              <use xlink: href = "img/icons.svg#share"></use></svg> 
             </button> 
          </div>
          <div class = "post-author">
            <div class = "author-about">
            <a href = "#" class = "author-username">${author.displayName}</a> 
            <span class = "post-time">${date}</span> 
          </div> 
          <a href = "#" class = "author-link"> 
            <img src = ${author.photo || "img/avatar.jpeg"} alt = "avatar" class ="author-avatar"> 
          </a>
        </div>
      </section>
    `;
  });

  postsWrapper.innerHTML = postsHTML;
  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};

//toggle authentication form/user profile on page
const toggleAuthDom = () => {  
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

//hide old posts, show form for adding new post
const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
};

//-------------------------------------------------------------------------
//-------LISTENERS---------------------------------------------------------
//-------------------------------------------------------------------------

const init = () => {

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  loginSignup.addEventListener('click', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });

  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.reset();
    editContainer.classList.remove('visible');
  });
   
  menuToggle.addEventListener('click', function (event) { // отслеживаем клик по кнопке меню и запускаем функцию
    event.preventDefault(); // отменяем стандартное поведение ссылки
    menu.classList.toggle('visible'); // вешаем класс на меню, когда кликнули по кнопке меню 
  });

  buttonNewPost.addEventListener('click', event => {
    event.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit', event => {
    event.preventDefault();
    const { title, text, tags } = addPostElem.elements;

    if (title.value.length < 4) {
      alert('Слишком короткий заголовок');
      return;
    }
    if (text.value.length < 50) {
      alert('Слишком короткий пост');
      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  showAllPosts();
  toggleAuthDom();
}

//run js after loading DOM
document.addEventListener('DOMContentLoaded', init); 



