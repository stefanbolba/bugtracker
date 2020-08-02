import axios from 'axios';
import { showAlert } from './../../utils/alert';

export const getIssues = async (state) => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/issues',
    }).then((doc) => {
      state.issues = doc.data.data.data;
      if (doc.data.status === 'succes') {
        showAlert('succes', 'All issues have been imported!');
      }
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const getCategories = async (state) => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/category',
    }).then((doc) => {      
      state.categories = doc.data.data.data;
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
