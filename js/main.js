"use strict";

// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
});


//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');


const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');


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
    const user = this.getUser(email);

    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },

  //out of profile
  logOut() {   
    console.log("Выход");
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

//toggle authentification form/user profile on page
const toggleAuthDom = () => {  
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;

  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

//----------------------------------------------------------------------------
//----------LISTENERS---------------------------------------------------------
//----------------------------------------------------------------------------


loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
});

loginSignup.addEventListener('click', event => {
  event.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.signUp(emailValue, passwordValue, toggleAuthDom);

});


//------------------------------------------------------------------------------

toggleAuthDom();