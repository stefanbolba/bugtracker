import { account } from './base';

export const updateDOMPhoto = (img) => {
  //Use the getTime method to force the browser to recache the new image
  account.image.src = `/img/users/${img}#${new Date().getTime()}`;
};
