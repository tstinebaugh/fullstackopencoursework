function CountryDetailed({ country }) {
    const languages = (languages) => {
        let langs = Object.values(languages)
        return langs
    }
    
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>Capital: {country.capital[0]}</div>
            <div>Area: {country.area} sq. meters</div>
            <h3>Languages:</h3>
            <ul>
                {
                    languages(country.languages).map(lang => 
                        <li key={Math.floor(Math.random() * 9999)}>
                            { lang }
                        </li>
                    )
                }
            </ul>
            <img src={country.flags.png} alt="country flag"></img>
        </div>
    )
}

export default CountryDetailed