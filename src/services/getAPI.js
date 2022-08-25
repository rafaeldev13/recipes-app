const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';
const NOT_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';

export async function fetchIngredient(type, option, value) {
  const converted = option === 'ingredient' ? 'i' : 'c';
  if (type === 'Foods') {
    const response = await fetch(`${URL_FOOD}filter.php?${converted}=${value}`);
    const data = await response.json();
    if (data.meals !== null) {
      return data;
    }
    global.alert(NOT_FOUND);
    return { meals: [] };
  }
  if (type === 'Drinks') {
    try {
      const response = await fetch(`${URL_DRINK}filter.php?${converted}=${value}`);
      const data = await response.json();
      return data;
    } catch (err) {
      global.alert(NOT_FOUND);
      return { drinks: [] };
    }
  }
}
export async function fetchOption(type, option, value) {
  const converted = option === 'name' ? 's' : 'f';
  if (type === 'Foods') {
    const response = await fetch(`${URL_FOOD}search.php?${converted}=${value}`);
    const data = await response.json();
    if (data.meals !== null) {
      return data;
    }
    if (data.meals === null) {
      global.alert(NOT_FOUND);
      return { meals: [] };
    }
  }
  if (type === 'Drinks') {
    try {
      const response = await fetch(`${URL_DRINK}search.php?${converted}=${value}`);
      const data = await response.json();
      if (data.drinks === null) {
        global.alert(NOT_FOUND);
        return { drinks: [] };
      }
      return data;
    } catch (err) {
      global.alert(NOT_FOUND);
      return { drinks: [] };
    }
  }
}

export async function fetchCategory(type) {
  if (type === 'Foods') {
    const response = await fetch(`${URL_FOOD}list.php?c=list`);
    const data = await response.json();
    return data;
  }
  if (type === 'Drinks') {
    const response = await fetch(`${URL_DRINK}list.php?c=list`);
    const data = await response.json();
    return data;
  }
}

export async function fetchRecipe(type, id) {
  if (type === 'Foods') {
    const response = await fetch(`${URL_FOOD}lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  }
  if (type === 'Drinks') {
    const response = await fetch(`${URL_DRINK}lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  }
}
