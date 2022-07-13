
#  Clip📎

<div align="center">
  <div>
    <kbd>
      <img style="border-radius:3px;" src="https://user-images.githubusercontent.com/27064187/178737688-58c9fe1b-52a4-4320-a1e3-833e06be6666.png" width=130>
    </kbd>
  </div>
  <div>
      <h3>물물교환을 간편하고 빠르게 앱으로, CLIP</h3>
  </div>
  <a href="https://drive.google.com/file/d/1vbe0iHlXVgfwUqTlrr4mlAxy1HwQ9sQo/view?usp=sharing">APK 파일</a>
</div>

## 📎 프로젝트 소개 
- 물물교환을 오프라인으로 하면 시간소모가 큽니다. 'Clip' 서비스는 온라인으로 진행되어 물물교환 시간이 단축됩니다!
- 스와이프 UI로 간편하게 물건을 조회/교환요청을 할 수 있습니다!
- 보증금으로 정상적인 교환을 보장합니다!
- 📑[KI-IT에 제출된 논문 - 동상 수상](https://space.malangmalang.com/open?fileId=m:0:1136726563&lang=ko)
- 🎬[논문 발표 영상](https://www.youtube.com/watch?v=-1S4ILNXUUA)
- 🎥[홍보 영상](https://www.youtube.com/watch?v=B-tpYH9fy4Y&t=1s)


## 👨‍👩‍👧‍👦 팀원 소개
|박성일|배성연|임예광|임소윤|민인아|
|:-:|:-:|:-:|:-:|:-:|
|<img src="https://user-images.githubusercontent.com/27064187/178664372-5a719950-576c-4aca-b1f6-e9e62f3100a0.png" width=130>|<img src="https://avatars.githubusercontent.com/u/68287181?v=4" width=130>|<img src="https://avatars.githubusercontent.com/u/56215323?v=4" width=130>|<img src="https://avatars.githubusercontent.com/u/48981602?v=4" width=130>|<img src="https://avatars.githubusercontent.com/u/83204216?v=4" width=130>|
|[@GUAJEGUICHAN](https://github.com/GUAJEGUICHAN)|[@roddyisthebest](https://github.com/roddyisthebest)| [@rhkd6351](https://github.com/rhkd6351) |[@melon0259](https://github.com/melon0259)|[@minina0407](https://github.com/minina0407)|
|프론트엔드|프론트엔드|백엔드|프론트엔드|백엔드|

<br/>

## 📱 앱 서비스 주요 기능 ✨
- 핸드폰 인증 회원가입 (firebase 사용)
  - 파이어베이스 핸드폰 인증 서비스로 개인이 하나의 계정만 사용가능합니다.
- 물물교환 물건 조회
  - 왼쪽으로 스와이프하면 거절 오른쪽으로 하면 교환 요청을 합니다.
- 물건등록
  - 사진, 제품명, 제품 설명, 보증금액을 입력합니다.
  - 정해진 계좌에 적은 보증금 액수만큼 입금하면 관리자가 물건 등록 승인을 해줍니다.
- 교환요청/교환 승인
  - 자신의 아이템에 교환 요청한 아이템을 조회할 수 있습니다.
  - 그 아이템 중에서 교환을 승인할 수 있습니다. 이로써 물물교환이 성사됩니다.
- 푸쉬 알림 (firebase 사용)
  - 다음의 경우 백그라운드와 포그라운드에서 상단바에 알림창이 뜹니다.
    - 물건등록이 승인됐을 경우
    - 교환요청을 받았을 경우
    - 교환요청이 수락됐을 경우
  - 채팅은 백그라운드에서만 알림이 뜹니다. 
- 지난 교환 물품 조회
  - 해당 아이템이 교환이 되었던 품목들을 확인할 수 있습니다.
- 배송요청
  - 교환된 아이템을 수령하고싶다면 실질 소유자에게 배송요청을 할 수 있습니다.
  - 배송 요청자는 본인의 이름 주소 연락처를 입력합니다.
  - 배송요청을 받은 실질 소유자는 요청자의 정보로 배송을 보냅니다.
  - 만약 배송을 보내지 않았을 경우 입금된 보증금은 배송 요청자에게 돌아갑니다.
  - 배송했을 경우 보증금을 돌려받을 수 있습니다. 
- 채팅
  - 배송 요청했을 경우 채팅방이 열립니다.
  - 배송 요청자와 실질 소유자가 채팅으로 소통하여 배송 날짜를 조율할 수 있습니다.
- 배송 현황 확인
  - 배송 요청한 아이템에 운송장 번호가 입력되어있다면 해당 물품의 배송현황을 확인할 수 있습니다.
- 신고하기
  - 'clip' 서비스에 적합하지 않은 아이템이 등록됐을 경우 사용자가 관리자에게 신고를 할 수 있습니다. 
- 문의하기
  - 서비스를 이용하면서 사용자가 관리자에게 피드백을 줄 수 있습니다.

## 🖥 관리자 페이지 주요 기능 ✨ 
- [관리자페이지 Repository](https://github.com/BarterProject/clip-admin)
- 사용자 조회/검색
  - 등록된 사용자들을 조회할 수 있고 블랙 유저인 경우 이용을 금지시킬 수 있습니다.
- 물건 등록 요청 조회/승인/반려
  - 등록 요청된 물건들을 확인할 수 있으며 적절한 물건이고 보증금 입금이 확인되었을 때에 승인합니다.
  - 부적절한 물건일 경우 반려합니다.
- 등록된 물건 검색/정지
  - 검색이 가능합니다.
  - 부적절한 물건일 경우 해당 물건을 금지시킬 수 있습니다.
- 신고/문의 접수
  - 유저에게 받은 문의는 답을 줄 수 습니다.
  - 신고 사항을 접수받아 서비스를 고쳐나갈 수 있습니다.


## Backend
- [Backend Repository](https://github.com/BarterProject/anabada_api)
- Postman API 문서 https://documenter.getpostman.com/view/16333586/UyxgK8h8


## 동작 화면 📱

|물건 등록|물건 교환|
|:-:|:-:|
|![물건 등록](https://user-images.githubusercontent.com/27064187/178729937-780a0867-17d7-4c07-ac99-d83c99bfc2fe.gif)|![교환완료](https://user-images.githubusercontent.com/27064187/178729922-42f0162d-ab6c-4b76-8285-bd045ee26397.gif)|
|:-:|배송 요청 및 배송 현황 확인|
|:-:|![배송요청 및 배송현황 확인](https://user-images.githubusercontent.com/27064187/178730338-ca374311-fa08-465b-9520-0b3bdb002243.gif)|


## 🛠 기술 스택 및 인프라

![image](https://user-images.githubusercontent.com/27064187/178728437-854852f8-a73e-4c31-86fb-9e5bee16f4c8.png)
