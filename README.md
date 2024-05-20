### My Map (toy project)

---

kakao api를 이용하여 지도 검색 서비스를 구현

### commit 메세지 규칙

---

```
// Header, Body, Footer는 빈 행으로 구분한다.
타입(스코프): 주제(제목) // Header(헤더)

본문 // Body(바디)

바닥글 // Footer
```

| 타입이름 | 내용                                                  |
| -------- | ----------------------------------------------------- |
| feat     | 새로운 기능에 대한 커밋                               |
| fix      | 버그 수정에 대한 커밋                                 |
| build    | 빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋 |
| chore    | 그 외 자잘한 수정에 대한 커밋                         |
| ci       | ci 관련 설정 수정에 대한 커밋                         |
| docs     | 문서 수정에 대한 커밋                                 |
| style    | 코드 스타일 혹은 포맷 등에 관한 커밋                  |
| refactor | 코드 리팩토링에 대한 커밋                             |
| test     | 테스트 코드 수정에 대한 커밋                          |
| perf     | 성능 개선에 대한 커밋                                 |

5-20 커밋부터 적용

### 목표

---

- React.js useEffect, useState, useRef 등 다양한 훅들을 적용해보기
- Javascript 비동기처리 구현 (api 요청부)
- 대중적인 api 다뤄보기
- git page가 아닌 다른 방식으로 배포해보기

### 실행

---

node.js (18.20.2 이상)

```
npm install
npm start
```

### 프로젝트 목표

---

- kakao map api를 이용하여 장소 검색 서비스를 구축한다.
- 오픈 api에 대한 활용도를 높이고 배포까지 하여서 정말 상용 될 수 있는 서비스를 만들어보는 것이 목표.
- OAuth를 이용하여 로그인 시스템을 구현하고 내 집 내가 자주가는 곳 등을 즐겨찾기 할 수 있는 기능 탑재 목표.
- 다양한 React.js 의 hook 들과 javascript의 비동기 처리에 대한 이해도를 높이는 것.
- git을 통한 상태관리, 여러 장소를 이동하며 환경 세팅을 최적화에 힘써 작업 환경에 대한 영향을 줄이기.
- useMemo, useCallback, useCallback, Context API, Redux, REST API, Fetch, JSON Schema, AJV, MUI, Vercel, AWS 등 사용해보고 싶었던 기술들을 차례로 적용시켜 버전 업 시키기.

### 느낀점

---

### 개선사항, 아쉬운 점

---
