import React from 'react'

function SearchListElement({ title, phoneNumber, address }) {
    return (
        <div className='search-list-element'>
            <div style={{ margin: "10px", fontWeight:"bold"}}>
                {title}
            </div>
            <div style={{ margin: "5px"}}>
                {address}
            </div>
            <div style={{ margin: "5px"}}>
                {phoneNumber}
            </div>
        </div>
    )
}

export default SearchListElement