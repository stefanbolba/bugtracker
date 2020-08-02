import axios from 'axios';
import { values } from './../views/base';
import { showAlert } from './../../utils/alert';

export const addIssue = async (...el) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/issues',
      data: {
        name: el[0],
        description: el[1],
        type: el[2],
        category: el[3],
        version: el[4],
        priority: el[5],
        asignee: el[6],
        dueDate: el[7],
      },
    });

    if (res.data.status === 'succes') {
      showAlert('succes', 'Issue has been created!');
      clearValues();
    }
  } catch (err) {    
    showAlert('error', err.response.data.message);
  }
};

export const addCategory = async (name) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/category',
      data: {
        name,
      },
    });

    if(res.data.status=== 'succes') {
      showAlert('succes', 'Category has been created!')
    }
  } catch (err) {
    showAlert('error', err.response.data.message)
  }
};
export const addVersion = async (name) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/version',
      data: {
        name,
      },
    });

    if(res.data.status=== 'succes') {
      showAlert('succes', 'Version has been created!')
    }
  } catch (err) {
    showAlert('error', err.response.data.message)
  }
};

const clearValues = () => {
  values.name.value = '';
  values.description.value = '';
  values.category.values = 'undefined';
  values.version.value = 'undefined';
  values.priority.value = 'low';
  values.asignee.value = 'undefined';
  values.dueDate.value = '';
};
