import React, {useState} from 'react';

const api = {
  key: "0c9bf697b5b8ba6ab183abe8bbea3881",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {

  const [query, setQuery] = useState('');

  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }


  const dateBuilder = (d) => {
    let months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }

function getAppName() {
  if (weather.weather[0].id > 800) {
    return 'app cloud'
  } else if (weather.weather[0].id > 700) {
    return 'app'
  } else if (weather.weather[0].id >= 600 ){
    return 'app snow'
  } else if (weather.weather[0].id >= 300) {
    return 'app rain'
  } else {
    return 'app thunderstorm'
  }
}
    

  return (
    <div className={
      (typeof weather.main != "undefined") ? (getAppName()): 'app' }>
      <main>
        <div className="search-box">
          <input
            type = "text"
            className = "search-bar"
            placeholder = "search location..."
            onChange = {e => setQuery(e.target.value)}
            value = {query}
            onKeyPress = {search}
            />        
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="top-box">
            <div className="weather-box">  
              <div className="temp">
                  {Math.round(weather.main.temp)}°
              </div>                      
            </div>
            <div className="location-box">
              <div className="location">{weather.name} {weather.sys.country}</div>
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>               
          <div className="weather-description">
              <div className="weather">
                {weather.weather[0].description}
              </div>
              <div className="weather-icon">
                <img id="weatherIcon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>                     
              </div>
          </div>
          <div className="more-details">
            <div className="feel-like">
              Feels like: {Math.round(weather.main.feels_like)}°
            </div>
            <div className="humidity">
              Humidity: {weather.main.humidity}%
            </div>
            <div className="visibility">
              Visibility: {weather.visibility}m
            </div>
            <div className="pressure">
              Pressure: {weather.main.pressure}hPa
            </div>
            <div className="wind">
              Wind: Speed {weather.wind.speed}m/s, Deg {weather.wind.deg}
            </div>
          </div>
            
        </div> ) : ('')}
               
      </main>
    </div>
  );
}

export default App;
