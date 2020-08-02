import axios from 'axios';
import { showAlert } from './../../utils/alert';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:8080/api/v1/users/updateMyPassword'
        : 'http://localhost:8080/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url: url,
      data: data,
    });

    if (res.data.status === 'succes') {
      showAlert('succes', `${type.toUpperCase()} updated successfully!`);
    }
    return res.data.data.user.photo
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
