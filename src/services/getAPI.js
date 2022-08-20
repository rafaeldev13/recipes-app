const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

export async function fetchIngredient(type, value) {
  if (type === 'food') {
    const response = await fetch(`${URL_FOOD}filter.php?i=${value}`);
    console.log(response);
    const data = await response.json();
    return data;
  }
  if (type === 'drink') {
    const response = await fetch(`${URL_DRINK}filter.php?i=${value}`);
    console.log(response);
    const data = await response.json();
    return data;
  }
}
export async function fetchOption(type, option, value) {
  const converted = option === 'name' ? 's' : 'f';
  if (type === 'food') {
    const response = await fetch(`${URL_FOOD}search.php?${converted}=${value}`);
    const data = await response.json();
    return data;
  }
  if (type === 'drink') {
    const response = await fetch(`${URL_DRINK}search.php?${converted}=${value}`);
    const data = await response.json();
    return data;
  }
}
