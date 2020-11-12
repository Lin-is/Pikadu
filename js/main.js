"use strict";

// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 



//----------------------------------------------------------------------------
//-----------GET ELEMENTS-----------------------------------------------------
//----------------------------------------------------------------------------
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

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

const listUsers = [
  {
    id: '01',
    email: 'maks@mail.com',
    password: '12345',
    displayName: 'MaksJS'
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '123456',
    displayName: 'KateKillMaks'
  },
  {
    id: '03',
    email: 'igor@mail.com',
    password: '123',
    displayName: 'IgorIgor'
  },
];


//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------


//user info and actions
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


//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------


const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что ротмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая ? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал ? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'мое','случайность'],
      author: 'maks@mail.com',
      date: '11.11.2020, 20:54:00',
      likes: 45,
      comments: 12,
    },
    {
      title: 'Новый пост',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, rem! Recusandae cum distinctio reprehenderit! Dolor quo veniam, hic esse, tempora sequi, laborum eveniet suscipit perspiciatis odio id. Voluptate quo obcaecati mollitia minus ex amet eligendi voluptas ipsa, inventore quis provident. Vero quae ex temporibus provident quo autem unde officia aliquam dolore eius quisquam, ad mollitia sapiente sequi assumenda atque tempora.',
      tags: ['свежее', 'новое', 'мое', 'случайность'],
      author: 'kate@mail.com',
      date: '10.11.2020, 16:04:35',
      likes: 113,
      comments: 54,
    }
  ]

};


//toggle authentification form/user profile on page
const toggleAuthDom = () => {  
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};


const showAllPosts = () => {
  let postsHTML = '';

  setPosts.allPosts.forEach(({ title, text, date, tags, author, likes, comments }) => {

    let displayName = setUsers.getUser(author).displayName;

    postsHTML += `
      <section class = "post" >
        <div class = "post-body">
        <h2 class = "post-title">${title}</h2>
          <p class = "post-text">${text}</p> 
          <div class = "tags">
            ${tags.map(item => `<a href = "#" class = "tag">#${item}</a>`).join('')}
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
              <a href = "#" class = "author-username">${displayName}</a> 
              <span class = "post-time">${date}</span> 
            </div> 
            <a href = "#" class = "author-link"> 
              <img src = "img/avatar.jpeg" alt = "avatar" class ="author-avatar"> 
            </a>
          </div>
        </div> 
      </section>
    `;
  });


  postsWrapper.innerHTML = postsHTML;
}




const init = () => {

  //----------------------------------------------------------------------------
  //----------LISTENERS---------------------------------------------------------
  //----------------------------------------------------------------------------
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

  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  });

  //------------------------------------------------------------------------------
  showAllPosts();
  toggleAuthDom();
}

document.addEventListener('DOMContentLoaded', init);
