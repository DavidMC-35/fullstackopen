import { useState, useEffect } from 'react'

import countriesService from './services/countries'
import Country from './components/Country'


const App = () => {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  let content = null

  useEffect(()=> {
    countriesService
      .getCountry()
      .then(allCountries => {
        setCountries(allCountries)
      })
  },[search])  


    const handleSearchChange = (event) => {
      setSearch(event.target.value)
    }

    const filteredCountries  = countries.filter(country => 
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    
    const showCountry = (country) => {
      setSelectedCountry(country)
    }

    if(search){
      if(filteredCountries.length > 10){
        content = 'Too many matches, specify another filter'
      } else if (filteredCountries.length === 1){
        content = <Country country={filteredCountries[0]}/>
      }else if(selectedCountry){
        content = <Country country={selectedCountry}/>
      }else{
        content = filteredCountries.map(c => (
          <div key={c.cca3}>
            <p>{c.name.common}</p><button onClick={() => showCountry(c)}>Show</button>
          </div>
          
        ))
      }
    }
    

    return (
      <>
        <form>
          <label>Find countries</label>
          <input type="text" value={search} onChange={handleSearchChange} />
        </form>
        {content}
      </>
    )
}

export default App
