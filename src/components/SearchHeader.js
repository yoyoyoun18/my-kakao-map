import React, { useState } from 'react'
import TextBox from './TextBox';
import { styled } from 'styled-components';
import KakaoMap from './KakaoMap';

function SearchHeader({onChangeSearchWord, onChangeCount, count}) {
    const [targetWord, setTargetWord] = useState("");

    const onChange = (e) => {
        setTargetWord(e.target.value);
    }

    const onSubmit = () => {
        onChangeSearchWord(targetWord);
        onChangeCount(count => count + 1);
        console.log(count);
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