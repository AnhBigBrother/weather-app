import { useSelector } from "react-redux";
import './Forecast.css';
import { useEffect, useRef, useState } from "react";
import { WEATHER_API_KEY } from '../../API';

const today = new Date();
let date = [];
for (let i = 0; i < 5; i++) {
    let nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    date.push(nextDay);
}
date = date.map((d) => d.toString().slice(0, 3) + "," + d.toString().slice(3, 15));

const Forecast = () => {
    const location = useSelector((store) => store.location);
    const [forecast, setForecast] = useState([]);
    const [showDetail, setShowDetail] = useState([
        {display: 'none'},
        {display: 'none'},
        {display: 'none'},
        {display: 'none'},
        {display: 'none'}
    ]);
    const ref = useRef(null);
    const handleClickOutside = () => {
        const x = [{display: 'none'},{display: 'none'},{display: 'none'},{display: 'none'},{display: 'none'}]
        setShowDetail(x);
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [])

    useEffect(() => {
        if (location.length !== 0) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location[0]}&lon=${location[1]}&appid=${WEATHER_API_KEY}&units=metric`)
                .then(res => res.json())
                .then(data => {
                    const x = data.list.filter((e, i) => i % 8 === 0);
                    setForecast(x);
                })
        }
        const x = [{display: 'none'},{display: 'none'},{display: 'none'},{display: 'none'},{display: 'none'}];
        setShowDetail(x);
    }, [location]);

    const showList = forecast.map((e, i) => 
        <div className="forecastTag" key={i}>
            <div className="descrip" onClick={() => {
                const x = [{display: 'none'},{display: 'none'},{display: 'none'},{display: 'none'},{display: 'none'}];
                x[i].display = 'flex';
                setShowDetail(x);
            }} title="More weather infomation">
                <div className="leftDes">
                    <img alt="" src={'weatherImages/' + e.weather[0].icon + '.png'}></img>
                    <h5 style={{ marginLeft: '7px', fontSize: '14px' }}>{date[i]}</h5>
                </div>
                <div className="rightDes">
                    <p style={{ margin: '0px 8px' }}>{e.weather[0].description}  ---  {Math.round(e.main.temp)}°C</p>
                </div>
            </div>
            <div className="detail" style={showDetail[i]}>
                <div className="leftDetail">
                    <p>Feel like: {e.main.feels_like} °C</p>
                    <p>Huminity: {e.main.humidity} %</p>
                </div>
                <div className="rightDetail">
                    <p>Cloud: {e.clouds.all} %</p>
                    <p>Wind speed: {e.wind.speed} m/s</p>
                </div>
            </div>
        </div>
    )
    return (
        <div id="forecast" ref={ref}>
            {showList}
        </div>
    )
}
export default Forecast;