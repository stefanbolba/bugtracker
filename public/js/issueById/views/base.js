export const comment = {
  actionButton: document.querySelectorAll('.comment__action--button'),
  commentNumber: document.querySelector('.comment__number'),

  showEditor: document.querySelector('.comment__editor--show'),
  hideEditor: document.querySelector('.cancel__btn'),
  commentEditor: document.querySelector('.comment__editor'),
  statusMenuBtn: document.querySelector('.status__comment--button'),
  statusMenu: document.querySelector('.status__comment--menu'),
  statusMenuList: document.querySelector('.status__comment--list'),
  statusValue: document.querySelector('.status__comment--value'),
  arrowThree: document.querySelector('.arrow-down-three'),

  asigneeMenuBtn: document.querySelector('.asignee__comment--button'),
  asigneeMenu: document.querySelector('.asignee__comment--menu'),
  asigneeMenuList: document.querySelector('.asignee__comment--list'),
  asigneeMenuListItems: document.querySelectorAll('.asignee__comment--list li'),
  asigneeValue: document.querySelector('.asignee__button--value'),
  arrowFour: document.querySelector('.arrow-down-four'),
  asigneeSearchValue: document.querySelector('.asignee__value'),

  dueDateValue: document.querySelector('.comment__duedate--value'),

  updateIssue: document.querySelector('.save--change__btn'),
  addComment: document.querySelector('.add--comment__btn'),
  commentValue: document.querySelector('.comment__editor--value'),
};

export const issue = {
  status: document.querySelector('.status__preview--value'),
  asignee: document.querySelector('.asignee__preview--value'),
  dueDate: document.querySelector('.duedate__preview--value'),
};
