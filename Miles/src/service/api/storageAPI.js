function save(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

function get(name) {
  return JSON.parse(localStorage.getItem(name));
}

export default {
  save,
  get
}