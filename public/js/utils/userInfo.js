const container = document.querySelector('.user__information');
export const burgerBtn = document.querySelector('.hamburger');
export const mainMenu = document.querySelector('.main__menu');
const contentContainer = document.querySelector('.content')

export const showContainer = () => {
  container.style = 'display: flex';
};
export const hideContainer = () => {
  container.style = 'display: none';
};

export const addLeftArrow = () => {
  burgerBtn.classList.add('left');
};
export const removeLeftArrow = () => {
  burgerBtn.classList.remove('left');
};

export const addRightArrow = () => {
  burgerBtn.classList.add('right')
}
export const removeRightArrow = () => {
  burgerBtn.classList.remove('right')
}

export const mainMenuAnimation = () => {
  if(!mainMenu.classList.contains('small')) {
    mainMenu.classList.add('small')
    mainMenu.style = 'width: 50px';
    contentContainer.style = 'width: 95%; margin-left:50px';
    removeLeftArrow()
  } else {
    mainMenu.style = 'width: 200px';
    contentContainer.style = 'width: 85%; margin-left:200px';
    mainMenu.classList.remove('small')
    removeRightArrow()
  }
}