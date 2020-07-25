<template>
  <div id="home">
    <h1>LiVUEria</h1>
    <small>Where Vue and books meet</small>
    <div class="section-divider">
      <div class="row">
        <h2 class="ml-4 mt-3">Libros</h2>
        <div class="offset-3 col-md-5">
          <div class="input-group mb-2 mt-3">
            <input type="text" class="form-control" placeholder="Buscar" />
            <div class="input-group-append">
              <button
                class="btn btn-outline-light"
                type="button"
                id="button-addon2"
              >
                <span><i class="fas fa-search"></i></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="divider">
        <hr color="white" />
      </div>
    </div>

    <div v-if="libros.length !== 0" class="section">
      <div class="card-container ">
        <div v-for="libro in libros" :key="libro.id" class="card-unit">
          <div
            class="card reactive-card shadow center"
            style="width: 18rem;"
            @click="goToBook(libro.id)"
          >
            <img
              :src="
                libro.posterUrl != null || libro.posterUrl.length != 0
                  ? libro.posterUrl
                  : '../assets/logo.png'
              "
              class="card-img-top"
              alt="..."
            />
            <div class="card-body text-left">
              <h5 class="card-title text-dark">{{ libro.title }}</h5>
              <h6 class="card-subtitle text-dark">{{ libro.year }}</h6>
              <p class="card-text text-dark">
                {{ libro.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LibraryPage",
  data: function() {
    return {
      guardarLibros: null,
      libros: []
    };
  },
  props: ["firebase"],
  components: {},
  methods: {
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
      });
    }
  }
};
</script>
