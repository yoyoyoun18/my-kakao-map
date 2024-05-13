import React from 'react'
import SearchListElement from './SearchListElement'

function SearchList({ searchLength, searchData }) { 

  return (
    <div className='search-list'>
        {searchData.map((item, index) => (
          <SearchListElement 
            key={index} 
            title={item.place_name} 
            phoneNumber={item.phone} 
            address={item.address} 
          />
        ))}
    </div>
  )
}

export default SearchList