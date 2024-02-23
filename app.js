const apiKey = "33ef44f67e615e7601e6808ce7e48849";
const city = "berlin";
const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;
const url2 = `https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const container = document.querySelector(".container");

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

async function getWeather(city) {
    const response = await fetch(url + city + `&appid=${apiKey}`);
    const response2 = await fetch(url2 + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".all-info").style.display = "none";
        container.style.background = "rgb(243, 243, 243)";
    } else {
        const data = await response.json();
        const data2 = await response2.json();
        console.log(data);
        console.log(data2);

        const unixTime = new Date((data.dt + data.timezone) * 1000);

        document.querySelector(".date").innerHTML = `${
            monthNames[unixTime.getMonth()]
        } ${unixTime.getDate()}`;
        document.querySelector(
            ".time"
        ).innerHTML = `${unixTime.getHours()}:${unixTime.getMinutes()}`;

        document.querySelector(".location").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
        document.querySelector(".windspeed").innerHTML =
            Math.round(data2.wind.speed * 10) / 10 + "mph";
        document.querySelector(".status").innerHTML = data.weather[0].main;

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./images/cloudy.png";
            container.style.background =
                "linear-gradient(180deg, rgba(145,167,167,1) 0%, rgba(155,245,241,1) 100%)";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./images/day_clear.png";
            container.style.background =
                "linear-gradient(180deg, rgba(56,213,213,1) 0%, rgba(155,245,241,1) 100%)";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./images/rain.png";
            container.style.background =
                "linear-gradient(180deg, rgba(99,115,205,1) 0%, rgba(195,203,238,1) 100%)";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "./images/snow.png";
            container.style.background =
                "linear-gradient(180deg, rgba(189,189,189,1) 0%, rgba(237,237,237,1) 100%)";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./images/rain.png";
            container.style.background =
                "linear-gradient(180deg, rgba(104,149,182,1) 0%, rgba(145,212,255,1) 100%)";
        } else if (data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "./images/rain_thunder.png";
            container.style.background =
                "linear-gradient(180deg, rgba(26,67,97,1) 0%, rgba(104,123,138,1) 100%)";
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".all-info").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
});
