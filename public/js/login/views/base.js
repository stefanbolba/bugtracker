export const form = {
  emailInput: document.querySelector('#emailLogin'),
  passwordInput: document.querySelector('#passwordLogin'),
  submitBtn: document.querySelector('.btn--login'),

  nameSingup: document.querySelector('#nameSignup'),
  emailInputSignup: document.querySelector('#emailSignup'),
  passwordInputSignup: document.querySelector('#passwordSignup'),
  passwordConfirmInputSignup: document.querySelector('#passwordConfirmSignup'),
  submitBtnSignup: document.querySelector('.btn--signup'),

  guestBtn: document.querySelector('.login--guest'),
  guestEmail: 'guest@bugtraker.com',
  guestPassword: 'guestpassword',

  showSignupBtn: document.querySelector('.signup--link'),
  showLoginBtn: document.querySelectorAll('.login--back'),
  loginForm:document.querySelector('.login-form'),
  signupForm: document.querySelector('.singup-form'),

  showReset: document.querySelector('.reset--link'),
  resetBtn: document.querySelector('.btn--reset'),
  resetForm: document.querySelector('.reset-form'),
  emailResetInput: document.getElementById('emailReset')
};
