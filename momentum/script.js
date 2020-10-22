'use strict'
const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let time_h = document.querySelector('.time-h')
let time_d = document.querySelector('.time-d')
let greeting = document.querySelector(".greeting")
let username = document.querySelector(".username")
let focus = document.querySelector(".focus")

function showTime() {
    let today = new Date()
    let month = today.getMonth() // 9 (start from 0)
    let day = today.getDate()  // 22
    let dayName = today.getDay()
    let hour = today.getHours()
    let min = today.getMinutes()
    let sec = today.getSeconds();

    time_h.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    time_d.innerHTML = `${getDayName(dayName)}<span>,</span>${(day)}<span> </span>${getMonth(month)}`;

    if (document.activeElement !== document.getElementById("username")){
        getUserName()
    }
    if (document.activeElement !== document.getElementById("focus")){
        getFocus()
    }

    setTimeout(showTime, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getDayName(day) {
    return DAY[day]
}

function getMonth(mon) {
    return MONTH[mon]
}

function getUserName() {
    if (localStorage.getItem('username') === null) {
        username.textContent = '[Enter Name]'
    }else {
        username.textContent = localStorage.getItem('username')
    }
}

function setUserName(e = "keypress") {
    if (e.type === 'keypress'){
        if (e.which == 13 || e.keyCode == 13){
            localStorage.setItem('username',  e.target.innerText)
            username.blur()//???
        }
    }else {
        username.textContent = e.target.innerText
    }
}

function setEmptyName(e){
    username.textContent = ""
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]'
    }else {
        focus.textContent = localStorage.getItem('focus')
    }
}

function setFocus(e = "keypress") {
    if (e.type === 'keypress'){
        if(e.which === 13 || e.keyCode == 13){
            localStorage.setItem('focus', e.target.innerText)
            username.blur()
        }
    }else {
        focus.textContent = e.target.innerText
    }
}

function setEmptyFocus(e){
    focus.textContent = ""
}

// function setBgGreet() {
//     let today = new Date()
//     let hour = today.getHours()
//     // утро 6:00-12:00,
//     if (hour >= 6 && hour < 12){
//         document.body.style.backgroundImage =
//             "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
//         greeting.textContent = 'Good Morning, ';
//     }
//     // день 12:00-18:00,
//     if (hour >= 12 && hour < 18){
//         document.body.style.backgroundImage =
//             "url('./assets/images/day/')";
//         greeting.textContent = 'Good Afternoon, ';
//     }
//     // вечер 18:00-24:00,
//     if (hour >= 18 && hour <= 23){
//         document.body.style.backgroundImage =
//             "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
//         greeting.textContent = 'Good Evening, ';
//         document.body.style.color = 'white';
//     }
//     // ночь 24:00-6:00.
//     if (hour >= 0 && hour < 6){
//         document.body.style.backgroundImage =
//             "url('https://i.ibb.co/924T2Wv/night.jpg')";
//         greeting.textContent = 'Good Evening, ';
//         document.body.style.color = 'white';
//     }
// }


username.addEventListener("keypress", setUserName)
username.addEventListener("click", setEmptyName)
focus.addEventListener("keypress", setFocus)
focus.addEventListener("click", setEmptyFocus)

showTime()
getUserName()
getFocus()
// setBgGreet()
