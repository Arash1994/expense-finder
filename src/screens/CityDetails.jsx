import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { Segmented } from 'antd';



const CityDetails = () => {
  const params = useParams();
  const [cityData, setCityData] = useState(null)
  const [priceCatagory, setPriceCatagory] = useState(["All"])
  const [segmentData, setSegmentData] = useState(["All"])
  useEffect(() =>{
    fetchCity()
  }, [])

  const groupBy = (arr, groupFn) =>
  arr.reduce(
    (grouped, obj) => ({
      ...grouped,
      [groupFn(obj)]: [...(grouped[groupFn(obj)] || []), obj],
    }),
    {}
  );
  
  const fetchCity = async() =>{
    const {city, country} = params
    const options = {
      method: 'GET',
      url: `https://${import.meta.env.VITE_API_HOST}/prices`,
      params: {
        city_name: city,
        country_name: country
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
      }
    };

    try {
      const response = await axios.request(options);
      setCityData(response.data)
      let data = groupBy(response.data.prices, (item) => item.category_name)
      let tempData = []
      Object.entries(data).map(([key, value]) => {
       tempData.push(key)
      })
      setSegmentData([...segmentData, ...tempData])
    } catch (error) {
      console.error(error);
    }

  }
  let pricesData = []
  
  
  if (cityData && cityData.prices){
    pricesData = groupBy(cityData.prices, (item) => item.category_name)
  }

  // setSegmentData(Object.keys(pricesData))

  return (
    <>
      <div className='container my-2'>
        {!cityData && "Loading..."}
        {cityData &&  
        <>
          <div className='row'>
            <div className='d-flex align-middle'> 
              <h3>{cityData.city_name}, <span className='text-muted'>{cityData.country_name}</span></h3>
            </div>
          </div>
          <div className='row'>
              <div className='card'>
                <div className='d-flex justify-content-between'> 
                  <div><h3>Exchnage Rate</h3> </div>
                  <div>last update: {(new Date(cityData.exchange_rates_updated.timestamp)).toLocaleString("us", {weekday: 'short', month: 'short', day: 'numeric', hour: "numeric", minute:"numeric", second: "numeric" })}</div>
                </div>
                <hr/>
                {Object.entries(cityData.exchange_rate).map(([key, value]) => {
                  return (
                    <li key={value}> {key}: {value}</li>
                  )
                })}
              </div>
          </div>

          <div className='row'>
              <div className='card'>
                <h3>Expenses</h3>
                <hr/>
                <div className='table-responsive'>
                  <Segmented options={segmentData} value={priceCatagory} onChange={setPriceCatagory} />
                </div>
                <div className='row d-flex justify-content-center'>
                  {(priceCatagory == "All" ? cityData.prices : pricesData[priceCatagory]).map(item => {
                    return (
                    <div className='card col-xs-12 col-md-5 m-4' key={item.good_id}>
                      <h3>{item.item_name}</h3>
                      <span>{item.category_name}</span>
                      <div className='d-flex'>
                        <div>Price Range(INR)</div>
                        <div>
                          {item.min} - {item.max}
                        </div>
                      </div>
                      <div className='d-flex'>
                        <div>Average Price(INR)</div>
                        <div>
                          {item.avg}
                        </div>
                      </div>
                      <div className='d-flex'>
                        <div>Price Range(USD)</div>
                        <div>
                          {item.usd?.min} - {item.usd?.max}
                        </div>
                      </div>
                      <div className='d-flex'>
                        <div>Average Price(USD)</div>
                        <div>
                          {item.usd?.avg}
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>
              </div>
          </div>
          </>  
        }
      </div>
    </>
   
    

  )
}

export default CityDetails