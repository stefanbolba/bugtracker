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

export const getQuery = (type, value) => {
  type = encodeURIComponent(type);
  value = encodeURIComponent(value);
  let query = window.location.search.substr(1).split('&');

  if (value === 'unassigned' || value === 'all') {
    for (let i = 0; i < query.length; i++) {
      if (query[i].startsWith(type)) query.splice(i, 1);
    }
    query = query.join('&');
    return (document.location.search = `?${query}`);
  }

  if (query.length < 1 || query[0] === '') query = [];

  if (!query[0]) {
    query.push(`${type}=${value}`);
  }

  for (let i = 0; i < query.length; i++) {
    if (query[i].startsWith(type)) {
      const arr = query[i].split('=');
      arr[1] = value;
      query[i] = arr.join('=');
    }
    if (!query[i].startsWith(type) && !query.join('').includes(type)) {
      query.push(`${type}=${value}`);
    }
  }

  query = query.join('&');
  document.location.search = query;
};

export const modalQuery = (fieldsList, limitValue) => {
  let query = window.location.search.substr(1).split('&');

  let fields = `fields=${fieldsList.toString()}`;
  let limit = `limit=${limitValue}`;
  if (query.length < 1 || query[0] === '') query = [];
  

  if (!query[0]) {
    query.push(fields);
    query.push(limit);
  }

  for (let i = 0; i < query.length; i++) {
    if (query[i].startsWith('fields')) query[i] = fields;
    if (query[i].startsWith('limit')) query[i] = limit;
    if (!query[i].startsWith('fields') && !query.join('').includes('fields'))
      query.push(fields);
    if (!query[i].startsWith('limit') && !query.join('').includes('limit'))
      query.push(limit);
  }

  query = query.join('&');
  document.location.search = query;
};

export const checkQuery = (fieldsList, limitValue) => {
  const query = window.location.search;
  if (query) return;
  document.location.search = `fields=${fieldsList.toString()}&limit=${limitValue}`;
};

export const redirectIssue = (id) => {
  document.location.replace(`/issues/${id}`)
}