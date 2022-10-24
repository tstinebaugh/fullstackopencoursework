function Weather ({ country, weather }) {
    if (!weather) {
        return <></>
    }
    const imgUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
        <div>
            <h2>Weather in {country.name.common}</h2>
            <div>Temperature: {weather.main.temp} F</div>
            <img alt='weather' src={imgUrl}></img>
            <div>Wind speed: {weather.wind.speed}m/s</div>
        </div>
    )
}

export default Weather