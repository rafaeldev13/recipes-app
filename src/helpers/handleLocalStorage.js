export function saveOnStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getFromStorage(key) {
  localStorage.getItem(key);
}
