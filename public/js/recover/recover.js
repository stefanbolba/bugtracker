import '@babel/polyfill';
import { form } from './views/base';
import { recoverPassword } from './models/Submit';

form.recoverBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const password = form.password.value;
  const passwordConfirm = form.passwordConfirm.value;
  recoverPassword({ password, passwordConfirm });
});
