import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import CardElement from '../components/CardElement';
import axios from 'axios';
import Filters from '../components/Filters';
import { Pagination } from 'antd';


const Cities = () => {
  const [citiesData, setCitiesData] = useState([])
  const [filteredCitiesData, setFilteredCitiesData] = useState([])
  const [searchTerm, setSearchTerm] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  useEffect(() =>{
    getCities()
  }, [])

  const filterCities = (e) => {
    const filtered_data = citiesData && citiesData.filter(x => {
      return x.city_name.toLowerCase().includes(e.target.value) || x.country_name.toLowerCase().includes(e.target.value)
      }
    )
    setCurrentPage(1)
    setFilteredCitiesData(filtered_data)
  }
 
  const getCities = async () => {
    try {
      const options = {
        method: 'GET',
        url: `https://${import.meta.env.VITE_API_HOST}/cities`,
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
        }
      };
      const response = await axios.request(options);
      setCitiesData(response.data.cities)
      setFilteredCitiesData(response.data.cities)
    
    } catch (error) {
      console.error(error);
    }
  }

  const onPageChange = (current, pageSize) => {
    setCurrentPage(current);
  };


  return (
    <>
      <div className='container'>
        <Filters 
          searchTerm={searchTerm}
          filterCities={filterCities} />
        <div className='grid row'>
          
          {filteredCitiesData && filteredCitiesData.slice((currentPage-1)*16, (currentPage-1)*16+16).map(city =>{
            return (
              <CardElement city={city} key={city.city_id}/>
            )
          })}
          
                
        </div>
        <div className='text-center my-2 card '>
          <Pagination
              onChange={onPageChange}
              showSizeChanger={false}
              defaultCurrent={currentPage}
              total={filteredCitiesData.length}
            />
        </div>
      </div>
    </>
  );
}

export default Cities

