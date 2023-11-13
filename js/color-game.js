const main_container = document.querySelector('.main-container');
const card = document.getElementsByClassName('color-card');
let colorCardRow = 2; //행
let colorCardColumn = 2; //열
let colorCard = new Array(); //카드 배열 만들기
let colorCardSize = 0; //카드 사이즈

//타켓 카드를 위한 정보
let targetNum = 0;
let targetCard = 0;
let opacity = 0.3;

//게임 정보
let playerScore = 0; //플레이어 점수
let stage = 0; //스테이지
let time = 30; //게임시간

let modal_time = 15; //모달창 닫히는 시간

//타겟 카드 선정하기 (랜덤)
function targetCardSelect() {
  targetNum = Math.floor(Math.random() * colorCard.length); // 0부터
}

//카드 색상 넣어주는 함수
function paintColorIntoCard() {
  targetCard = document.getElementById('target');
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255 + 100);
  let blue = Math.floor(Math.random() * 255 + 100);
  let basicColor = `rgba(${red},${green},${blue})`;
  let targetColor = `rgba(${red},${green},${blue},${opacity})`;
  console.log(basicColor);
  console.log(targetColor);
  for (i = 0; i < colorCard.length; i++) {
    if (card[i] === targetCard) {
      targetCard.style.backgroundColor = `${targetColor}`;
    } else {
      card[i].style.backgroundColor = `${basicColor}`;
    }
  }
}

main_container.addEventListener('click', function (e) {
  if (e.target === targetCard) {
    console.log('성공');
    ++stage; //성공하면 다음 스테이지로
    if (stage % 2 === 0) {
      ++colorCardRow;
      ++colorCardColumn;
    }
    if (opacity <= 0.85) {
      opacity = opacity + 0.05;
    }

    drawColorCard();
  }
});

//바뀌는 정보들을 업데이트 해주는 함수
function setting() {
  targetCardSelect();
  colorCard.length = colorCardRow * colorCardColumn;
  colorCardSize = 100 / colorCardRow;
}

//화면에 카드 그리는 함수
function drawColorCard() {
  setting();
  console.log(targetNum);
  let newElements = ``;
  for (let i = 0; i < colorCardRow * colorCardColumn; i++) {
    if (i === targetNum) {
      newElements += `<div class="color-card" id="target"></div>`;
    } else {
      newElements += `<div class="color-card"></div>`;
    } //행*열만큼 div 넣음
  }
  main_container.innerHTML = newElements;

  //카드 사이즈 지정해주기
  for (let i = 0; i < colorCardRow * colorCardColumn; i++) {
    card[i].style.width = `${colorCardSize}%`;
    card[i].style.height = `${colorCardSize}%`;
  }
  paintColorIntoCard();
}

//게임정보 초기화 함수
function initGame() {
  playerScore = 0;
  stage = 0;
  time = 30;
}

//페이지가 로드되면 자동으로 실행되도록 window.onload()사용
window.onload = function () {
  drawColorCard();
  targetCardSelect();
};
