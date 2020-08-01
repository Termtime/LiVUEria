<template>
  <div id="home">
    <h1>LiVUEria</h1>
    <small>Where Vue and books meet</small>
    <div class="section-divider">
      <div class="row">
        <h2 class="ml-4 mt-3">Libros</h2>

        <!---------------------------------------------------------------->
        <div class="offset-3 col-md-4">
          <div class="input-group mb-2 mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar"
              v-model="busquedatxt"
              @input="filtrarBusqueda"
            />

            <div class="input-group-append bg-dark" v-show="busquedatxt != ''">
              <button class="btn btn-outline-light" @click="busquedatxt = ''; filtrarBusqueda()">
                <span>
                  <i class="fas fa-times"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="divider">
        <hr color="white" />
      </div>
    </div>

    <BookCard :listaLibros="arregloMostrar" :firebase="firebase" />

    <h1
      v-if="arregloMostrar.length == 0 && $store.state.isAuthReady != false"
      class="mt-5"
    >No se encontraron resultados :(</h1>
  </div>
</template>

<script>
import BookCard from "../components/BookCard.vue";
export default {
  name: "LibraryPage",
  data: function() {
    return {
      busquedatxt: "",
      resultado: null
    };
  },
  props: ["firebase"],
  components: {
    BookCard
  },
  methods: {
    filtrarBusqueda(evt) {
      if (evt) evt.preventDefault();
      this.resultado = this.libros.filter(libro =>
        libro.title.toLowerCase().includes(this.busquedatxt.toLowerCase())
      );
      console.log(this.resultado);
    }
  },
  computed: {
    libros() {
      return this.$store.getters.getBooks;
    },
    arregloMostrar() {
      if (this.resultado == null) return this.libros;
      else return this.resultado;
    }
  }
};
</script>
