import axios from 'axios';
import { showAlert } from './alert';

export const button = document.querySelector('.logout');

export const logut = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if (res.data.status === 'succes') {
      showAlert('succes', 'You are now logged out!');
      document.location.replace(`/login`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err)
  }
};
