import React from 'react'

const Filters = ({setSearchTerm, searchTerm, filterCities}) => {
  return (
    <div>
      <div className='row mx-1 my-2'>
        <input type="text" className="form-control" placeholder="Search" onChange={filterCities}  />
      </div>
    </div>
  )
}

export default Filters