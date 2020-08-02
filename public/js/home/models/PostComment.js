import axios from 'axios';
import { showAlert } from './../../utils/alert';

export const postComment = async (comment, issue) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/comments',
      data: {
        comment,
        issue,
      },
    });    
    if(res.data.status === 'succes') {
      showAlert('succes', 'Comment has been posted!')
    }
  } catch (err) {
    showAlert('error', err.response.data.message)
  }
};

export const updateState = (state, conId, createdBy, text) => {
  state.forEach((el) => {
    if (el._id === conId) {
      if (text.value !== '') {
        el.comments.push({
          comment: text.value,
          createdAt: createDate(),
          user: {
            name: createdBy,
          },
        });
      }
    }
  });
};

const createDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }-Trandom`;
};
