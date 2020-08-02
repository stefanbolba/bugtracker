export const issuesElm = {
  categoryBtn: document.querySelector('.category__button'),
  categoryMenu: document.querySelector('.category__menu'),
  categoryValue: document.querySelector('.category__value'),
  asigneeBtn: document.querySelector('.asignee__button'),
  asigneeMenu: document.querySelector('.asignee__menu'),
  asigneeValue: document.querySelector('.asignee__value'),
  arrowOne: document.querySelector('.arrow-down-one'),
  arrowTwo: document.querySelector('.arrow-down-two'),

  resultContainer: document.querySelector('.result__entry'),
  resultProperties: document.querySelector('.result__properties'),

  optionsModal: document.querySelector('.options__modal'),
  optionsBtn: document.querySelectorAll('.options__button'),
  optionsCloseBtn: document.querySelector('.options__modal--closeBtn'),
  resultsContainer: document.querySelector('.result__container'),
  displaySettingContainer: document.querySelector('.display__settings'),

  modalFieldsList: document.querySelectorAll('.input__checkbox'),
  modalLimitItemsList: document.querySelectorAll('.input__radio'),

  issuesPropertiesList: document.querySelectorAll('.issue__properties'),
};

export const filter = {
  category: document.querySelector('.search__category'),
  asignee: document.querySelector('.search__asignee'),
  status: document.querySelector('.filter__status'),
  sort: document.querySelector('.result__properties'),

  categoryContainer: document.querySelector('.category__list'),
  categoryList: document.querySelectorAll('.category__list li'),
  asigneeContainer: document.querySelector('.asignee__list'),
  asigneeList: document.querySelectorAll('.asignee__list li'),

  statusList: document.querySelectorAll('.filter__status div'),
  sortList: document.querySelectorAll('.result__properties div'),
};
filter.categoryInputText = filter.category.querySelector('.category__input');
filter.asigneeInputText = filter.asignee.querySelector('.asignee__input');

export const page = {
  buttonsContainer: document.querySelectorAll('.page__control--buttons'),
};
