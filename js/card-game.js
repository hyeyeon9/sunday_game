//게임 정보
const GAME_SIZE = 24; //4*6
let stage = 1; //게임 스테이지
let game_time = 60; //게임 시간
let playerScore = 0; //사용자 점수
// const card_img = [
//   //카드에 넣을 이미지 배열
//   '1',
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
//   '7',
//   '8',
//   '9',
//   '10',
//   '11',
//   '12',
// ];
let randomCard = 0;
//카드에 넣을 랜덤카드 배열

//카드 섞는 함수
function shuffleCard(array) {
  array.sort(() => Math.random() - 0.5);
}

let Lv = document.getElementById('card_stage_value');

function restartGame() {
  score.innerText = 0;
  stage = 1;
  playerScore = 0;
  initGame();
  drawCard();
}

//게임 정보 초기화 함수
function initGame() {
  cards.innerHTML = ``;
  game_time = 60;
  randomCard = 0;
  clear = false;
  matchArr = [];
}

function nextLevel() {
  initGame();
  score.innerText = score;
  Lv.innerText = stage;
  game_time -= 5 * stage;
  drawCard();
}

//게임 타이머
const game_time_value = document.getElementById('card_time_value');
let game_timer = 0;

function gameTimer() {
  game_time = 61;
  game_timer = setInterval(() => {
    game_time = game_time - 1;
    game_time_value.innerText = ` ${game_time}초`;
    if (game_time === 0) {
      clearInterval(game_timer);
      gameOverModal();
      //restartGame();
    }
  }, 1000); //1초씩 감속
}

const resetModal = document.querySelector('.reset-modal');
const resetModalContent = document.querySelector('#reset-modal-content');
const resetOk = document.querySelector('#reset-ok');
const x = document.querySelector('#x');
const resetBtn = document.getElementById('card-game-reset');

resetBtn.addEventListener('click', () => {
  resetModal.style.display = 'block';
  resetModalContent.innerHTML = `
  <h2 id="reset_msg">다시 시작하실?</h2>
  `;
});

//리셋 버튼을 누르면 리로드
resetOk.addEventListener('click', () => {
  resetModal.style.display = 'none';
  location.reload();
});

//모달창 밖이나 엑스를 누르면 리셋모달창이 사라짐
resetModal.addEventListener('click', (e) => {
  if (e.target === resetModal || e.target === x) {
    resetModal.style.display = 'none';
  }
});

//게임 오버시 모달창을 보여줄 것
const finishModal = document.querySelector('.finish-modal');
const finishModalContent = document.querySelector('#finish-content');
const modalTime = document.querySelector('.modal-time');
const leftTime = document.querySelector('#time');
const closeModalBtn = document.querySelector('#close-modal');
const againBtn = document.querySelector('#card-again-btn');

//15초 이후에 자동으로 모달창을 닫는 함수
let closeModal_time = 0;
function closeModal() {
  closeModal_time = 15; //15초
  leftTime.innerText = closeModal_time;
  modal_close = setInterval(() => {
    leftTime.innerText = --closeModal_time;
    if (closeModal_time === 0) {
      clearInterval(modal_close);
      if ((clear = true)) {
        nextLevel();
      }
      finishModal.style.display = 'none';
      //restartGame();
    }
  }, 1000);
  //modal.style.display = 'none';
}

function gameOverModal() {
  finishModalContent.innerHTML = `
  <h2 id="cardGame_over">💥Game Over💥</h2>
  <div id="cardGame_text">
  <span id="cardGame_score">점수 : ${playerScore}</span>
  </div>
  `;
  closeModal();
  finishModal.style.display = 'block';
}

let clear = false;

function gameClearModal() {
  clear = true;
  console.log(clear);
  finishModalContent.innerHTML = `
  <h2 id="cardGame_clear">✨Game Clear✨</h2>
  <div id="cardGame_text">
  <span id="cardGame_score">점수 : ${playerScore}</span>
  </div>
  `;
  againBtn.innerText = '다음 레벨';
  closeModal();
  finishModal.style.display = 'block';
}

//모달창 밖이나 닫기를 누르면 게임오버 모달창이 사라짐
finishModal.addEventListener('click', (e) => {
  if (e.target === finishModal || e.target === closeModalBtn) {
    clearInterval(modal_close);
    finishModal.style.display = 'none';
    // location.reload();
    //restartGame();
  }
});

//다시하기 누르면 리로드
againBtn.addEventListener('click', () => {
  clearInterval(modal_close);
  finishModal.style.display = 'none';
  if (againBtn.innerText === '다음 레벨') {
    nextLevel();
  } else if (againBtn.innerText === '재도전') {
    restartGame();
  }
});

//카드 변수들
const cards = document.getElementsByClassName('cards')[0];
const card = document.getElementsByClassName('card');
const cardFront = document.getElementsByClassName('card__front');
const cardBack = document.getElementsByClassName('card__back');

//카드를 그리는 함수
function drawCard() {
  const card_img = [
    //카드에 넣을 이미지 배열
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  randomCard = card_img;
  randomCard.push(...randomCard); //2쌍씩
  shuffleCard(randomCard); //카드를 섞고
  randomCard.map((item, index) => {
    cards.innerHTML =
      cards.innerHTML +
      ` 
<div class="card" id=${index} data-img=${item}>
<div class="card__front" id=${item}.jpg></div>
<div class="card__back"></div>
</div>
`;
    cardFront[index].style.backgroundImage = `url('cardgame_img/${item}.png')`; //이미지 넣어줌
    //console.log(card[index]);
  });
  firstShowCard();
}

let firstCard = 0;
let secondCard = 0;

cards.addEventListener('click', (e) => {
  let targetCard = e.target;
  if (targetCard.parentNode.classList.contains('click')) {
    console.log('이미 클릭한 카드입니다.');
    return;
  }
  //카드를 선택했을때만 작동되도록
  if (targetCard.parentNode.className === 'card' && secondCard === 0) {
    targetCard.parentNode.classList.add('click');
    let targetCardId = targetCard.parentNode.id;
    openCard(targetCardId);
  }
});

//클릭시 카드가 뒤집히도록 만드는 함수
function openCard(id) {
  if (firstCard === 0) {
    firstCard = card[id];
  } else if (firstCard != 0 && secondCard === 0) {
    secondCard = card[id];
  }
  //카드 뒤집기 !!
  cardBack[id].style.transform = 'rotateY(180deg)';
  cardFront[id].style.transform = 'rotateY(360deg)';
  //카드가 맞는지 확인하기
  if (secondCard != 0) {
    console.log(firstCard, secondCard);
    matchCard(firstCard, secondCard);
  }
}

//카드 맞는지 확인
let matchArr = []; //맞춘 카드를 담아두는 배열
const score = document.getElementById('card_score_value');
//카드가 맞는지 확인하는 함수
function matchCard(first, second) {
  if (first.dataset.img === second.dataset.img) {
    console.log('성공');
    playerScore = playerScore + 10;
    score.innerText = playerScore;
    matchArr.push(first, second);
    console.log(matchArr);
    if (matchArr.length === 24) {
      console.log('스테이지 완료');
      clearInterval(game_timer);
      stage = stage + 1;
      gameClearModal();
    }
  } else {
    console.log('실패');
    setTimeout(() => {
      first.animate(keyframes, options);
      second.animate(keyframes, options);
    }, 1000);
    setTimeout(() => {
      first.childNodes[1].style.transform = 'rotateY(180deg)';
      first.childNodes[3].style.transform = 'rotateY(360deg)';
      second.childNodes[1].style.transform = 'rotateY(180deg)';
      second.childNodes[3].style.transform = 'rotateY(360deg)';
      first.classList.toggle('click');
      second.classList.toggle('click');
    }, 1500);
  }
  firstCard = 0;
  secondCard = 0;
}

//처음 실행시에 카드를 전체적으로 보여주는 함수
function firstShowCard() {
  let cnt = 0;
  const showInterval = setInterval(() => {
    if (cnt === GAME_SIZE - 1) {
      clearInterval(showInterval);
      setTimeout(() => {
        closeCard();
      }, 3000);
    }
    console.log(cnt);
    cardBack[cnt].style.transform = 'rotateY(180deg)';
    cardFront[cnt].style.transform = 'rotateY(360deg)';
    ++cnt;
  }, 350);
}

//카드를 다시 닫는 함수
function closeCard() {
  for (let i = 0; i < GAME_SIZE; i++) {
    cardBack[i].style.transform = 'rotateY(360deg)';
    cardFront[i].style.transform = 'rotateY(180deg)';
  }
  gameTimer();
}

let keyframes = [
  { transform: 'rotate(3deg)' },
  { transform: 'rotate(-3deg)' },
  { transform: 'rotate(5deg)' },
  { transform: 'rotate(-5deg)' },
];
let options = {
  duration: 300,
  easing: 'ease-in',
};

//함수가 자동으로 실행되도록
window.onload = function () {
  drawCard();
};
