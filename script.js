



const items = document.querySelectorAll('.item');

function checkInView() {
    items.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;

        if (itemTop < window.innerHeight && itemBottom >= 0) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        } else {
            item.style.opacity = '0';
            if (item.classList.contains('left')) {
                item.style.transform = 'translateX(-100%)';
            } else if (item.classList.contains('right')) {
                item.style.transform = 'translateX(100%)';
            } else if (item.classList.contains('top')) {
                item.style.transform = 'translateY(-100%)';
            } else if (item.classList.contains('bottom')) {
                item.style.transform = 'translateY(100%)';
            }
        }
    });
}

window.addEventListener('scroll', checkInView);
window.addEventListener('load', checkInView);



function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let am_pm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    document.getElementById("clock").textContent = `${hours}:${formatTime(minutes)}:${formatTime(seconds)} ${am_pm}`;
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

setInterval(updateClock, 1000); 


const apiKey = '66ccbcf2ac637f0b0a75bd29d0c591d8';
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const cityElement = document.querySelector('.city');


async function getWeatherData(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            const temp = data.main.temp;
            const desc = data.weather[0].description;
            temperature.textContent = temp;
            description.textContent = desc;
            cityElement.textContent = data.name;
        } else {
            temperature.textContent = '--';
            description.textContent = 'City not found';
            cityElement.textContent = '';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

navigator.geolocation.getCurrentPosition(
    (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherData(latitude, longitude);
       
    },
);


var currentDate = new Date();

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var formattedDate = currentDate.toLocaleDateString('en-US', options);

document.getElementById("currentDate").innerHTML = formattedDate;

$("a").click(function(){
    var pageId = $(this).attr("data-page");
    $("html, body").animate({ scrollTop: $("#"+pageId).offset().top }, 1000);
  });