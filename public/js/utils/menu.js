export const menuArr = document.querySelectorAll('.link');

export const addWhite = (el) => {
  if (el.classList.contains('active')) return;
  const set = el.dataset.menu;
  const list = document.querySelector(`.${set}__sprite`);
  list.style = `background: url('/img/sprites/${set}-white.png') no-repeat; background-size: 35px 35px;`;
};
export const addColor = (el) => {  
  const set = el.dataset.menu;
  const list = document.querySelector(`.${set}__sprite`);
  list.style = `background: url('/img/sprites/${set}-color.png') no-repeat; background-size: 35px 35px;`;
};

export const load = (el) => { 
  if (el.classList.contains('active')) {
    addColor(el);
  } else {
    addWhite(el);
  }
};
