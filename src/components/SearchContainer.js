import React from 'react'
import SearchHeader from './SearchHeader'
import SearchList from './SearchList'

function SearchContainer({onChangeSearchWord, onChangeCount, count}) {


  return (
    <div className='search-container'>
        <SearchHeader onChangeSearchWord={onChangeSearchWord} count={count} onChangeCount={onChangeCount} />
        <SearchList />
    </div>
  )
}

export default SearchContainer