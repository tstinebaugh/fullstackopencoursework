import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './components/Country'
import CountryDetailed from './components/CountryDetailed'

const FilterCountries = (countries, searchKey) => {
  return countries.filter(country => country.name.common.toLowerCase().includes(searchKey.toLowerCase()))
}

const App = () => {
  const [data, setData] = useState('')
  const [filCountries, setFilCountries] = useState([])

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
          <CountryDetailed country={filCountries[0]}></CountryDetailed> :
        filCountries.map(country =>
          <Country key={Math.floor(Math.random() * 9999)} country={country}></Country>
        )}
      </div>
    </div>

  )
}
export default App 