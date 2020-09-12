import '@babel/polyfill';
import { menuSearch } from '../issues/models/Search';

import { comment, issue } from './views/base';
import {
  showMenu,
  hideMenu,
  removeComment,
  textArea,
  cancelUpdate,
  insertCommentUI,
} from './views/commentView';
import * as editorView from './views/editorView';
import {
  updateComment,
  deleteComment,
  updateIssue,
  addComment,
} from './models/UpdateAndDelete';
import { button, logout } from '../utils/logout';
import { showContainer, hideContainer } from '../utils/userInfo';

button.addEventListener('click', logout);

window.addEventListener('mouseover', (e) => {
  if (
    e.target.classList.contains('user__information') ||
    e.target.parentNode.classList.contains('user__information') ||
    e.target.parentNode.parentNode.classList.contains('user__information') ||
    e.target.parentNode.parentNode.parentNode.classList.contains(
      'user__information'
    ) ||
    e.target.parentNode.parentNode.parentNode.parentNode.classList.contains(
      'user__information'
    ) ||
    e.target.classList.contains('user__name')
  ) {
    showContainer();
  } else {
    hideContainer();
  }
});

comment.actionButton.forEach((el) =>
  el.addEventListener('click', () => {
    const menuContainer = el.parentNode;
    const commentContainer = menuContainer.parentNode.parentNode;
    const commentData = commentContainer.querySelector('.comment__data');

    const menu = menuContainer.childNodes[1];
    const updateButton = menu.querySelector('.comment__action--edit');
    const deleteButton = menu.querySelector('.comment__action--delete');

    if (!menu.classList.contains('menu')) {
      //Show the menu
      showMenu(menu);

      //Update Comment
      updateButton.addEventListener('click', async () => {
        //Insert text area
        textArea(commentData, commentData.childNodes[0].textContent);
        hideMenu(menu);

        //Create variables
        const cancelBtn = commentData.querySelector('.comment__cancel');
        const submitBtn = commentData.querySelector('.comment__submit');
        const editedText = commentData.querySelector('.comment__edit--value');
        console.log(editedText.value);

        cancelBtn.addEventListener('click', () => {
          cancelUpdate(commentData, editedText.value);
        });

        submitBtn.addEventListener('click', async () => {
          try {
            const trigger = await updateComment(
              commentContainer.dataset.id,
              editedText.value
            );
            if (trigger) cancelUpdate(commentData, editedText.value);
          } catch (err) {
            console.log(err);
          }
        });
      });

      //Delete comment
      deleteButton.addEventListener('click', async (e) => {
        try {
          const trigger = await deleteComment(commentContainer.dataset.id);
          if (trigger) {
            hideMenu(menu);
            removeComment(commentContainer);
          }
        } catch (err) {
          console.log(err);
        }
      });
    } else {
      hideMenu(menu);
    }
  })
);

comment.showEditor.addEventListener('click', () => {
  editorView.showEditor();

  comment.hideEditor.addEventListener('click', editorView.hideEditor);

  //Status Menu
  editorMenus(
    comment.statusMenuBtn,
    comment.statusMenu,
    comment.arrowThree,
    comment.statusMenuList
  );
  //Asignee Menu
  editorMenus(
    comment.asigneeMenuBtn,
    comment.asigneeMenu,
    comment.arrowFour,
    comment.asigneeMenuList
  );
  //Search in asignee menu
  comment.asigneeSearchValue.addEventListener('keyup', () => {
    const menu = menuSearch(
      comment.asigneeSearchValue.value,
      comment.asigneeMenuListItems
    );
    editorView.renderMenu(menu, comment.asigneeMenuList);
  });

  //Update the issue
  comment.updateIssue.addEventListener('click', async () => {
    const obj = {};
    const status = comment.statusMenuBtn.childNodes[0].textContent.toLowerCase();
    const asignee = comment.asigneeMenuBtn.childNodes[0].textContent;
    const dueDate = comment.dueDateValue.value;
    if (status && status !== issue.status) obj.status = status;
    if (asignee && asignee !== issue.asignee) obj.asignee = asignee;
    if (dueDate && dueDate !== issue.dueDate) obj.dueDate = dueDate;
    try {
      const trigger = await updateIssue(obj);
      if (trigger) {
        editorView.hideEditor();
        editorView.updateIssue();
      }
    } catch (err) {}
  });

  //Add comment
  comment.addComment.addEventListener('click', async () => {
    const text = comment.commentValue.value;
    try {
      const com = await addComment(text);
      insertCommentUI(com.data.data);
      console.log(com);
    } catch (err) {
      console.log(err);
    }
  });
});

const editorMenus = (button, menu, arrow, updateValue) => {
  button.addEventListener('click', () => {
    if (!menu.classList.contains('show')) {
      editorView.showMenu(menu, arrow);
    } else {
      editorView.hideMenu(menu, arrow);
    }
    updateValue.addEventListener('click', (e) => {
      editorView.updateValue(button.childNodes[0], e);
      editorView.hideMenu(menu, arrow);
    });
  });
};
