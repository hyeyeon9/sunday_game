const btn = document.querySelector('#intro_button');
const mainPage = document.querySelector('.main-page');
const introTitle = document.querySelector('.intro_game-title');

btn.addEventListener('click', () => {
  mainPage.scrollIntoView({ behavior: 'smooth' });
});

introTitle.addEventListener('click', () => {
  mainPage.scrollIntoView({ behavior: 'smooth' });
});
