export function saveOnStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getOnStorage(key, value) {
  localStorage.getItem(key, value);
}
