'use strict'
const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const PHOTOS_NUMBER = 20


let time_h = document.querySelector('.time-h'),
    time_d = document.querySelector('.time-d'),
    greeting = document.querySelector(".greeting"),
    username = document.querySelector(".username"),
    focus = document.querySelector(".focus"),
    btn_photos = document.querySelector(".btn-photos"),
    btn_ok = document.querySelector(".btn-ok"),
    btn_cancel = document.querySelector(".btn-cancel"),
    quote = document.querySelector('.quote'),
    btn_quote = document.querySelector('.btn_quote')

let wallpaperIndex = -1
let photos = []

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

    if (document.activeElement !== document.getElementById("username")) {
        getUserName()
    }
    if (document.activeElement !== document.getElementById("focus")) {
        getFocus()
    }

    // if (min === 0 && sec === 0) {
    if (sec === 35) {
        // setWallpaper()
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
    } else {
        username.textContent = localStorage.getItem('username')
    }
}

function setUserName(e = "keypress") {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('username', e.target.innerText)
            username.blur()//???
        }
    } else {
        username.textContent = e.target.innerText
    }
}

function setEmptyName(e) {
    username.textContent = ""
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]'
    } else {
        focus.textContent = localStorage.getItem('focus')
    }
}

function setFocus(e = "keypress") {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText)
            username.blur()
        }
    } else {
        focus.textContent = e.target.innerText
    }
}

function setEmptyFocus(e) {
    focus.textContent = ""
}


// PHOTOS

/**
 * generate random photos list
 */
function generateDayPhotos() {
    let morning = "./assets/images/morning/",
        day = "./assets/images/day/",
        evening = "./assets/images/evening/",
        night = "./assets/images/night/"
    let timeslot = [morning, day, evening, night]

    for (let i = 0; i < 4; i++) {
        let randStartNum = Math.ceil(Math.random() * PHOTOS_NUMBER) + 1
        for (let j = randStartNum; j < randStartNum + 6; j++) {
            let index = j !== PHOTOS_NUMBER ? j % PHOTOS_NUMBER : 20
            photos.push(timeslot[i] + addZero(index) + ".jpg")
        }
    }

}

btn_photos.addEventListener("click", function (e) {
    let modal = document.getElementById("modal");
    wallpaperIndex = -1
    fillModalWindowWithPhotos()
    modal.style.display = "block"

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})

function fillModalWindowWithPhotos() {
    let photos_list = document.querySelector(".photos-card")
    let photoCard = ""
    for (let i = 0; i < photos.length; i++) {
        photoCard += "<div class='photo-card'><img class='background-wallpaper' id='" + i + "' src='" + photos[i] + "'></div>"
    }
    photos_list.innerHTML = photoCard
    let background_wallpaper = document.querySelectorAll(".background-wallpaper")

    for (let i = 0; i < background_wallpaper.length; i++) {
        let wallpaper = background_wallpaper[i]
        wallpaper.addEventListener('click', function (e) {
            wallpaperIndex = e.target.id
        })
    }
}

btn_ok.addEventListener("click", function () {
    debugger
    if (wallpaperIndex !== -1) {
        changeBackgroundWallpaper(wallpaperIndex)
        changePhotosOrder(wallpaperIndex)
        document.getElementById("modal").style.display = "none";
    } else
        alert("Choose image or click cancel")
})

function changeBackgroundWallpaper(wallpaperIndex) {
    // getImage(wallpaperIndex)
    document.body.style.backgroundImage = `url(${photos[wallpaperIndex]})`;
}

function changePhotosOrder(wallpaperIndex) {
    let temp = []
    for (let i = wallpaperIndex; i < photos.length; i++) temp.push(photos[i])
    for (let i = 0; i < wallpaperIndex; i++) temp.push(photos[i])
    photos = temp
}

function setWallpaper() {
    let today = new Date()
    let hour = today.getHours()
    let min = today.getMinutes()
    let sec = today.getSeconds()
    // утро 6:00-12:00,
    if (hour >= 6 && hour < 12) {
        greeting.textContent = 'Good Morning, ';
    }
    // день 12:00-18:00,
    if (hour >= 12 && hour < 18) {
        document.body.style.backgroundImage =
            "url('./assets/images/day/')";
        greeting.textContent = 'Good Afternoon, ';
    }
    // вечер 18:00-24:00,
    if (hour >= 18 && hour <= 23) {
        document.body.style.backgroundImage =
            "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
    }
    // ночь 24:00-6:00.
    if (hour >= 0 && hour < 6) {
        document.body.style.backgroundImage =
            "url('https://i.ibb.co/924T2Wv/night.jpg')";
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
    }

    let rand = Math.ceil(Math.random() * 24)
    // document.body.style.backgroundImage = `url(${photos[hour]})`;
    document.body.style.backgroundImage = `url(${photos[rand]})`;

}

btn_cancel.addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
})


// QUOTES
// https://type.fit/api/quotes - список цитат   [
//   {
//     "text": "Genius is one percent inspiration and ninety-nine percent perspiration.",
//     "author": "Thomas Edison"
//   },
//https://api.adviceslip.com/advice - рандомно одну цитату
// {"slip": { "id": 60, "advice": "Fail. Fail again. Fail better."}}

//todo del comment
btn_quote.addEventListener("click", function () {
    // getQuote()
})


async function getQuote() {
    const url = `https://api.adviceslip.com/advice`
    const res = await fetch(url)
    const data = await res.json()
    quote.textContent = data.slip.advice
    console.log(quote.textContent)

}


username.addEventListener("keypress", setUserName)
username.addEventListener("click", setEmptyName)
focus.addEventListener("keypress", setFocus)
focus.addEventListener("click", setEmptyFocus)

showTime()
getUserName()
getFocus()
generateDayPhotos()
setWallpaper()
//todo del comment
// getQuote()
console.log(photos)
