import { useEffect, useState } from "react"
import weatherService from '../services/weather'

const Country = ({country}) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService
        .getWeather(country.capital)
        .then(countryWeather => {
            setWeather(countryWeather)
        })
    }, [country.capital])

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
            {
                Object.entries(country.languages).map(([code, language]) => (
                    <li key={code}>{language}</li>
                ))
            }
            </ul>

            <img src={country.flags.png} alt="" />
            
            <h1>Weather in {country.name.common}</h1>
            {weather && (
                <div>
                    <p>Temperature {weather.main.temp}</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <p>Wind {weather.wind.speed} m/s</p>
                </div>
            )}

        </div>

    )
}

export default Country