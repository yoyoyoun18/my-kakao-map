import React, { useState, useEffect } from 'react';

const KakaoMap = ({searchWord}) => {
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
  if (searchWord !== null) {
    handleSearch();
  }
}, [searchWord]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5662952, 126.9779451), // 서울시청 좌표
      level: 5,
    };

    const map = new window.kakao.maps.Map(container, options);
    setMap(map);
  }, []);

  const handleSearch = () => {
    setKeyword(searchWord);
    if (!map) return;
    if (!keyword) return;
    console.log("키워드 바뀌는 함수 실행됨");
    console.log(keyword);

    markers.forEach(marker => {
      marker.setMap(null);
    });

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        displayPlaces(data, map);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 없습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
      }
      console.log(data);
    });
  };

  const displayPlaces = (places, map) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    const newMarkers = [];

    places.forEach(place => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
      });

      window.kakao.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close();
      });

      bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
      newMarkers.push(marker);
    });

    map.setBounds(bounds);
    setMarkers(newMarkers);
  };

  

  return (
    <div className='map-container'>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default KakaoMap;