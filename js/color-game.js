const main_container = document.querySelector('.main-container');
const card = document.getElementsByClassName('color-card');
const stage_value = document.getElementById('stage-value');
const score_value = document.getElementById('color-score-value');
const score_container = document.querySelector('.color_score');

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
let stage = 1; //스테이지
let time = 60; //게임시간

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
  for (i = 0; i < colorCard.length; i++) {
    if (card[i] === targetCard) {
      targetCard.style.backgroundColor = `${targetColor}`;
    } else {
      card[i].style.backgroundColor = `${basicColor}`;
    }
  }
}

// 타겟 클릭 이벤트로 게임 진행
main_container.addEventListener('click', function (e) {
  //맞출시에
  if (e.target === targetCard) {
    console.log('성공');
    score_container.animate(keyframes, options);
    ++stage; //성공하면 다음 스테이지로
    stage_value.innerText = stage;
    if (stage % 5 === 0) {
      time += 5; //10초 추가함
      if (time >= 60) time = 60;
      time_value.innerText = `${time}초`;
    }
    playerScore = playerScore + 10;
    score_value.innerText = playerScore;
    //스테이지 2 증가시에만 행열 +1 해주기
    if (stage % 2 === 0) {
      ++colorCardRow;
      ++colorCardColumn;
    }
    if (opacity <= 0.94) {
      opacity = opacity + 0.04;
    }
    //clearInterval(timer);
    drawColorCard();
  }
  //틀렸으면
  else if (e.target != targetCard) {
    console.log('실패');
    time -= 10;
    if (time <= 0) {
      time = 0;
      clearInterval(timer);
      finishModal();
    }
  }
});

//바뀌는 정보들을 업데이트 해주는 함수
function setting() {
  targetCardSelect();
  colorCard.length = colorCardRow * colorCardColumn;
  colorCardSize = 100 / colorCardRow; //카드 사이즈
  score_value.innerHTML = `${playerScore}`; // 점수 업데이트
  stage_value.innerText = stage;

  //시간 업데이트??
}

//화면에 카드 그리는 함수
function drawColorCard() {
  setting();
  let newElements = ``;
  console.log(targetNum);
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
  stage = 1;
  time = 60;
  colorCardRow = 2;
  colorCardColumn = 2;
  colorCard.length = 4;
  opacity = 0.3;
}

//게임 타이머
const time_value = document.getElementById('color-time-value');
//타이머 함수
let timer = 0;

function gameTimer() {
  time = 60;
  timer = setInterval(() => {
    time_value.innerText = ` ${time--}초`;
    if (time <= 0) {
      time_value.innerText = `0초`;
      clearInterval(timer);
      finishModal();
    }
  }, 1000); //1초씩 감속
}

//모달창 변수들
const modal = document.getElementById('color-modal');
const modalContent = document.getElementsByClassName('color-modal-content');
const modalText = document.querySelector('.color-modal-text');
const modalCloseTime = document.getElementById('time');
const again_btn = document.getElementById('again-btn');
const close_btn = document.getElementById('close-modal');

//결과 모달창 닫기 버튼이나 바깥쪽을 클릭시에 모달창 닫힘
modal.addEventListener('click', (e) => {
  if (e.target === close_btn || e.target === modal) {
    modal.style.display = 'none';
    clearInterval(modal_close);
    restartGame();
  }
});

function restartGame() {
  initGame();
  drawColorCard();
  gameTimer();
}

//게임 오버시에 나타나는 모달창
function finishModal() {
  again_btn.style.display = 'block';
  modalText.innerHTML = `
  <h1 id="game_over"> 💥게임 오버💥</h1>
  <div id="color_final-text">
  <span id="color_final-result">점수 : ${playerScore}</span>
  <span id="color_final-stage">최종 스테이지 : ${stage}</span>
  </div>
  `;
  closeModal();
  modal.style.display = 'block';
  // restartGame();
}

//15초 이후에 자동으로 모달창을 닫는 함수
let closeModal_time = 0;
function closeModal() {
  closeModal_time = 15; //15초
  modalCloseTime.innerText = closeModal_time;
  modal_close = setInterval(function () {
    modalCloseTime.innerText = --closeModal_time;
    if (closeModal_time === 0) {
      clearInterval(modal_close);
      modal.style.display = 'none';
      restartGame();
    }
  }, 1000);
  //modal.style.display = 'none';
}

const gameReset = document.getElementById('color-game-reset');
const x = document.querySelector('#x');
const resetModal = document.querySelector('.reset-modal');
const resetModalContent = document.querySelector('#reset-modal-content');
const resetOk = document.querySelector('#reset-ok');
gameReset.addEventListener('click', function () {
  resetModal.style.display = 'block';
  resetModalContent.innerHTML = `
  <h2 id="reset_msg">다시 시작하시겠습니까?</h2>
  `;
  resetOk.addEventListener('click', () => {
    resetModal.style.display = 'none';
    location.reload();
  });
});
//엑스 버튼 누르면 모달창만 닫힘
x.addEventListener('click', () => {
  resetModal.style.display = 'none';
});

resetModal.addEventListener('click', (e) => {
  const target = e.target;
  if (target === resetModal) {
    resetModal.style.display = 'none';
    location.reload();
  }
});

//다시하기 누르면 새로고침
again_btn.addEventListener('click', () => {
  clearInterval(modal_close);
  modal.style.display = 'none';
  restartGame();
});

//성공할시 점수 애니메이션
let keyframes = [{ scale: 0.5 }, { scale: 1.2 }, { scale: 1 }];
let options = {
  easing: 'ease-in',
  duration: 100,
};

//페이지가 로드되면 자동으로 실행되도록 window.onload()사용
window.onload = function () {
  drawColorCard();
  gameTimer();
};
