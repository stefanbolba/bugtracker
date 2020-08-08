import axios from 'axios';
import { showAlert } from './../../utils/alert';

export const recoverPassword = async (data) => {
  try {    
    const token = location.href.split('recover/')[1];
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${token}`,
      data,
    });

    if ((res.data.status = 'succes')) {
      showAlert('succes', 'Password changed. You are now logged in.');
    }
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (err) {
    showAlert('error', err.response.data.message);    
  }
};
