import './App.css';
import Search from './components/Search/Search.js';
import CurrentWeather from './components/CurrentWeather/CurrentWeather.js';
import Forecast from './components/Forecast/Forecast';


function App() {
  return (
    <div id="App">
      <Search />
      <CurrentWeather />
      <Forecast />
      <a href='https://github.com/AnhBigBrother/weather-app' target='_blank'>by Tien_Anh_Tran</a>
    </div>
  );
}

export default App;
