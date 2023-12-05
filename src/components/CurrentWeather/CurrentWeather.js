import { useEffect, useState } from 'react';
import './CurrentWeather.css';
import { useSelector } from "react-redux";
import { WEATHER_API_KEY } from '../../API';


const CurrentWeather = () => {
    const location = useSelector((store) => store.location);
    const city = useSelector((store) => store.cityName);
    const [time, setTime] = useState();
    const [weatherDescription, setWeatherDescription] = useState();
    const [temp, setTemp] = useState();
    const [weatherPathImg, setWeatherPathImg] = useState();
    const [feelLike, setFeelLike] = useState();
    const [humidity, setHumidity] = useState();
    const [cloud, setCloud] = useState();
    const [windSpeed, setWindSpeed] = useState();
    useEffect(() => {
        if (location.length !== 0){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=${WEATHER_API_KEY}&units=metric`)
            .then(res => res.json())
            .then(data => {
                const d = new Date();
                setTime(d.toString().slice(0, 3) + "," + d.toString().slice(3, 15));
                setTemp(Math.round(data.main.temp));
                setWeatherDescription(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1));
                setWeatherPathImg(`/weatherImages/${data.weather[0].icon}.png`);
                setFeelLike(data.main.feels_like);
                setHumidity(data.main.humidity);
                setCloud(data.clouds.all)
                setWindSpeed(data.wind.speed);
            })
        }
    }, [location])
    return (
        <div id='CurrentWeather'>
            <div id='left'>
                <div id='location'>
                    <h1>{city}</h1>
                    <p>{time}</p>
                </div>
                <div id='description'>
                    <h1>{temp}°C</h1>
                    <p>{weatherDescription}</p>
                </div>
            </div>
            <div id='right'>
                <img alt='' src={weatherPathImg} />
                <div id='detail'>
                    <div id='feelLike'>
                        <p>Feel Like:</p>
                        <p>{feelLike} °C</p>
                    </div>
                    <div id='humidity'>
                        <p>Humidity:</p>
                        <p>{humidity} %</p>
                    </div>
                    <div id='cloud'>
                        <p>Cloud:</p>
                        <p>{cloud} %</p>
                    </div>
                    <div id='windSpeed'>
                        <p>Wind Speed:</p>
                        <p>{windSpeed} m/s</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;