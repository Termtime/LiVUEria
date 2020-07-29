<template>
  <div>
    <form class="form-inline" @submit="handleSearchSubmit">
      <input
        class="form-control mx-2 my-2"
        type="text"
        v-model="buscar"
        placeholder="Titulo..."
      />
      <SubmitButton label="Buscar" />
    </form>
    <div class="col text-dark">
      <div class="row" v-for="book in results" :key="book.id">
        <div
          class="col-10 shadow link rounded p-3 my-1"
          @click="evt => handleSelectBook(evt, book)"
        >
          <div class="row">
            <div class="col-10">
              <h5>{{ book.title }}</h5>
              <small>{{ `${book.author}/${book.year}-${book.genre}` }}</small>
            </div>
            <div class="column center">
              <span class="icon-red icon-lg">
                <i class="fas fa-chevron-right"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="column ml-4 center">
          <span class="icon-red icon-lg" @click="evt => deleteBook(evt, book)">
            <i class="fas fa-trash"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SubmitButton from "./SubmitButton.vue";
const jq = require("jquery");
window.jq = jq;
export default {
  name: "FormularioSeleccionarLibro.vue",
  props: ["firebase"],
  data: function() {
    return {
      buscar: "",
      results: [],
      // books: [],
      booksListener: null
    };
  },
  methods: {
    handleSearchSubmit(evt) {
      if (evt) evt.preventDefault();
      this.results = this.books.filter(book =>
        book.title.toLowerCase().includes(this.buscar.toLowerCase())
      );
    },
    handleSelectBook(evt, book) {
      this.$emit("selected", book);
    },
    async getFavoriteEntries(bookID) {
      let favoriteEnt = [];
      let snapshot = await this.firebase.db
        .collection("Favorites")
        .where("bookID", "==", bookID)
        .get();
      // .then(snapshot => {
      //   console.log("received query response");
      //   console.log(snapshot);
      //   favoriteEnt = snapshot.docs.map(doc => doc.id);
      //   console.log("favoritEnt", favoriteEnt);
      //   return favoriteEnt;
      // });
      console.log("received query response");
      console.log(snapshot);
      favoriteEnt = snapshot.docs.map(doc => doc.id);
      console.log("favoritEnt", favoriteEnt);
      return favoriteEnt;
    },
    async deleteBook(evt, book) {
      let favoriteEntriesID = await this.getFavoriteEntries(book.id);
      //borrar de firebase el libro
      // let batches = [];
      let batch = this.firebase.db.batch();

      console.log(favoriteEntriesID);
      // console.log(batches)
      console.log(batch);
      // batches.push(batch);
      batch.delete(this.firebase.getDocRef("/Books", book.id));
      favoriteEntriesID.map(entryID => {
        // let arrayIndexCounter =
        //   Math.floor(i / 500) > 0
        //     ? Math.floor(i / 500) - 1
        //     : Math.floor(i / 500);
        batch.delete(this.firebase.getDocRef("/Favorites", entryID));
        // batches[arrayIndexCounter].delete(
        //   this.firebase.getDocRef("/Favorites" + entryID)
        // );
      });
      batch.commit();
      // batches.map(batch => batch.commit());
      // .collection("/Books")
      // .doc(book.id)
      // .delete();

      //borrar de firestorage la img de portada
      if (book.imgLocation != "") {
        this.firebase.storage
          .ref()
          .child(book.imgLocation)
          .delete();
      }
    }
    // obtenerLibros() {
    //   this.booksListener = this.firebase.db
    //     .collection("/Books")
    //     .onSnapshot((snapshot) => {
    //       console.log("new snapshot");
    //       let libros = snapshot.docs.map((doc) => ({
    //         title: doc.data().title,
    //         year: doc.data().year,
    //         genre: doc.data().genre,
    //         author: doc.data().author,
    //         posterUrl: doc.data().posterUrl,
    //         id: doc.id,
    //       }));
    //       this.books = libros;
    //       if (this.buscar !== "") this.handleSearchSubmit(null);
    //     });
    // },
  },
  computed: {
    books() {
      return this.$store.getters.getBooks;
    }
  },
  watch: {
    books(o, n) {
      if (o === n) return;
      if (this.search !== "") this.handleSearchSubmit(null);
    }
  },
  mounted() {
    jq("#adminModal").on("hidden.bs.modal", () => {
      this.buscar = "";
      this.results = [];
    });
    // jq("#toggleSeleccionarLibro").on("shown.bs.tab", () => {
    //   if (this.books.length !== 0) return;
    //   this.obtenerLibros();
    // });
  },
  components: {
    SubmitButton
  }
};
</script>
