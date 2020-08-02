import { comment, issue } from './base';

export const showEditor = () => {
  comment.commentEditor.style = 'display: flex';
  comment.showEditor.style = 'display: none';
};
export const hideEditor = () => {
  comment.commentEditor.style = 'display: none';
  comment.showEditor.style = 'display: flex';
};

export const showMenu = (el, arrow) => {
  el.style = 'display: block;';
  el.classList.add('show');
  arrow.classList.add('arrow-down__active');
};
export const hideMenu = (el, arrow) => {
  el.style = 'display:none';
  el.classList.remove('show');
  arrow.classList.remove('arrow-down__active');
};
export const updateValue = (el, e) => {
  el.innerText = e.target.innerText;
};

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

export const updateIssue = (status, asignee, dueDate) => {
  issue.status = status;
  issue.asignee = asignee;
  issue.dueDate = dueDate;
};
