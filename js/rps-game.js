const pc_img = document.querySelector('#pc_img');
const player_img = document.querySelector('#player_img');
const scissors = document.querySelector('#scissors');
const paper = document.querySelector('#paper');
const rock = document.querySelector('#rock');

const reset = document.querySelector('#reset');

const player_button = document.querySelector('.player_button');
const heart = document.querySelector('#heart');
const gameRound = document.querySelector('#round');

let round = 1; //게임 라운드
let life = 3; // 기본생명 3개
let speed = 490; // 0.5초
let maxSpeed = 90;
let playerScore = 0; //플레이어 점수
let pcPlayerSelection = 0; // pc 디폴트 선택 값
let playerSelection = 0;
let interval = 0;

// Pc 선택에 따른 이미지 변화 / PC 플레이어의 선택
function changePcPlayer() {
  pcPlayerSelection = Math.floor(Math.random() * 3 + 1);

  //가위
  if (pcPlayerSelection == 1) {
    pc_img.src = 'img/scissor.png';
  }
  //바위
  else if (pcPlayerSelection == 2) {
    pc_img.src = 'img/rock.png';
  }
  //보
  else if (pcPlayerSelection == 3) {
    pc_img.src = 'img/paper.png';
  }
}

// 플레이어 선택 계산하는 함수
player_button.addEventListener('click', function (e) {
  if (e.target.value == '가위') {
    playerSelection = 1;
    player_img.src = 'img/scissor.png';
  } else if (e.target.value == '바위') {
    playerSelection = 2;
    player_img.src = 'img/rock.png';
  } else if (e.target.value == '보') {
    playerSelection = 3;
    player_img.src = 'img/paper.png';
  }
  rockPaperScissor(playerSelection);
});

// 가위바위보 메인 함수
function rockPaperScissor(playerSelection) {
  //인터벌 멈춤
  clearInterval(interval);
  //가위바위보 결과 받아오기
  let result = rockPaperScissorResult();

  //결과 모달창에 띄우기
  if (life > 0) {
    ++round;
    paintResult(result, playerSelection, pcPlayerSelection);
  } 
  else{
    //게임 종료 모달창 띄우기
    paintFinalResult(result, playerSelection, pcPlayerSelection);
  }

  if (life === 0) {
    initGame();
  }

  //있으면 다음 라운드로 들어가서 게임 재시작
  closeModal();
}

//가위바위보 결과 계산
function rockPaperScissorResult() {
  let result = playerSelection - pcPlayerSelection;
  if (result == 0) {
    return 0;
  } else if (result == 1 || result == -2) {
    playerScore = playerScore + 10; //이기면 10점추가
    heart.innerText = `${++life}`;
    if (speed > maxSpeed) {
      speed = speed - 30; //승리시에만 속도 올라감
    }
    console.log(speed);
    return 1;
  } else if (result == 2 || result == -1) {
    heart.innerText = `${--life}`;
    console.log(speed);
    //playerScore = playerScore - 5; //지면 -5점
    return 2;
  }
}

const modal = document.querySelector('#rps-modal');
const modal_content = document.querySelector('#rps-modal');
const modal_closeBtn = document.querySelector('#close-modal');
const modal_text = document.querySelector('.modal-text');

//모달창 닫기 버튼이나, 모달창 바깥부분을 클릭하면 모달창이 닫힘
modal.addEventListener('click', (e) => {
  const target = e.target;
  if (target === modal || target === modal_closeBtn) {
    modal.style.display = 'none';
    restartGame();
  }
});

//결과를 모달창에 그리는 함수
function paintResult(result, player, pc) {
  //무승부 0 승리 1 패배 2
  // 가위 1 바위 2 보 3
  const rpsResult = ['무승부', '승리', '패배'];
  const lifeImg = ['🍀', '❤', '💔'];
  const rpsImg = ['✌', '✊', '✋'];
  modal_text.innerHTML = `
  <h1 id="rps_score">${lifeImg[result]} ${rpsResult[result]}! ${
    lifeImg[result]
  }</h1>
   <h2 class="rps_result">Score : ${playerScore}점</h2>
   <p class="rps_result_txt"> 
   pc : ${rpsImg[--pc]} </br>
  player : ${rpsImg[--player]}
  </p>
  <span id="life">남은 생명: ${life}</span>
  `;
  //생명이 없을때 다시하기 버튼이 나타남
  modal.style.display = 'block';
}

//게임 종료 모달창
function paintFinalResult() {
  time=100000000;
  again_btn.style.display = 'block'; // 다시하기 버튼
  modal_text.className= "game_over_modal";
  modal_text.innerHTML = `
  <h1 id="game_over"> 💥게임 오버💥</h1>
  <div id="rps_final-result">
  <span id ="final-result__score">점수 : ${playerScore}점 !! </span>
  <span id ="final-result__round">최종 라운드 : ${round}round</span>
  </div>
 `;
 modal.style.display = 'block';
}

let time = 5; // 모달창 시간
const modal_time = document.querySelector('#time');
let modal_close = 0;

//모달창 자동 닫히게 하는 함수
function closeModal() {
  modal_time.innerText = time;
  modal_close = setInterval(function () {
    modal_time.innerText = --time; //1초씩 마이너스
    if (time === 0) {
      // 0초가 되면 모달창 숨김
      modal.style.display = 'none';
      restartGame();
    }
  }, 1000);
}

//게임 다시 시작하는 함수
function restartGame() {
  clearInterval(modal_close); //모달창 타이머 끄기
  time = 5; //초기화 해주기
  gameRound.innerText = round; //다음 라운드로 바꾸고
  //스피드 조절하기
  heart.innerText = life;
  interval = setInterval(changePcPlayer, speed);
}

const again_btn = document.querySelector('#again-btn');
const modal_btn = document.querySelector('.rps-modal-btn');

// 게임 초기화 함수
function initGame() {
  speed = 490; //속도
  life = 3; //생명
  round = 1; //라운드
  playerScore = 0;
}

again_btn.addEventListener('click', () => {
  modal.style.display = 'none';
  initGame();
  console.log(life);
  restartGame();
});

//게임 새로시작
reset.addEventListener('click', function () {
  gameReset();
  // let check = confirm('다시 시작하시겠습니까?');
  // if (check) {
  //   location.reload();
  // }
});



const x = document.querySelector("#x");
const resetModal = document.querySelector('.reset-modal');
const resetModalContent = document.querySelector('#reset-modal-content');
const resetOk = document.querySelector('#reset-ok');
function gameReset() {
  resetModal.style.display = 'block';
  resetModalContent.innerHTML = `
  <h2>다시 시작하시겠습니까?</h2>
  `;
  resetOk.addEventListener("click",()=>{
    resetModal.style.display = 'none';
    location.reload();
  })
}

resetModal.addEventListener('click', (e) => {
  const target = e.target;
  if (target === resetModal || target === x) {
    resetModal.style.display = 'none';
    location.reload();
  }
});

//페이지에 자동으로 그려짐
window.onload = function () {
  interval = setInterval(changePcPlayer, speed);
  heart.innerText = life;
  gameRound.innerText = round;
};
