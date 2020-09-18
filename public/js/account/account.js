import '@babel/polyfill';
import { account } from './views/base';
import { updateDOMPhoto } from './views/userView';
import { updateSettings } from './models/UpdateSettings';
import { button, logout } from '../utils/logout';
import * as MenuElm from '../utils/userInfo';
import { menuArr, addWhite, addColor, load } from '../utils/menu';

button.addEventListener('click', logout);

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

account.saveSettings.addEventListener('click', async (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append('name', account.name.value);
  form.append('email', account.email.value);
  form.append('photo', account.photo.files[0]);

  const image = await updateSettings(form, 'data');
  if (image) updateDOMPhoto(image);
});

account.savePassword.addEventListener('click', async (e) => {
  e.preventDefault();
  account.savePassword.textContent = 'Updating...';
  const passwordCurrent = account.passwordCurrent.value;
  const password = account.password.value;
  const passwordConfirm = account.passwordConfirm.value;

  await updateSettings(
    { passwordCurrent, password, passwordConfirm },
    'password'
  );

  account.savePassword.textContent = 'Save password';
  account.passwordCurrent.value = '';
  account.password.value = '';
  account.passwordConfirm.value = '';
});
