import '@babel/polyfill';
import { values, elements, modal } from './views/base';
import { createPreview, hidePreview } from './views/previewView';

import { addIssue, addCategory, addVersion } from './models/Post';
import { button, logut } from '../utils/logout';
import * as MenuElm from '../utils/userInfo';
import { menuArr, addWhite, addColor, load } from '../utils/menu';

button.addEventListener('click', logut);

window.addEventListener('mouseover', (e) => {
  if (!MenuElm.mainMenu.classList.contains('small')) {
    if (
      e.target.classList.contains('hamburger__menu--container') ||
      e.target.classList.contains('hamburger') ||
      e.target.classList.contains('hamburger-box') ||
      e.target.classList.contains('hamburger-inner')
    ) {
      MenuElm.addLeftArrow();
      MenuElm.removeRightArrow();
    } else {
      MenuElm.removeLeftArrow();
    }
  } else if (MenuElm.mainMenu.classList.contains('small')) {
    if (
      e.target.classList.contains('hamburger__menu--container') ||
      e.target.classList.contains('hamburger') ||
      e.target.classList.contains('hamburger-box') ||
      e.target.classList.contains('hamburger-inner')
    ) {
      MenuElm.addRightArrow();
      MenuElm.removeLeftArrow();
    } else {
      MenuElm.removeRightArrow();
    }
  }
});

MenuElm.burgerBtn.addEventListener('click', MenuElm.mainMenuAnimation);

menuArr.forEach((el) => {
  el.addEventListener('mouseover', () => {
    addColor(el);
  });
});
menuArr.forEach((el) =>
  el.addEventListener('mouseout', () => {
    addWhite(el);
  })
);
menuArr.forEach((el) => load(el));

//Add Issue to the database
elements.addButton.forEach((el) =>
  el.addEventListener('click', () => {
    addIssue(
      values.name.value,
      values.description.value,
      values.type.value,
      values.category.value,
      values.version.value,
      values.priority.value,
      values.asignee.value,
      values.dueDate.value
    );
  })
);

//Modal options
[modal.categoryModalBtn, modal.versionModalBtn].forEach((el) => {
  el.addEventListener('click', () => {
    const select = el.className.split('__')[0];
    modal[select].style = 'display: block';
  });
});
modal.asigneeModalBtn.addEventListener('click', () => {
  values.asignee.value = modal.asigneeModalBtn.dataset.user;
});

modal.categoryAddBtn.addEventListener('click', async (e) => {
  // e.preventDefault();
  try {
    await addCategory(modal.categoryInput.value);
    modal.categoryInput.value = '';
    modal.category.style = 'display:none';
  } catch (err) {}
});
modal.versionAddBtn.addEventListener('click', () => {
  addVersion(modal.versionInput.value);
});

window.addEventListener('click', (e) => {
  [
    modal.category,
    modal.version,
    modal.categoryCloseBtn,
    modal.versionCloseBtn,
  ].forEach((el) => {
    if (e.target.matches(`.${el.className}`)) {
      const select = el.className.split('--')[0].split('__')[1];
      modal[select].style = 'display: none';
    }
  });
});

elements.previewButton.forEach((el) =>
  el.addEventListener('click', () => {
    createPreview(
      values.name.value,
      values.description.value,
      values.type.value,
      values.priority.value,
      values.dueDate.value,
      values.asignee.value,
      values.category.value,
      values.version.value
    );
  })
);

elements.backButton.forEach((el) =>
  el.addEventListener('click', () => {
    hidePreview();
  })
);
