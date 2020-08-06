import { timeline, status } from './base';

const showDate = (date) => {
  const arr = `${new Date(date)}`.split(' ');
  return `${arr[2]} ${arr[1]}, ${arr[3]}`;
};

const splitDate = (date) => {
  const arr = date.replace('T', '-').split('-');
  return `${arr[2]}-${arr[1]}-${arr[0]}`;
};

export const displayTimeline = (state) => {
  timeline.timelineSection.innerHTML = '';

  state.forEach((el) => {
    const markupOne = `
    <div class="timeline__entry" data-date="${splitDate(el.createdAt)}">
        <div class="timeline__date">
            <h4 class="timeline__date--value">${showDate(
              el.createdAt
            )}</h4>                    
    </div>`;
    const markupTwo = `
    <div class="timeline__content expand" data-id="${el.id}">
        <img class="user__icon" src="/img/users/${
          el.user.photo
        }" alt='User photo'>          
        <div class="timeline__content--entry">
            <div class="entry__type">
                <span class="entry__user">${el.user.name || 'Undefined'}</span>
                <span> added a new</span>
                <span class="entry__type--value">${el.type}</span>
            </div>
            <div class="entry__subject">
                <span class="entry__subject--value">${el.description}</span>
                <div class="entry__comment">
                    <button class="add--comment" title="Add Comment">...</button>                               
                </div>
            </div>
            <div class="comment__data">
            </div>
            <button class="expand__comments">
                <h4>Entry has <span class="comment--number">(${
                  !el.comments ? '0' : el.comments.length
                })</span> comments</h4>
                <span id="expand" class="expand--symbol">></span>
            </button>
            <div class="comment__container"></div>
        </div>                                               
    </div>
    `;

    if (
      !timeline.timelineSection.querySelector(
        `[data-date="${splitDate(el.createdAt)}"]`
      )
    ) {
      timeline.timelineSection.insertAdjacentHTML('beforeend', markupOne);
    }
    const entry = timeline.timelineSection.querySelector(
      `[data-date="${splitDate(el.createdAt)}"]`
    );
    entry.insertAdjacentHTML('beforeend', markupTwo);
  });
};

export const showComments = (state, id, container, button) => {
  state.forEach((el) => {
    if (el.id === id) {
      if (!el.comments) return;
      container.innerHTML = '';

      el.comments.forEach((com) => {
        const markup = `
              <div class="comment__list--item">
                  <div class="comment--content">
                      <span>${com.user.name}</span>
                      <span>${splitDate(com.createdAt)}</span>
                  </div>
                  <div class="comment--data">
                      <p class="comment--text">${com.comment}</p>
                  </div>
              </div>                       
              `;
        container.insertAdjacentHTML('beforeend', markup);
      });
      //Change the direction of the expand button
      button.classList.remove('expand--symbol');
      button.classList.add('contract--symbol');
    }
  });
};
export const hideComments = (container, button) => {
  container.innerHTML = '';
  button.classList.add('expand--symbol');
  button.classList.remove('contract--symbol');
};

export const textArea = (state, id, container) => {
  state.forEach((el) => {
    if (el.id === id) {
      const markup = `                                               
              <div class="comment__data--edit">                                        
                  <textarea class="comment__edit--value"></textarea>
                  <div class="comment__edit--buttons">
                      <button class="comment__cancel">Cancel</button>
                      <button class="comment__submit">Submit</button>
                  </div>
              </div>            
          `;
      container.innerHTML = '';
      container.insertAdjacentHTML('beforeend', markup);
    }
  });
};
export const cancelArea = (container) => {
  container.innerHTML = '';
};

export const clearArea = (textArea) => {
  textArea.value = '';
};

export const commentLength = (state, id, text) => {
  text.innerText = '';
  state.forEach((el) => {
    if (el.id === id) {
      text.innerText = `(${el.comments.length})`;
    }
  });
};

export const hideContent = (content, date) => {  
  content.forEach((el) => {
    el.classList.add('shrink__content');
    el.classList.remove('timeline__content');
    date.style = 'background-color:  rgb(214, 212, 212)';
    setTimeout(() => {
      el.style = 'display: none';
    }, 600);
  });
};
export const showContent = (content, date) => {
  content.forEach((el) => {
    el.classList.remove('shrink__content');
    el.classList.add('timeline__content');
    date.removeAttribute('style');
    el.style = 'display: grid';
  });
};
