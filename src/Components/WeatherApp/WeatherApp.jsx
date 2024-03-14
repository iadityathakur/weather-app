import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/Search.png';
import cloudy_icon from '../Assets/Cloudy.webp';
import humidity_icon from '../Assets/humid.webp';
import windy_icon from '../Assets/Wind.webp';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({
        humidity: null,
        windSpeed: null,
        temperature: null,
        location: null,
        icon: null,
        
    });
    


    let api_key="43185d90fe4d485760c73601402355d8";

    const search = async () => {
        const inputElement = document.querySelector('.cityInput');
        if (inputElement.value === "") {
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputElement.value}&appid=${api_key}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name
               
            });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="ENTER A CITY" />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} height={30} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={cloudy_icon} alt="" />
            </div>
            <div className="weather-temp">{weatherData.temperature} °C</div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={windy_icon} alt='' className="icon" />
                    <div className="data">
                        <div className="wind-rate">{weatherData.windSpeed}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
