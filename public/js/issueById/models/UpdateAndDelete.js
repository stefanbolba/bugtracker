import axios from 'axios';
import { showAlert } from './../../utils/alert';

export const updateComment = async (id, comment) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/comments/${id}`,
      data: {
        comment,
      },
    });
    
    if (res.data.status === 'succes') {
      showAlert('succes', 'Comment has been updated!');
    }
    return true;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteComment = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/comments/${id}`,
    });

    if (res.status === 204) {
      showAlert('succes', 'Comment has been deleted!');
    }
    return true;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateIssue = async (obj) => {
  const id = location.pathname.split('/')[2];
  obj.updatedOn = Date.now();
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/issues/${id}`,
      data: obj,
    });
    if (res.data.status === 'succes') {
      showAlert('succes', 'Issue has been Updated!');
    }
    return true;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const addComment = async (comment) => {
  try {
    const issue = location.pathname.split('/')[2];
    const res = await axios({
      method: 'POST',
      url: '/api/v1/comments',
      data: {
        issue,
        comment,
      },
    });
    if (res.data.status === 'succes') {
      showAlert('succes', 'Comment has been created!');
    }
    
    return res.data;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
