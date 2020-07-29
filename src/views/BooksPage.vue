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

    <div v-if="favoriteBooks.length !== 0" class="section">
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
              :src="book.posterUrl != '' ? book.posterUrl : placeholder"
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
import noimg from "../assets/nobookimg.png";
export default {
  name: "BooksPage",
  data: function() {
    return {
      removeFavoritesList: [],
      placeholder: noimg
    };
  },
  props: ["firebase"],
  components: {},
  methods: {
    removeAllDiscardedBooks() {
      if (this.removeFavoritesList.length === 0) return;
      let batch = this.firebase.db.batch();

      this.removeFavoritesList.map(bookID =>
        batch.delete(this.firebase.getDocRef("Favorites", bookID))
      );
      batch.commit();
    },
    goToBook(bookID) {
      this.$router.push(`/library/book/${bookID}`);
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
  computed: {
    books() {
      return this.$store.getters.getBooks;
    },
    favorites() {
      return this.$store.getters.getFavorites;
    },
    favoriteBooks() {
      let favBooks;
      try {
        favBooks = this.favorites.map(favoriteInfo => {
          var favoritedBook = this.books.find(
            book => book["id"] === favoriteInfo.bookID
          );
          console.log(favoritedBook);
          return {
            ...favoritedBook,
            favoritesEntryID: favoriteInfo.id
          };
        });
      } catch (e) {
        favBooks = [];
        console.log(e);
      }

      return favBooks;
    }
  },
  beforeDestroy() {
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
  box-shadow: 0 -2px 10px rgba(100, 100, 100, 1);
  transition-duration: 0.2s;
  display: flex;
  margin: 1%;
  height: 525px;
  padding: 5px;
}

.reactive-card img {
  height: 400px;
  object-fit: contain;
  border-radius: 5%;
}
.reactive-card:hover {
  transform: scale(1.02);
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
