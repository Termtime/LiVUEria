<template>
  <div id="home">
    <h1>LiVUEria</h1>
    <small>Where Vue and books meet</small>
    <div class="section-divider">
      <h2 class="left">Favorites</h2>
      <div class="divider">
        <hr color="white" />
      </div>
    </div>

    <div v-if="books.length !== 0" class="section">
      <div class="card-container ">
        <div
          v-for="book in favoriteBooks"
          :key="book.favoritesEntryID"
          class="card-unit"
        >
          <span
            :id="book.id + '-star'"
            class="icon-red r top-right-corner"
            v-on:click="evt => toggleFavorite(evt, book)"
          >
            <i class="fas fa-heart icon-lg"></i>
          </span>
          <div
            class="card reactive-card shadow center"
            style="width: 18rem;"
            @click="goToBook(book.id)"
          >
            <img
              :src="
                book.posterUrl != null || book.posterUrl.length != 0
                  ? book.posterUrl
                  : '../assets/logo.png'
              "
              class="card-img-top"
              alt="..."
            />
            <div class="card-body text-left">
              <h5 class="card-title text-dark">{{ book.title }}</h5>
              <h6 class="card-subtitle text-dark">{{ book.year }}</h6>
              <p class="card-text text-dark">
                {{ book.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "BooksPage",
  data: function() {
    return {
      isAuthReady: false,
      unsubListener: null,
      favoritesListener: null,
      bookListener: null,
      loggedUser: null,
      favorites: [],
      books: [],
      favoriteBooks: [],
      removeFavoritesList: []
    };
  },
  props: ["firebase"],
  components: {},
  methods: {
    removeAllDiscardedBooks() {
      let batch = this.firebase.db.batch();

      this.removeFavoritesList.map(bookID =>
        batch.delete(this.firebase.getDocRef("Favorites", bookID))
      );
      batch.commit();
    },
    goToBook(bookID) {
      this.$router.push(`/library/book/${bookID}`);
    },
    updateFavoriteBooksList() {
      try {
        this.favoriteBooks = this.favorites.map(favoriteInfo => {
          var favoritedBook = this.books.find(
            book => book["id"] === favoriteInfo.bookID
          );
          return {
            ...favoritedBook,
            favoritesEntryID: favoriteInfo.id
          };
        });
      } catch (e) {
        console.log(e);
      }
    },
    toggleFavorite(evt, book) {
      //
      var targetId = evt.currentTarget.id;
      var targetElement = document.getElementById(targetId);
      var childNodes = targetElement.childNodes;
      var icon = childNodes[0];
      if (icon.dataset.prefix === "fas") {
        this.removeFavoritesList.push(book.favoritesEntryID);
        icon.classList.remove("fas");
        icon.classList.add("far");
      } else {
        this.removeFavoritesList.splice(
          this.removeFavoritesList.indexOf(book.favoritesEntryID),
          1
        );
        icon.classList.remove("far");
        icon.classList.add("fas");
      }
    }
  },
  mounted() {
    this.bookListener = this.firebase.allBooksPath().onSnapshot(snapshot => {
      let libros = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        year: doc.data().year,
        description: doc.data().description,
        posterUrl: doc.data().posterUrl
      }));
      console.log("HOLA RECIBIMOS UN SNAPSHOT");
      this.books = libros;
      this.updateFavoriteBooksList();
    });
    this.unsubListener = this.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedUser = user;
        this.firebase.getUserFavorites(user.uid).then(snapshot => {
          let docs = snapshot.docs.map(doc => ({
            bookID: doc.data().bookID,
            id: doc.id
          }));
          this.favorites = docs;
          this.updateFavoriteBooksList();
        });
        console.log(this.favorites);
      } else {
        this.loggedUser = null;
      }
      this.isAuthReady = true;
    });
  },
  beforeDestroy() {
    //desuscribir el listener para evitar memory leaks y errores
    this.unsubListener();
    this.bookListener();
    this.removeAllDiscardedBooks();
  }
};
</script>

<style>
#home {
  background-color: #111;
  color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
}
.divider {
  /* display:flex; */
  /* background-color: white; */
  width: 100%;
  justify-content: center;
  align-content: center;
}

.section-divider {
  width: 100%;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
}

.section {
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
}

.reactive-card {
  transition-duration: 0.2s;
  display: flex;
  margin: 1%;
}

.reactive-card:hover {
  transform: scale(1.03);
}

.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.r {
  display: flex;
  flex-direction: row;
}
</style>
