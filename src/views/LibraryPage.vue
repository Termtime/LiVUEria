<template>
  <div id="home">
    <h1>LiVUEria</h1>
    <small>Where Vue and books meet</small>
    <div class="section-divider">
      <div class="row">
        <h2 class="ml-4 mt-3">Libros</h2>

        <!---------------------------------------------------------------->
        <div class="offset-3 col-md-5">
          <div class="input-group mb-2 mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar"
              v-model="busquedatxt"
            />

            <div class="input-group-append">
              <button
                class="btn btn-outline-light"
                type="button"
                v-on:click="filtrarBusqueda"
              >
                <span><i class="fas fa-search"></i></span>
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="btn btn-info col-md-2 m-3"
          @click="
            evt => {
              resultado = null;
              funcionMostrar();
              busquedatxt = '';
            }
          "
        >
          Limpiar busqueda
        </button>
      </div>
      <div class="divider">
        <hr color="white" />
      </div>
    </div>

    <BookCard :listaLibros="arregloMostrar" :firebase="firebase" />

    <h1 v-if="arregloMostrar.length == 0 && librosListos" class="mt-5">
      No se encontraron resultados :(
    </h1>
  </div>
</template>

<script>
import BookCard from "../components/BookCard.vue";
// import { withFirebase } from "../components/HOC/FirebaseProvider";
// const BookCard = withFirebase(BookCardBase);
export default {
  name: "LibraryPage",
  data: function() {
    return {
      guardarLibros: null,
      libros: [],
      busquedatxt: "",
      resultado: null,
      arregloMostrar: [],
      librosListos: false
    };
  },
  props: ["firebase"],
  components: {
    BookCard
  },
  methods: {
    goToBook(bookID) {
      this.$router.push(`/library/book/${bookID}`);
    },
    filtrarBusqueda() {
      this.resultado = this.libros.filter(libro =>
        libro.title.toLowerCase().includes(this.busquedatxt.toLowerCase())
      );
      console.log(this.resultado);
      this.funcionMostrar();
    },
    funcionMostrar() {
      if (this.resultado == null) this.arregloMostrar = this.libros;
      else this.arregloMostrar = this.resultado;
      console.log(this.resultado);
    }
  },
  mounted() {
    this.guardarLibros = this.firebase.allBooksPath().onSnapshot(snapshot => {
      let libro = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        year: doc.data().year,
        description: doc.data().description,
        posterUrl: doc.data().posterUrl
      }));
      this.libros = libro;
      this.funcionMostrar();
      this.librosListos = true;
    });
  }
};
</script>

<style scope>
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
  transition-duration: 0.2s;
  display: flex;
  margin: 1%;
  min-height: 500px;
  padding: 5px;
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
