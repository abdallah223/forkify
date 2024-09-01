import * as model from './model.js';
import RecipeView from './views/RecipeView.js';
import recipeView from './views/RecipeView.js';
import resultsView from './views/ResultsView.js';
import SearchView from './views/SearchView.js';
import PaginationView from './views/PaginationView.js';
import ResultsView from './views/ResultsView.js';
import BookmarkView from './views/BookmarkView.js';
import AddRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
if (module.hot) {
  module.hot.accept();
}
const showRecipeController = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //should be update
    ResultsView.update(model.getSearchResultsPage());
    BookmarkView.update(model.state.bookmarked);

    console.log(1);
    await model.getRecipe(id);
    console.log(1);
    recipeView.render(model.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
};
let showSearchResultsController = async function () {
  try {
    const recipe = SearchView.searchWord;

    if (recipe.length === 0) return;
    resultsView.renderSpinner();
    await model.getSearchResults(recipe);
    resultsView.render(model.getSearchResultsPage(1));
    PaginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};
const paginationController = function (page) {
  resultsView.render(model.getSearchResultsPage(page));
  PaginationView.render(model.state.search);
};

const servantsHandlerController = function (servants) {
  model.getNewQuantities(servants);
  RecipeView.update(model.state.recipe);
};
const addBookmarkedContoller = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmarkedRecipe();
  } else {
    model.deleteBookmarkedRecipe();
  }

  RecipeView.update(model.state.recipe);
  BookmarkView.render(model.state.bookmarked);
};

const bookmarksControler = function () {
  model.getSavedBookmarks();
  BookmarkView.render(model.state.bookmarked);
};
const addRecipeController = async function (data) {
  try {
    AddRecipeView.renderSpinner();
    await model.uploadRecipe(data);
    RecipeView.render(model.state.recipe);
    BookmarkView.render(model.state.bookmarked);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    AddRecipeView.renderMessage();
    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (e) {
    AddRecipeView.renderError(e);
  }
};
// const bookmarkContoller
(function init() {
  RecipeView.addRenderHandler(showRecipeController);
  RecipeView.addServantsHandler(servantsHandlerController);
  RecipeView.addBookmarkHandler(addBookmarkedContoller);
  SearchView.addClickHandler(showSearchResultsController);
  PaginationView.addClickHandler(paginationController);
  BookmarkView.addRenderHandler(bookmarksControler);
  AddRecipeView.addSubmitHandler(addRecipeController);
})();
