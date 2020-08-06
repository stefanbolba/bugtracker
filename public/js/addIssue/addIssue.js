import '@babel/polyfill';
import { values, elements, modal } from './views/base';
import { createPreview, hidePreview } from './views/previewView';

import { addIssue, addCategory, addVersion } from './models/Post';
import { button, logut } from '../utils/logout';

button.addEventListener('click', logut);

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
