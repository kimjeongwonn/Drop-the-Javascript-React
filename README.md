# Drop The Javascript - React

웹에서 동작하는 스텝시퀀서 어플리케이션 입니다.

<div style='display: flex'>
<img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=black"/>
<img alt="Sass" src ="https://img.shields.io/badge/Sass-CC6699.svg?&style=for-the-badge&logo=sass&logoColor=white"/>
<img alt="Webpack" src ="https://img.shields.io/badge/Webpack-8DD6F9.svg?&style=for-the-badge&logo=webpack&logoColor=black"/>
<img alt="Babel" src ="https://img.shields.io/badge/Babel-F9DC3E.svg?&style=for-the-badge&logo=babel&logoColor=black"/>
<img alt="AudioContextAPI" src ="https://img.shields.io/badge/AudioContext--API-512BD4.svg?&style=for-the-badge&logo=&logoColor=white"/>
</div>

### 개발일지
[https://github.com/kimjeongwonn/Drop-the-Javascript-React/wiki](https://github.com/kimjeongwonn/Drop-the-Javascript-React/wiki)

## 개요

Drop The Javascript는 드럼 비트를 기반으로 하는 스텝시퀀서 어플리케이션입니다. 원하는 박자에 원하는 악기를 토글하여 간단하게 드럼 비트를 제작할 수 있도록 해주며, 완성한 비트는 별도의 JSON파일로 내보내고 다시 불러올 수 있습니다.

## 기획 의도

이전에 팀 프로젝트로 제작한 Drop The Javascript를 리액트를 사용한 상태관리를 진행하고, AudioContext를 제대로 사용하여 모든 모던 브라우저에서 작동할 수 있도록 변경하였습니다. 이전 프로젝트에서 HTML/CSS를 위주로 담당하였기 때문에 아쉬움이 많이 남아 개인 프로젝트로 다시 진행하였습니다.

### 기존 프로젝트 대비 개선사항

> 기존 프로젝트 링크 : [https://github.com/kimjeongwonn/Drop-the-JS](https://github.com/kimjeongwonn/Drop-the-JS)

- 리액트를 사용해 상태관리를 개선하였습니다.
  - v2에서는 리덕스를 통해 Context API의 중첩 없이 진행할 예정입니다.
- AudioContext와 AudioBuffer를 통해서 chrome 뿐만 아니라 safari와 firefox에서도 문제없이 작동할 수 있도록 만들었습니다.
  - 기존 프로젝트에서는 AudioElement를 그 때 그 때 생성하여 play메서드를 통해 재생시켰기 때문에 safari와 모바일에서 딜레이가 심각하게 발생했습니다.
  - 특히 safari에서는 AudioElement를 재생하는 순간에 메모리에 불러오는 방식으로 동작했기 때문에 정상적인 동작이 안되었습니다.
- AudioContext의 AnalyserNode와 CanvasAPI의 동작원리를 이해하고 로직을 구성하여 원하는 모양의 그래프 애니메이션을 구현할 수 있었습니다.

### V2 개선사항

- 리덕스를 통해 전역으로 상태관리 되도록 변경하였습니다.
- AudioContext 로직을 개선하였습니다.
  - 악기 정보를 추가, 변경하기 쉽도록 수정하였습니다. 코드레벨에서 직접 악기를 설정해 줄 수 있습니다.
- React.memo를 활용하여 렌더링 성능을 개선하였습니다.

## 제작 기간

### V1 릴리즈

2021년 9월 1일 ~ 2021년 9월 22일

### V2 릴리즈

2021년 9월 25일 ~ 2021년 9월 30일
