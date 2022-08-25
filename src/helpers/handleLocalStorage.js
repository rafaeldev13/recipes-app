export function saveOnStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getFromStorage(key) {
  const storage = localStorage.getItem(key);
  if (storage !== null) {
    return JSON.parse(storage);
  }
  return '';
}

export function saveInProgressRecipes(type, id, ingredientsList) {
  const category = type === 'foods' ? 'meals' : 'cocktails';
  const recipe = { [id]: ingredientsList };
  const prevStorage = localStorage.getItem('inProgressRecipes');

  if (prevStorage === null) {
    const storageBase = { cocktails: {}, meals: {} };
    const objToSave = { ...storageBase, [category]: recipe };
    localStorage.setItem('inProgressRecipes', JSON.stringify(objToSave));
  } else {
    const storageObj = JSON.parse(prevStorage);
    const objToSave = {
      ...storageObj,
      [category]: {
        ...storageObj[category],
        ...recipe,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(objToSave));
  }
}

export function getInProgressRecipes() {
  const prevStorage = localStorage.getItem('inProgressRecipes');
  if (prevStorage === null) { return { cocktails: {}, meals: {} }; }
  return JSON.parse(prevStorage);
}

export function removeInProgressRecipes(type, id) {
  const prevStorage = localStorage.getItem('inProgressRecipes');
  if (prevStorage === null) { return; }

  const category = type === 'food' ? 'meals' : 'cocktails';
  const prevStorageObj = JSON.parse(prevStorage);
  delete prevStorageObj[category][id];
  localStorage.setItem('inProgressRecipes', JSON.stringify(prevStorageObj));
}

// para salvar, remover ou acessar receitas favoritas ignore o parâmetro isDone.
// para salvar, remover ou acessar receitas prontas passe true no parâmetro isDone.
export function saveFavoriteOrDoneRecipes(recipeObject, isDone = false) {
  const key = isDone ? 'doneRecipes' : 'favoriteRecipes';
  const prevStorage = localStorage.getItem(key);

  if (prevStorage === null) {
    localStorage.setItem(key, JSON.stringify([recipeObject]));
  } else {
    const prevFavorites = JSON.parse(prevStorage);
    const newFavorites = [...prevFavorites, recipeObject];
    localStorage.setItem(key, JSON.stringify(newFavorites));
  }
}

export function removeFavoriteOrDoneRecipes(id, isDone = false) {
  const key = isDone ? 'doneRecipes' : 'favoriteRecipes';
  const prevStorage = localStorage.getItem(key);

  if (prevStorage !== null) {
    const prevFavorites = JSON.parse(prevStorage);
    const newFavorites = prevFavorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem(key, JSON.stringify(newFavorites));
  }
}

export function getFavoriteOrDoneRecipes(isDone = false) {
  const key = isDone ? 'doneRecipes' : 'favoriteRecipes';
  const prevStorage = localStorage.getItem(key);
  if (prevStorage === null) {
    return [];
  }

  return JSON.parse(prevStorage);
}
