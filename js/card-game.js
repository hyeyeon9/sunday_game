const color = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'tomato',
  'purple',
  'pink',
]; //일단 8개

// //플래그 생성
// let click = false; // 클릭 플래그
// let match = false; //매치 플래그

//색상 2쌍을 저장하는 배열
let RandomColor = color;
RandomColor.push(...color); //카드는 2쌍씩

//셔플 함수
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
//색상을 셔플로 섞음
shuffle(RandomColor);

//카드 그리기
const cardContainer = document.querySelector('.card_main-container');
const cards = document.getElementsByClassName('card');
function drawCard() {
  let newElements = ``;
  RandomColor.map((item, index) => {
    newElements += `<div class="card" id=${item}></div>`;
    if (index % 4 === 3) {
      newElements += `<br>`;
    }
  });
  cardContainer.innerHTML = newElements;
  paintCard();
}

function paintCard() {
  for (let i = 0; i < 16; i++) {
    cards[i].style.backgroundColor = `${cards[i].id}`;
  }
}

cardContainer.addEventListener('click', (e) => {
  let target = e.target;
  console.log(target);
  if (target.classList.contains('click')) {
    console.log('이미 선택한 카드 입니다!!');
  } else {
    e.target.classList.toggle(`click`);
  }
});

window.onload = function () {
  drawCard();
};
