import React, { useState, useEffect } from 'react';

const KakaoMap = ({ searchWord, count, searchData, handleDataUpdate }) => {
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState(searchWord);
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState(null);
  const [center, setCenter] = useState(null);

  // 지도 생성 및 초기화
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5662952, 126.9779451), // 서울시청 좌표
      level: 5,
    };

    const createdMap = new window.kakao.maps.Map(container, options);
    setMap(createdMap);
  }, []);

  // 검색어 변경 감지
  useEffect(() => {
    setKeyword(searchWord);
  }, [searchWord]);

  // 지도의 중심좌표 변경 감지
  useEffect(() => {
    if (map) {
      const handleCenterChange = () => {
        const newCenter = map.getCenter();
        setCenter({ lat: newCenter.getLat(), lng: newCenter.getLng() });  // 새로운 중심 좌표 객체를 상태로 저장
      };
      window.kakao.maps.event.addListener(map, 'center_changed', handleCenterChange);

      return () => {
        window.kakao.maps.event.removeListener(map, 'center_changed', handleCenterChange);
      };
    }
  }, [map]);

  // 중심 좌표나 검색어 변경 시 검색 실행
  useEffect(() => {
    if (map && (keyword || count === 0)) {
      handleSearch();
      setMarkers([]);
    }
  }, [keyword, count, map]);

  // 데이터 변경 감지
  useEffect(() => {
    if (data) {
      handleDataUpdate(data);
    }
  }, [data]);

  // 검색 실행

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // 지구의 반경 (km)
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // 거리 (km)
    return d * 1000; // 미터로 변환
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
  const handleSearch = () => {
    if (!map || !keyword) return;

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const bounds = map.getBounds();
    const center = map.getCenter();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const radius = getDistanceFromLatLonInKm(sw.getLat(), sw.getLng(), ne.getLat(), ne.getLng()) / 2;

    const searchOption = {
      location: center,
      radius: radius  // 반경 설정
    };

    const ps = new window.kakao.maps.services.Places();

    console.log(radius); 

    ps.keywordSearch(keyword, (places, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const filteredPlaces = places.filter(place => map.getBounds().contain(new window.kakao.maps.LatLng(place.y, place.x)));
      setData(filteredPlaces);
      displayPlaces(filteredPlaces);

      if (pagination.hasNextPage) {
        pagination.nextPage();  // 다음 페이지가 있다면 추가 요청
    }

    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 없습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
    }
  }, searchOption);
  };

  // 장소를 표시하는 함수
  const displayPlaces = (places) => {
    const newMarkers = places.map(place => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
      });

      window.kakao.maps.event.addListener(marker, 'mouseover', () => {
        infowindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, 'mouseout', () => {
        infowindow.close();
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  // 현재 위치에서 재검색 버튼 클릭 시 실행되는 함수
  const handleCurrentSearch = () => {
    console.log('현 위치에서 재검색 진행 중');
    handleSearch();
  };

  return (
    <div className='map-container'>
      <button className='current-position-search-btn' onClick={handleCurrentSearch}>
        현 위치에서 재검색
      </button>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default KakaoMap;