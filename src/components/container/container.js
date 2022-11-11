import Search from "../search/search";
import CurrentWeather from '../current-weather/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from "../../api";
import Forecast from '../forecast/forecast';
import { useWeather } from "../../context/WeatherContext";

function Container() {


    const { currentWeather, setCurrentWeather, forecast, setForecast } = useWeather();

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(' ');

        // Anlık hava verisi
        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
        // Geçmiş 5 günlük 3 saatlik hava verisi
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({ city: searchData.label, ...weatherResponse });
                setForecast({ city: searchData.label, ...forecastResponse });

            })
            .catch((err) => console.log(err))

    }

    return (
        <div className="container">
            <Search onSearchChange={handleOnSearchChange} />
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecast && <Forecast data={forecast} />}
        </div>
    )
}
export default Container;