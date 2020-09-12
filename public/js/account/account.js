import '@babel/polyfill';
import { account } from './views/base';
import { updateDOMPhoto } from './views/userView';
import { updateSettings } from './models/UpdateSettings';
import { button, logout } from '../utils/logout';
import {showContainer, hideContainer } from '../utils/userInfo';

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
