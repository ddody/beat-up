# [WE BEAT!!](https://www.webeat.studio)

# Introduction

**WE BEAT**는 평소 관심 있던 음악제작용 시퀀서(https://ko.wikipedia.org/wiki/%EC%8B%9C%ED%80%80%EC%84%9C)를 웹용으로 만든 애플리케이션입니다. \
자신의 비트 파일을 올려 악보에 사용하고, 사용자가 만든 비트를 공유하거나 서로의 비트를 수정하는 기능에 집중하여 구현한 웹용 비트메이커입니다.

![ScreenShot](./webeat-thumbnail.gif)

## Requirements

- WEBEAT은 Chrome Browser를 권장합니다.
- WEBEAT은 firebase Storage와 Database를 사용합니다.

## Installation

### Client

```
git clone https://github.com/ddody/we-beat.git
cd we-beat
npm install
npm start
```

## Feature

- 루프가 돌며 선택한 노트에 해당 비트 음원 재생
- 사용자끼리 자신의 비트를 공유하거나 서로의 비트를 수정
- Tone.js이용하여 32마디의 루프 반복, 해당하는 beat 재생 구현
- 사용자가 만든 비트 악보를 저장하고 악보 URL공유
- 본인만의 비트 파일 업로드 하여 이용
- 반응형 및 모바일 가능
- 피치조절, 음소거, 재생, 정지 등 기능 구현

## Specification

- ES2015
- Firebase Storage, Database
- React
- Redux
- React Router
- CSS Module, Sass
- Tone.js

## Test

- Jest와 Enzyme를 이용하여 Reducer및 Component 단위 테스트 구현

## Deployment

- Netlify 서비스를 이용하여 client 배포 및 테스트 자동화

## Version Control

- Web, Server의 독립적인 관리를 위한 GIT Repo 구분

## Things to do

개인프로젝트이지만 2주라는 기한을 정하고 시작하였기 때문에 초기기획에 따른 완성에 초점을 두었습니다. \
평소에 흥미가 있었던 주제라 즐겁게 작업하였습니다.
하지만 초반 음악 API 선택 미스와 기능 추가에 대한 욕심 등 아쉬음도 많이 남은 프로젝트였습니다. \
보완점은 문서로 남기고 지속적인 수정으로 더 단단한 서비스로 완성시키려합니다.

- 비트 루프시 박자 나누기
- 유저 등록 기능 추가
- 등록된 유저별 비트 저장 기능
- 비트음원 종류별 분류
- BPM range 변경
- 모바일 기능 보충
- 그 밖에 디자인 수정 및 기능 추가

---
Special thanks to [Ken Huh](https://github.com/Ken123777)
