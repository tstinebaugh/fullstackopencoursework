import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './components/Country'
import CountryDetailed from './components/CountryDetailed'
import Weather from './components/Weather'

const FilterCountries = (countries, searchKey) => {
  return countries.filter(country => country.name.common.toLowerCase().includes(searchKey.toLowerCase()))
}

const App = () => {
  const [data, setData] = useState('')
  const [weather, setWeather] = useState('')
  const [filCountries, setFilCountries] = useState([])
  const [detailedCountries, setDetailedCountries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${filCountries[0].capitalInfo.latlng[0]}&lon=${filCountries[0].capitalInfo.latlng[1]}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
      const response = await axios.get(url)
      setWeather(response.data)
    }
    if(filCountries.length === 1) {
      setWeather('')
      fetchData()
    }
  }, [filCountries]);

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data)
      })
  }
  
  useEffect(hook, [])

  const filterCountries = (event) => {
    setFilCountries(FilterCountries(data, event.target.value))
    console.log(filCountries)
  }

  return (
    <div> find countries 
      <input 
        onChange={filterCountries}  
      />
      <div> 
        { (filCountries.length > 10) ? 
        'Please be more specific, limit of 10 displayed': 
        filCountries.length === 1 ?
          <>
            <CountryDetailed country={filCountries[0]}></CountryDetailed>
            <Weather country={filCountries[0]} weather={weather}></Weather>
          </> :
        filCountries.map((country) => {
          return <Country 
            key={Math.floor(Math.random() * 9999)} 
            country={country}
            detailedCountries={detailedCountries}
            setDetailedCountries={setDetailedCountries}>
          </Country>
        }          
        )}
      </div>
    </div>

  )
}
export default App 