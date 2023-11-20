const btn = document.querySelector('#intro_button');
const mainPage = document.querySelector('.main-page');
const introPage = document.querySelector('.intro');
const introTitle = document.querySelector('.intro_game-title');
const mainBtn = document.querySelector('#main_button');

btn.addEventListener('click', () => {
  mainPage.scrollIntoView({ behavior: 'smooth' });
});

introTitle.addEventListener('click', () => {
  mainPage.scrollIntoView({ behavior: 'smooth' });
});

mainBtn.addEventListener('click', () => {
  introPage.scrollIntoView({ behavior: 'smooth' });
});
