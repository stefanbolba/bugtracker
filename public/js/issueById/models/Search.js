export const menuSearch = (key, menu) => {
    const val = [];
    let arr;
  
    menu.forEach((el) => val.push(el.textContent));
  
    if (key) {
      arr = val.filter((el) => {
        const regex = new RegExp(key, 'gi');
        return el.match(regex);
      });
      return arr;
    }
    arr = val;
    return arr;
  };