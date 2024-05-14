import React, { useState, useEffect } from 'react';

const KakaoMap = ({ searchWord, count, searchData, handleDataUpdate }) => {
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState(null);
  const [center, setCenter] = useState();


  useEffect(() => {
    setKeyword(searchWord); 
  }, [searchWord]);

  useEffect(() => {
    setCenter(); 
  }, [center]);
  

  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, 'dragend', handleSearch);
      window.kakao.maps.event.addListener(map, 'zoom_changed', handleSearch);
    }
  
    return () => {
      if (map) {
        window.kakao.maps.event.removeListener(map, 'dragend', handleSearch);
        window.kakao.maps.event.removeListener(map, 'zoom_changed', handleSearch);
      }
    };
  }, [map]);

  useEffect(() => {
    if (keyword !== null || count === 0) { 
      handleSearch();
    }
  }, [keyword, count, map]); 

  useEffect(() => {
    if (data !== null) {
      handleDataUpdate(data); 
      // console.log("검색 결과:", data);
    }
  }, [data]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5662952, 126.9779451), // 서울시청 좌표
      level: 5,
    };

    const map = new window.kakao.maps.Map(container, options);
    setMap(map);
  }, []);

  useEffect(() => {
    if (map) {
      // 중심 좌표가 변경될 때마다 실행되는 이벤트 리스너 추가
      window.kakao.maps.event.addListener(map, 'center_changed', function() {
        setCenter(map.getCenter());
      });
    }
  }, [map]);

  useEffect(() => {
    console.log(center);
  }, [center]);

  const handleCurrentSearch = () => {
    console.log('handleCurrentSearch 잘 작동 됨');
  }

  const handleSearch = () => {
    if (!map) return;
    if (!keyword) return;
    console.log("검색 시작");
    console.log("검색어: " + keyword);
  
    markers.forEach(marker => {
      marker.setMap(null);
    });
  
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (places, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = map.getBounds();
        const filteredPlaces = places.filter(place => bounds.contain(new window.kakao.maps.LatLng(place.y, place.x)));
        // console.log(place.y, place.x);
        setData(filteredPlaces);
        displayPlaces(filteredPlaces, map);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 없습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
      }
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

      window.kakao.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, 'mouseout', function () {
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
      <button className='current-position-search-btn'
        onClick={handleCurrentSearch}
      >
        현 위치에서 재검색
      </button>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default KakaoMap;