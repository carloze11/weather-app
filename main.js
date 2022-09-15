const getWeather = async (city) => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ee443dfda59ff9d197b576ad77259d26`
      );
      const weatherData = await response.json();
      const weather = weatherData.weather[0].main;
      const tempFahr = kelvinToFahr(weatherData.main.temp);
      const weatherGif = await searchGiphy(weather);
      showCityTemp(city, tempFahr);
      showWeather(weatherGif);
    } catch (err) {
      console.error(err);
    }
  };
  
  //kelvin to fahrenheit
  const kelvinToFahr = (temp) => {
    return Math.round((temp - 273.15) * (9 / 5) + 32);
  };
  
  //fahrenheit to celsius
  const fahrToCelsius = (temp) => {
    return Math.round(temp - 32) * (5 / 9);
  };
  
  //celsius to fahr
  const celsiusToFahr = (temp) => {
    return Math.round((temp * 9) / 5 + 32);
  };
  
  //plug city and temp into DOM
  const showCityTemp = (city, temp) => {
    let h1 = document.querySelector(".showCity");
    h1.innerText = `It is ${temp}\u00B0F in ${city}.`;
  };
  
  //get gif from giphy
  async function searchGiphy(topic) {
    try {
      let randomNum = Math.round(Math.random() * 20);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=ZfU39oI2psIhN1CWnGRY71Ar0PhzYqKd&q=${topic}`
      );
      const json = await response.json();
      return json.data[randomNum].images.original.url;
    } catch {
      console.error("Error getting Gif");
    }
  }
  
  //add gif to DOM
  const showWeather = (weather) => {
    let img = document.querySelector("img");
    img.src = weather;
    img.style.display = "block";
  };
  
  let btn = document.querySelector("button");
  btn.addEventListener("click", () => {
    let city = document.querySelector("input").value;
    getWeather(city);
  });
  