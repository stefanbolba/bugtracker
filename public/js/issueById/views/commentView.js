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

export const insertCommentUI = (com) => {
  let markupComment = `
                <div class="comment__list--item" data-id="${com.id}">
                    <div class="comment__content">
                        <img class="user__image--comment" src="/img/users/default.png">
                        <div class="user__info-comment">
                            <span class="user__name--comment">${
                              comment.userName
                            }</span>
                            <span class="comment__date">${splitDate(
                              com.createdAt
                            )}</span>
                        </div>
                        <div class="comment__action">
                            <button class="comment__action--button">...</button>
                            <div class="comment__action--menu" style="display: none">
                                <ul class="comment__action--list">
                                    <li class="comment__action--edit">Edit Comment</li>
                                    <li class=comment__action--delete>Delete</li>
                                </ul>
                        </div>
                    </div>
                    </div>                    
                    <div class="comment__data">
                        <p class="comment__text">${
                          com.comment
                        }</p>                        
                    </div>                            
                </div>
                `;
  comment.commentContainer.insertAdjacentHTML('beforeend', markupComment);
};

const splitDate = (data) => {
  const date = new Date(data);  
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
