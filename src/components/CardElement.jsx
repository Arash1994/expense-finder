import React from 'react'
import { Link } from 'react-router-dom'


const CardElement = ({city}) => {
  
  return (
    <div className='col-xs-1 col-md-4 col-lg-3'>
    <Link to={`cities/${city.city_name}/${city.country_name}`}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{city.city_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{city.country_name}</h6>        
        </div>
      </div>
     </Link>
     </div>
  )
}

export default CardElement
