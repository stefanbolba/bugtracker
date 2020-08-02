export const addChecked = (limit, fields) => {
  document.getElementById(limit).checked = true;

  for (let i = 0; i < fields.length; i++) {
    document.getElementById(fields[i].replace('-', '')).checked = false;
  }
};
