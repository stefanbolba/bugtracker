import '@babel/polyfill';
import { issuesElm, filter, page } from './views/base';
import {
  menuSearch,
  getQuery,
  modalQuery,
  checkQuery,
  redirectIssue,
} from './models/Search';
import { Settings } from './models/ModalOptions';
import { renderMenu, addActiveFromParams, addArrow } from './views/searchView';
import { addChecked } from './views/modalView';
import { button, logut } from '../utils/logout';
const state = {};

button.addEventListener('click', logut);

filter.statusList.forEach((el) => {
  el.addEventListener('click', () => {
    getQuery('status', el.textContent.toLowerCase());
  });
});

filter.sortList.forEach((el) =>
  el.addEventListener('click', () => {
    let value = el.dataset.prop;
    if (el.classList.contains('down')) value = `-${value}`;
    // if (el.childElementCount > 1) value = `-${value}`;
    getQuery('sort', value);
  })
);

issuesElm.categoryBtn.addEventListener('click', () => {
  if (!issuesElm.categoryBtn.classList.contains('drop')) {
    issuesElm.categoryMenu.style = 'display: block';
    issuesElm.arrowOne.classList.add('arrow-down__active');
    issuesElm.categoryBtn.classList.add('drop');

    //Menu search
    filter.categoryInputText.addEventListener('keyup', () => {
      const arr = menuSearch(
        filter.categoryInputText.value,
        filter.categoryList
      );
      renderMenu(arr, filter.categoryContainer);
    });
    //Add URL parameters
    filter.categoryList.forEach((el) =>
      el.addEventListener('click', (e) => {
        getQuery('category', el.textContent);
      })
    );
  } else {
    issuesElm.categoryMenu.style = 'display: none';
    issuesElm.arrowOne.classList.remove('arrow-down__active');
    issuesElm.categoryBtn.classList.remove('drop');
  }
});
issuesElm.asigneeBtn.addEventListener('click', () => {
  if (!issuesElm.asigneeBtn.classList.contains('drop')) {
    issuesElm.asigneeMenu.style = 'display: block';
    issuesElm.arrowTwo.classList.add('arrow-down__active');
    issuesElm.asigneeBtn.classList.add('drop');

    //Menu search
    filter.asigneeInputText.addEventListener('keyup', () => {
      const arr = menuSearch(filter.asigneeInputText.value, filter.asigneeList);
      renderMenu(arr, filter.asigneeContainer);
    });

    //Add URL parameters
    filter.asigneeList.forEach((el) =>
      el.addEventListener('click', (e) => {
        getQuery('asignee', el.textContent);
      })
    );
  } else {
    issuesElm.asigneeMenu.style = 'display: none';
    issuesElm.arrowTwo.classList.remove('arrow-down__active');
    issuesElm.asigneeBtn.classList.remove('drop');
  }
});

//Modal
issuesElm.optionsBtn.forEach((el) =>
  el.addEventListener('click', () => {
    issuesElm.optionsModal.style = 'display: block';

    issuesElm.optionsCloseBtn.addEventListener('click', () => {
      let fieldsList = [];
      let limitValue;
      issuesElm.modalFieldsList.forEach((el) => {
        if (!el.checked) fieldsList.push(`-${el.id}`);
      });
      issuesElm.modalLimitItemsList.forEach((el) => {
        if (el.checked) limitValue = el.id;
      });

      //Save the options
      if (!state.modalOptions) state.modalOptions = new Settings();
      state.modalOptions.persistData(fieldsList, limitValue);

      //Load the params
      modalQuery(fieldsList, limitValue);
      //Close the Modal
      issuesElm.optionsModal.style = 'display: none';
    });
  })
);

page.buttonsContainer.forEach((el) =>
  el.addEventListener('click', (e) => {
    if (e.target.dataset.page) {
      getQuery('page', e.target.dataset.page);
    }
  })
);

issuesElm.issuesPropertiesList.forEach((el) =>
  el.addEventListener('click', () => {
    redirectIssue(el.dataset.id);
  })
);

window.addEventListener('load', () => {
  if (!state.modalOptions) state.modalOptions = new Settings();
  state.modalOptions.getStorage();
  checkQuery(state.modalOptions.fields, state.modalOptions.limit);
  addActiveFromParams();
  addArrow();
  addChecked(state.modalOptions.limit, state.modalOptions.fields);
});


