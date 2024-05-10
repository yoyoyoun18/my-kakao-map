import { Container, Row, Col } from 'react-grid-system';
import "./App.css";
import SearchContainer from './components/SearchContainer';
import KakaoMap from './components/KakaoMap';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './components/SearchResults';


function App() {
  const [searchWord, setSearchWord] = useState(null);

  const onChangeSearchWord = (word) => {
    setSearchWord(word);
  }

  // console.log(searchWord);
  return (
    <Router> {/* Router를 최상위로 옮깁니다 */}
      <Container style={{ width: '100%', maxWidth: '100%', padding: 0 }}>
        <Row gutterWidth={0}>
          <Col className="main-left" xs={12} sm={12} md={4} lg={4} style={{}}>
            <SearchContainer onChangeSearchWord={onChangeSearchWord}>
            </SearchContainer>
          </Col>
          <Col className="main-right" xs={12} sm={12} md={8} lg={8} style={{ backgroundColor: "black" }}>
            {searchWord == null ? <KakaoMap/> : <KakaoMap searchWord={searchWord} /> }
            {/* <KakaoMap searchWord={searchWord}/> */}
          </Col>

        </Row>
      </Container>
      <Routes >
        {/* <Route path="/search/:keyword" component={SearchResults} /> */}
        {/* 기타 다른 Route 설정 */}
        {/* <Route path='/test' component={SearchResults} /> */}
      </Routes >
    </Router>
  );
}

export default App;