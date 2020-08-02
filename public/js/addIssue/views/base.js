export const values = {
    type: document.querySelector('.issue__type--select'),
    name: document.querySelector('.issue__subject--input'),
    description: document.querySelector('.issue__description--input'),
    priority: document.querySelector('.issue__priority--select'),
    dueDate: document.querySelector('.issue__duedate'),
    asignee: document.querySelector('.asignee__select'),
    category: document.querySelector('.category__select'),
    version: document.querySelector('.version__select')
};

export const elements = {
    previewContainer: document.querySelector('.preview__container'),
    addIssueContainer: document.querySelector('.issue__container'), 

    addButton: document.querySelectorAll('.issue__add'),
    previewButton: document.querySelectorAll('.issue__preview'),
    backButton: document.querySelectorAll('.back__btn')
};

export const modal = {
    category: document.querySelector('.modal__category'),
    version: document.querySelector('.modal__version'),
    categoryCloseBtn: document.querySelector('.modal__category--close'),
    versionCloseBtn: document.querySelector('.modal__version--close'),
    categoryAddBtn: document.querySelector('.modal__category--button'),
    versionAddBtn: document.querySelector('.modal__version--button'),

    asigneeModalBtn: document.querySelector('.asignee__modal--btn'),
    categoryModalBtn: document.querySelector('.category__modal--btn'),
    versionModalBtn: document.querySelector('.version__modal--btn'),

    categoryInput : document.querySelector('.modal__category--input'),
    versionInput : document.querySelector('modal__version--input'),
}

export const preview = {
    name: document.querySelector('.preview__name--name'),
    description: document.querySelector('.preview__description--value'),
    type: document.querySelector('.status__container--type'),
    priority: document.querySelector('.status__container--priority'),
    duedate: document.querySelector('.status__container--duedate'),
    asignee: document.querySelector('.status__container--asignee'),    
    category: document.querySelector('.status__container--category'),    
    version: document.querySelector('.status__container--version'),    
}
