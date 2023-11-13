const btn = document.querySelector("#intro_button");
const mainPage = document.querySelector('.main-page');

btn.addEventListener('click', () => {
    mainPage.scrollIntoView({behavior:'smooth'});
})