import React from 'react'
import SearchHeader from './SearchHeader'
import SearchList from './SearchList'

function SearchContainer({onChangeSearchWord, onChangeCount, count, searchLength, searchData}) {


  return (
    <div className='search-container'>
        <SearchHeader onChangeSearchWord={onChangeSearchWord} count={count} onChangeCount={onChangeCount} />
        <SearchList searchLength={searchLength} searchData={searchData} />
    </div>
  )
}

export default SearchContainer