import React, { useState } from 'react'
import TextBox from './TextBox';
import { styled } from 'styled-components';
import KakaoMap from './KakaoMap';

function SearchHeader({onChangeSearchWord}) {
    const [searchWord, setSearchWord] = useState("");

    const onChange = (e) => {
        setSearchWord(e.target.value);
    }

    const onSubmit = () => {
        onChangeSearchWord(searchWord);
      };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) { 
          onSubmit(); 
        }
      };

    return (
        <div className='kakao-color search-header' style={{ color: "white", fontSize: "1.25rem" }}>
            <TextBox text={"myMap"} />
            <input
                placeholder='검색어를 입력해주세요.'
                style={{ borderWidth: "0", height: "40px", marginTop: "10px", padding: "6px" }}
                onChange={onChange}
                onKeyDown={onKeyDown}
            >
            </input>
            </div>
    )
}

export default SearchHeader