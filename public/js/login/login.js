import '@babel/polyfill';
import { form } from './views/base';
import { login, signup, forgotPassword } from './models/PostLoginInfo';

form.submitBtn.addEventListener('click', (e) => {
  const email = form.emailInput.value;
  const password = form.passwordInput.value;

  e.preventDefault();
  login(email, password);
});

form.guestBtn.addEventListener('click', (e) => {
  const email = form.guestEmail;
  const password = form.guestPassword;

  e.preventDefault();
  login(email, password);
});

form.submitBtnSignup.addEventListener('click', (e) => {
  e.preventDefault();
  const name = form.nameSingup.value;
  const email = form.emailInputSignup.value;
  const password = form.passwordInputSignup.value;
  const passwordConfirm = form.passwordConfirmInputSignup.value;

  signup(name, email, password, passwordConfirm);
});

form.resetBtn.addEventListener('click', (e) => {
  e.preventDefault()    
  console.log(email)
  forgotPassword(email);
})

form.showSignupBtn.addEventListener('click', () => {
  form.loginForm.style = 'display: none';
  form.signupForm.style = 'display: flex';
});

form.showLoginBtn.forEach((el) => {
  el.addEventListener('click', () => {
    console.log('test')
    form.loginForm.style = 'display: flex';
    form.signupForm.style = 'display: none';
    form.resetForm.style = 'display: none';
  });
});

form.showReset.addEventListener('click', () => {
  form.resetForm.style = 'display: flex';
  form.loginForm.style = 'display: none';
});
