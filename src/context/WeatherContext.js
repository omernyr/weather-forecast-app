import { createContext, useContext, useState } from "react";


const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {

    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const [search, setSearch] = useState(null);

    const values = {
        currentWeather,
        setCurrentWeather,
        forecast,
        setForecast,
        WEEK_DAYS,
        search,
        setSearch
    }

    return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
}

export const useWeather = () => useContext(WeatherContext);