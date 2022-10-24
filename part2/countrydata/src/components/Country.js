import CountryDetailed from './CountryDetailed'

const includes = (countryName, countryList) => {
    const includes = countryList.filter(c => countryName === c)
    return includes.length === 1
}

const showCountryDetailed = (countryName, detailedCountries, setDetailedCountries) => {
    if (!includes(countryName, detailedCountries)) {
        setDetailedCountries(detailedCountries.concat(countryName))
    }
}

const Country = ({ country, detailedCountries, setDetailedCountries }) => {
    const countryName = country.name.common
    return (
        <div>
          { countryName } 
          <button onClick={() => showCountryDetailed(countryName, detailedCountries, setDetailedCountries )}>show</button>
          {
            includes(countryName, detailedCountries)? 
            <CountryDetailed country={country}></CountryDetailed>:<></>}

        </div>
    )
  }
  
export default Country