import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: [],
    books: [],
    tempFav: [],
    isAuth: false,
    isAuthReady: false,
    booksListenerActive: false,
    favoritesListenerActive: false,
  },
  mutations: {
    updateFavorites(state, favoritesArray) {
      state.favorites = favoritesArray;
      state.booksListenerActive = true;
    },
    updateBooks(state, booksArray) {
      state.books = booksArray;
      state.favoritesListenerActive = true;
    },
    addTempFavorite(state, favorite) {
      state.tempFav.push(favorite);
    },
    removeFavoriteWithID(state, bookID) {
      let arrayDeleteIndex = state.tempFav.findIndex(
        (book) => book.id === bookID
      );
      state.tempFav.splice(arrayDeleteIndex, 1);
    },
    shutdownBooksListener(state) {
      state.booksListenerActive = false;
    },
    shutdownFavoritesListener(state) {
      state.favoritesListenerActive = false;
    },
    login(state) {
      state.isAuth = true;
    },
    logout(state){
      state.isAuth = false;
    },
    authIsReady(state){
      state.isAuthReady = true;
    }
  },
  getters: {
    getBooks: (state) => {
      return state.books.length > 0 ? state.books : [];
    },
    getFavorites: (state) => {
      if (state.isAuth) return state.favorites.length > 0 ? state.favorites : [];
      else return state.tempFav.length > 0 ? state.tempFav : [];
    },
  },
  actions: {},
  modules: {},
});
