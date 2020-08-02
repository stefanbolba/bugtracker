import { filter } from './base';

export const renderMenu = (arr, menu) => {
  menu.innerHTML = '';
  arr.forEach((el) => {
    const markup = `<li>${el}</li>`;
    menu.insertAdjacentHTML('beforeend', markup);
  });

  if (arr.length === 0) {
    const markup = `
    <p>Try another value</p>
    `;
    menu.insertAdjacentHTML('beforeend', markup);
  }
};

export const addActiveFromParams = () => {
  let params = window.location.search.substr(1).split('&');

  params.forEach((el) => {
    if (!el) return;
    const arr = el.split('=');

    if (
      arr[0] === 'sort' ||
      arr[0] === 'fields' ||
      arr[0] === 'limit' ||
      arr[0] === 'page'
    )
      return;

    if (arr[0] === 'status') {      
      const menu = filter[arr[0]].querySelectorAll('div');
      menu.forEach((div) => {
        if (
          div.textContent.toLowerCase() ===
          (arr[1] === 'in%20progress' ? 'in progress' : arr[1])
        ) {
          div.classList.add('filter__active');
        } else {
          div.classList.remove('filter__active');
        }
      });
    } else {
      const span = filter[arr[0]].querySelector(`.${arr[0]}__value`);
      const menu = filter[arr[0]].querySelectorAll(`li`);
      menu.forEach((li) => {
        if (li.textContent === arr[1]) {
          span.textContent = li.textContent;
          li.classList.add('active__menu');
        } else {
          li.classList.remove('active__menu');
        }
      });
    }
  });
};

export const addArrow = () => {
  let params = window.location.search.substr(1).split('&');

  params.forEach((el) => {
    if (!el) return;
    const arr = el.split('=');
    if (arr[0] !== 'sort') return;    

    const menu = filter[arr[0]].querySelectorAll('div');
    menu.forEach((div) => {
      let markup;
      if (div.dataset.prop === arr[1].replace('-', '')) {
        if (arr[1].startsWith('-')) {
          markup = `<div class="arrow-up-three arrow-up__active "></div>`;
          div.classList.add('up');
        } else {
          markup = `<div class="arrow-down-three arrow-down__active "></div>`;
          div.classList.add('down');
        }
        div.insertAdjacentHTML('beforeend', markup);
      }
    });
  });
};
