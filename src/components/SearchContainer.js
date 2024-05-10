import React from 'react'
import SearchHeader from './SearchHeader'
import SearchList from './SearchList'

function SearchContainer({onChangeSearchWord}) {


  return (
    <div className='search-container'>
        <SearchHeader onChangeSearchWord={onChangeSearchWord} />
        <SearchList />
    </div>
  )
}

export default SearchContainer