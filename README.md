# WE BEAT!!

# Introduction

예전부터 관심있었던 음악제작용 시퀀서(연주 데이터를 재생하여 자동 연주하는 것을 목적으로 한 장비 또는 소프트웨어)를 웹용으로 만든 어플리케이션입니다. \
자신의 비트파일을 올려 악보에 사용하고, 사용자가 만든 비트를 공유하거나 서로의 비트를 수정하는 기능에 집중하여 구현한 웹용 비트메이커 입니다.

## Requirements

- WEBEAT은 Chrome Browser를 권장합니다.
- WEBEAT은 firebase Storage와 Database를 사용합니다.
-
## Installation

```
git clone https://github.com/ddody/we-beat.git
cd we-beat
npm install
npm start
```

## Feature

- 웹 비트메이커 어플리케이션, 사용자끼리 자신의 비트를 공유하거나 서로의 비트를 수정하는 어플리케이션
- Tone.js이용하여 32마디의 루프 반복, 해당하는 beat 재생 구현
- 사용자가 만든 비트 악보를 저장하고 악보 URL공유
- 본인만의 비트 파일 업로드 하여 이용
- 반응형 및 모바일 가능
- 피치조절, 음소거, 재생, 정지 등 기능 구현
- Netlify 서비스를 이용하여 client 배포 및 테스트 자동화

## Test

- Jest와 Enzyme를 이용하여 Reducer및 Component 단위 테스트 구현

## Things to do




