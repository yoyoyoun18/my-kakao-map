import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchListElement from './SearchListElement';

function SearchList({ searchLength, searchData }) {
  
  const handleItemClick = (url, e) => {
    console.log('클릭 됨');
    window.open(url, '_blank');
  };

  return (
    <div className='search-list'>
        {searchData.map((item, index) => (
          <SearchListElement 
            key={index} 
            title={item.place_name} 
            phoneNumber={item.phone} 
            address={item.address_name}
            onClick={() => handleItemClick(item.place_url)}         />
        ))}
    </div>
  )
}

export default SearchList;
