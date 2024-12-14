# 공동구매 게스트하우스

Main Screen
![스크린샷 2024-12-11 오후 9 16 06](https://github.com/user-attachments/assets/34fe0215-c232-4169-8539-db05f432ea03)

# Project Introduction
리액트와 스프링 부트를 이용하여 인당으로 가격이 정해지는 게스트하우스를 공동구매하여 할인을 받을 수 있는 시스템입니다.
새로운 인연을 만나는 게스트하우스의 특성상 익명으로 숙박 일정을 투표하고 기간 내의 함께 일정을 보내 수 있습니다.

# UseCase
![스크린샷 2024-12-11 오후 10 22 21](https://github.com/user-attachments/assets/cf21e48e-a5d3-4c03-9b35-ab30a19d21dd)

# 가장 신경 쓴 부분
![무제](https://github.com/user-attachments/assets/b82e5110-cd2f-4ff6-8a95-1e9727ebe888)
데이터 조회와 랜더링에 평균 4000ms 정도 소비됨.
구조적으로 10개을 데이터를 하나의 요청으로 처리하는 것이 아니라 10개의 데이터를 10개의 요청으로 분리하고 각 요청을 컴포넌트 하나의 레벨로 분리해야 한다. 
