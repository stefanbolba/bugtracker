import { comment } from './base';

export const showMenu = (menu) => {
  menu.style = 'display: block';
  menu.classList.add('menu');
};

export const hideMenu = (menu) => {
  menu.style = 'display: none';
  menu.classList.remove('menu');
};

export const removeComment = (el) => {
  el.remove();  
  comment.commentNumber.textContent = `(${
    comment.commentNumber.textContent.split('')[1] * 1 - 1
  })`;
};

export const textArea = (container, text) => {
  const markup = `
                  <div class="comment__data--edit">
                      <p>Edit Comment</p>
                      <textarea class="comment__edit--value">${text}</textarea>
                      <div class="comment__edit--buttons">
                          <button class="comment__cancel">Cancel</button>
                          <button class="comment__submit">Submit</button>
                      </div>
                  </div>
                  `;

  container.innerHTML = '';
  container.insertAdjacentHTML('beforeend', markup);
};

export const cancelUpdate = (container, text) => {
  const markup = `
  <p class="comment__text">${text}</p>
`;
  container.innerHTML = '';
  container.insertAdjacentHTML('beforeend', markup);
};
