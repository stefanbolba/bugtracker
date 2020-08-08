import axios from 'axios';
import { showAlert } from './../../utils/alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if ((res.data.status = 'succes')) {
      showAlert('succes', 'Logged In');
    }

    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if ((res.data.status = 'succes')) {
      showAlert('succes', 'Account was succesfully created!');
    }

    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const forgotPassword = async (email) => {
  try {    
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });

    if ((res.data.status = 'succes')) {
      showAlert(
        'succes',
        'Email sent successfully! Token valid for only 10 minutes.'
      );
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err)
  }
};

export const guest = async () => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/guest',
    });

    if ((res.data.status = 'succes')) {
      showAlert('succes', 'Succesfully logged in as Guest');
    }
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
