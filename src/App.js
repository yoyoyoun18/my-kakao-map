import { Container, Row, Col } from 'react-grid-system';
import "./App.css";
import SearchContainer from './components/SearchContainer';
import KakaoMap from './components/KakaoMap';
import { useState } from 'react';
import SearchResults from './components/SearchResults';


function App() {
  const [searchWord, setSearchWord] = useState(null);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const handleDataUpdate = newData => {
    setData(newData);
    console.log(data);
  };

  const onChangeSearchWord = (word) => {
    setSearchWord(word);
  }

  const onChangeCount = (num) => {
    setCount(num)
  }

  return (
      <Container style={{ width: '100%', maxWidth: '100%', padding: 0 }}>
        <Row gutterWidth={0}>
          <Col className="main-left" xs={12} sm={12} md={4} lg={4} style={{}}>
            <SearchContainer onChangeSearchWord={onChangeSearchWord} onChangeCount={onChangeCount} count={count} >
            </SearchContainer>
          </Col>
          <Col className="main-right" xs={12} sm={12} md={8} lg={8} style={{ backgroundColor: "black" }}>
            {searchWord == null ? <KakaoMap count={count} onDataUpdate={handleDataUpdate} /> : <KakaoMap searchWord={searchWord} count={count} onDataUpdate={handleDataUpdate} /> }
            {/* <KakaoMap searchWord={searchWord}/> */}
          </Col>

        </Row>
      </Container>
  );
}

export default App;