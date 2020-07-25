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
      <div
        v-for="book in results"
        :key="book.id"
        class="row shadow link rounded p-3 my-1"
        @click="selectedBook = book"
      >
        <div class="col-10">
          <h5>{{ book.title }}</h5>
          <small>{{ `${book.author}/${book.year}-${book.genre}` }}</small>
        </div>
        <div class="col-2 center">
          <span class="icon-red icon-lg">
            <i class="fas fa-chevron-right"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SubmitButton from "./SubmitButton.vue";

export default {
  name: "FormularioEditarBorrarLibro.vue",
  props: ["firebase"],
  data: function() {
    return {
      buscar: "",
      results: [],
      selectedBook: null
    };
  },
  methods: {
    handleSearchSubmit(evt) {
      evt.preventDefault();
      this.firebase.db
        .collection("Books")
        .orderBy("lowerCaseTitle")
        .startAt(this.buscar.toLowerCase())
        .endAt(this.buscar.toLowerCase() + "\uf8ff")
        .get()
        .then(snapshot => {
          console.log(snapshot);
          let books = snapshot.docs.map(doc => ({
            title: doc.data().title,
            year: doc.data().year,
            genre: doc.data().genre,
            author: doc.data().author,
            id: doc.id
          }));
          this.results = books;
        });
    }
  },
  components: {
    SubmitButton
  }
};
</script>
