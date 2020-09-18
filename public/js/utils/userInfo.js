const container = document.querySelector('.user__information');
export const burgerBtn = document.querySelector('.hamburger');
export const mainMenu = document.querySelector('.main__menu');
const contentContainer = document.querySelector('.content');
const span = document.querySelectorAll('.menu__span');

const changeUserInfoPosition = () => {
  if (mainMenu.classList.contains('small')) {
    container.style = 'margin-left: 50px';
  } else {
    container.style = 'margin-left: 200px';
  }
};

export const addLeftArrow = () => {
  burgerBtn.classList.add('left');
};
export const removeLeftArrow = () => {
  burgerBtn.classList.remove('left');
};

export const addRightArrow = () => {
  burgerBtn.classList.add('right');
};
export const removeRightArrow = () => {
  burgerBtn.classList.remove('right');
};

export const mainMenuAnimation = () => {
  if (!mainMenu.classList.contains('small')) {
    mainMenu.classList.add('small');
    mainMenu.style = 'width: 50px';
    contentContainer.style = 'width: 95%; margin-left:50px';
    span.forEach((el) => (el.style = 'display: none'));
    removeLeftArrow();
    changeUserInfoPosition()
  } else {
    mainMenu.style = 'width: 200px';
    contentContainer.style = 'width: 85%; margin-left:200px';
    mainMenu.classList.remove('small');
    span.forEach((el) => (el.style = 'display: flex'));
    removeRightArrow();
    changeUserInfoPosition()
  }
};
