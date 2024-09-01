import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { getJson, sendJson } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resPerPage: RES_PER_PAGE,
    currentPage: 1,
    pages: 0,
  },
  bookmarked: [],
};
const createReicpeObject = function (data) {
  let { recipe } = data.data;
  return {
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    title: recipe.title,
    sourceUrl: recipe.source_url,
    cookingTime: recipe.cooking_time,
    publisher: recipe.publisher,
    bookmarked: state.bookmarked.some(
      bookmarkRecipe => recipe.id == bookmarkRecipe.id
    ),
    ...(recipe.key && { key: recipe.key }),
  };
};
export const getRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);
    let { recipe } = data.data;
    console.log(recipe);
    state.recipe = createReicpeObject(data);
  } catch (error) {
    throw new Error(error);
  }
};
export const getSearchResults = async function (keyWord) {
  try {
    const searchResults = await getJson(`${API_URL}?search=${keyWord}`);
    if (!searchResults.results) throw new Error();
    state.search.query = keyWord;
    state.search.pages = Math.ceil(
      searchResults.results / state.search.resPerPage
    );
    const apiResults = searchResults.data.recipes;
    state.search.results = apiResults.map(res => {
      return {
        id: res.id,
        imageUrl: res.image_url,
        title: res.title,
        publisher: res.publisher,
      };
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resPerPage;
  const end = page * state.search.resPerPage;
  return state.search.results.slice(start, end);
};

export const getNewQuantities = function (servings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity =
      ing.quantity === null
        ? null
        : (ing.quantity * (servings / state.recipe.servings))
            .toFixed(2)
            .replace('.00', '');
  });
  state.recipe.servings = servings;
};
export const addBookmarkedRecipe = function () {
  state.recipe.bookmarked = true;
  state.bookmarked.push(state.recipe);
  saveBookmark();
};
export const deleteBookmarkedRecipe = function () {
  const deleted = state.bookmarked.findIndex(
    bookmark => bookmark.id === state.recipe.id
  );
  state.bookmarked.splice(deleted, 1);
  state.recipe.bookmarked = false;
  saveBookmark();
};

const saveBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarked));
};

export const getSavedBookmarks = function () {
  const bookmarks = localStorage.getItem('bookmarks');
  if (bookmarks) state.bookmarked = JSON.parse(bookmarks);
};

export const uploadRecipe = async function (object) {
  try {
    const ingredients = Object.entries(object)
      .filter(data => data[0].startsWith('ingredient') && data[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      publisher: object.publisher,
      ingredients,
      source_url: object.sourceUrl,
      image_url: object.image,
      title: object.title,
      servings: +object.servings,
      cooking_time: +object.cookingTime,
    };
    const data = await sendJson(`${API_URL}?key=${KEY}`, recipe);
    console.log(data);
    state.recipe = createReicpeObject(data);
    addBookmarkedRecipe(state.recipe);
    console.log(state.recipe);
  } catch (e) {
    console.log(e);
    throw e;
  }
  // const ingredients = [];
  // for (const [key, value] of Object.entries(object)) {
  //   if (key.includes('ingredient')) {
  //     const ing = value.split(',');
  //     if (ing.length === 3)
  //       ingredients.push({
  //         quantity: ing[0],
  //         unit: ing[1],
  //         description: ing[2],
  //       });
  //   }
  // }
  // return {
  //   publisher: object.publisher,
  //   ingredients: ingredients,
  //   source_url: object.sourceUrl,
  //   image_url: object.image,
  //   title: object.title,
  //   servings: object.servings,
  //   cooking_time: object.cookingTime,
  // };
};
