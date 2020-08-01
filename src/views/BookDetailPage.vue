<template>
  <div>
    <div id="home">
      <div class="row">
        <!-- v-if="this.titulo != ''" -->
        <div class="col-8">
          <div class="row">
            <span id="back" @click="goBack()" class="col-2">
              <i class="fas fa-chevron-left fa-3x"></i>
            </span>
            <h1 class="font-weight-bold col-8 text-center">{{ titulo }}</h1>
          </div>

          <div class="divider">
            <hr color="white" />
          </div>

          <!-- fila de datos -->
          <div style="text-align: left" class="row">
            <div class="col">
              <h4 id="tag1" class="font-weight-lighter p-2 tag">Autor(a):</h4>
              <h4 id="valor" class="pl-1 font-italic">{{ autor }}</h4>
            </div>

            <div class="col">
              <h4 id="tag2" class="font-weight-lighter p-2 tag">Año de publicación:</h4>
              <h4 id="valor" class="pl-1 font-italic">{{ anio }}</h4>
            </div>

            <div class="col">
              <h4 id="tag3" class="font-weight-lighter p-2 tag">Genero:</h4>
              <h4 id="valor" class="pl-1 font-italic">{{ genero }}</h4>
            </div>
          </div>
          <br />
          <br />

          <!-- descripcion -->
          <div class="col text-left">
            <h3 id="tag4" class="font-weight-lighter p-2 font-weight-bold tag">Descripción:</h3>
            <h4 class="pl-1">{{ descripcion }}</h4>
          </div>
        </div>

        <div class="col">
          <img id="posterLibro" :src="poster" />
          <!-- :src="poster == '' ? this.placeholder : poster" -->
        </div>
      </div>
    </div>

    <!-- LIBROS RELACIONADOS   -->
    <div v-if="relatedBooks.length != 0">
      <div class="r bg-super-dark">
        <div
          id="descubre"
          :style="`background-color:${Muted!=null ? Muted : ''}`"
          class="container-fluid d-block pt-3"
        >
          <span class="pt-1">
            <!-- <i class="fas fa-book-reader fa-5x"></i> -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 100 125"
              style="enable-background:new 0 0 100 100; fill:white"
              xml:space="preserve"
              width="200px"
              heigth="200px"
            >
              <g>
                <path
                  d="M14.4,86.9C11,86.9,7,86.5,7,84.7V21.5h1.4c0,0.5,2,1.4,5.9,1.4c3.9,0,5.9-0.9,5.9-1.4h1.4v63.2   C21.7,86.5,17.7,86.9,14.4,86.9z M8.5,84.6c0.4,0.4,2.5,0.8,5.9,0.8c3.4,0,5.5-0.5,5.9-0.8V23.4c-1.9,0.9-5,1-5.9,1   c-0.8,0-4-0.1-5.9-1V84.6z"
                />
              </g>
              <g>
                <path
                  d="M27.6,86.9c-4.9,0-7.3-0.7-7.3-2v-58h1.4c0,0.3,1.8,1.3,5.9,1.3c4.1,0,5.9-0.9,5.9-1.3h1.4v58   C34.9,86.2,32.4,86.9,27.6,86.9z M21.7,84.7c0.5,0.3,2.5,0.8,5.9,0.8c3.4,0,5.4-0.4,5.9-0.8V28.6c-1.8,0.8-4.7,0.9-5.9,0.9   c-1.2,0-4.1-0.1-5.9-0.9V84.7z"
                />
              </g>
              <g>
                <path
                  d="M40.8,86.9c-3.3,0-7.3-0.4-7.3-2.2V20h1.4c0,0.6,2.2,1.5,5.9,1.5s5.9-0.9,5.9-1.5h1.4v64.6C48.1,86.5,44.2,86.9,40.8,86.9z    M34.9,22v62.7c0.2,0.2,2.2,0.8,5.9,0.8c3.5,0,5.5-0.5,5.9-0.9V22c-1.4,0.7-3.7,1-5.9,1C38.6,23,36.3,22.7,34.9,22z"
                />
              </g>
              <g>
                <rect x="10.9" y="25.5" width="6.7" height="1.4" />
              </g>
              <g>
                <rect x="10.9" y="28.1" width="6.7" height="1.4" />
              </g>
              <g>
                <rect x="10.9" y="30.8" width="6.7" height="1.4" />
              </g>
              <g>
                <rect x="11" y="80.1" width="6.7" height="1.4" />
              </g>
              <g>
                <rect x="24.2" y="78.9" width="6.7" height="1.4" />
              </g>
              <g>
                <rect x="24.9" y="38.7" width="1.4" height="32" />
              </g>
              <g>
                <rect x="28.8" y="38.7" width="1.4" height="32" />
              </g>
              <g>
                <rect
                  x="34.2"
                  y="78.9"
                  transform="matrix(0.9998 -1.757541e-02 1.757541e-02 0.9998 -1.3923 0.7296)"
                  width="13.2"
                  height="1.4"
                />
              </g>
              <g>
                <rect
                  x="34.2"
                  y="28.1"
                  transform="matrix(0.9998 -1.757541e-02 1.757541e-02 0.9998 -0.5009 0.7218)"
                  width="13.2"
                  height="1.4"
                />
              </g>
              <g>
                <path
                  d="M59.8,33.4c0.1,0.5-1.8,1.8-5.3,2.8c-3.5,1-5.9,0.9-6,0.5L47.1,37L61.7,88c0.4,1.4,4.3,0.6,7.5-0.3c3.2-0.9,7-2.3,6.5-3.8   L61.2,33L59.8,33.4z M72.9,79l-11.3,3.4l-10-34.6L63,44.4L72.9,79z M62.6,43.2l-11.3,3.4l-0.5-1.9l11.3-3.4L62.6,43.2z M54.8,37.3   c2.1-0.6,4.2-1.5,5.4-2.4l1.5,5.3l-11.3,3.4l-1.6-5.5C50.4,38.3,52.7,37.9,54.8,37.3z M69,86.5c-3.5,1-5.6,1.1-5.8,1l-1.2-4   l11.3-3.4l1.2,4.1C74.1,84.6,72.4,85.5,69,86.5z"
                />
                <rect
                  x="61.5"
                  y="49.6"
                  transform="matrix(0.961 -0.2766 0.2766 0.961 -14.9166 19.6587)"
                  width="1.4"
                  height="26.2"
                />
              </g>
              <g>
                <path
                  d="M74.2,32.4c0.2,0.5-1.6,2-5,3.4c-3.4,1.4-5.7,1.6-5.9,1.1L62,37.5l20.5,48.9c0.6,1.4,4.4,0.1,7.5-1.2   c3.1-1.3,6.6-3.1,6.1-4.5L75.5,31.9L74.2,32.4z M92.5,76.2l-10.8,4.7L67.8,47.7L78.6,43L92.5,76.2z M78.1,41.9l-10.8,4.7l-0.8-1.8   l10.8-4.7L78.1,41.9z M69.7,36.9c2-0.8,4-1.9,5.1-3l2.1,5.1l-10.8,4.7l-2.2-5.3C65.5,38.4,67.7,37.8,69.7,36.9z M89.4,84.2   c-3.4,1.4-5.4,1.8-5.7,1.7L82.1,82l10.8-4.7l1.6,3.9C94.4,81.6,92.7,82.8,89.4,84.2z"
                />
                <rect
                  x="79.3"
                  y="48.2"
                  transform="matrix(0.9226 -0.3859 0.3859 0.9226 -17.4579 35.6154)"
                  width="1.4"
                  height="26.2"
                />
              </g>
              <g>
                <rect x="38.4" y="50.7" width="5.3" height="1.4" />
              </g>
              <g>
                <rect x="38.4" y="43.5" width="5.3" height="1.4" />
              </g>
              <g>
                <rect x="34.2" y="31.7" width="13.2" height="1" />
              </g>
              <g>
                <rect x="34.2" y="34.4" width="13.2" height="1" />
              </g>
            </svg>
          </span>
          <h1 class="pt-3 font-weight-bold">Descubre más libros del género {{ genero }}</h1>
          <br />
          <br />
          <BookCard :listaLibros="relatedBooks" :firebase="firebase" />
        </div>
      </div>
    </div>

    <footer class="footer mt-auto py-3">
      <div class="container">
        <span class="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>
  </div>
</template>

<script>
import * as Vibrant from "node-vibrant";
import BookCard from "../components/BookCard.vue";
const jq = require("jquery");
window.jq = jq;

export default {
  name: "BookDetailPage",
  props: ["firebase"],
  data: function() {
    return {
      titulo: "",
      anio: "",
      genero: "",
      autor: "",
      descripcion: "",
      poster: "",
      Vibrant: null,
      LightVibrant: null,
      DarkVibrant: null,
      Muted: null,
      LightMuted: null,
      DarkMuted: null,
      relatedBooks: []
    };
  },
  components: {
    BookCard
  },
  computed: {
    bookID() {
      return this.$route.params.bookID;
    }
  },
  methods: {
    getBookInfo() {
      this.firebase.db
        .collection("/Books")
        .doc(this.bookID)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.titulo = doc.data().title;
            this.anio = doc.data().year;
            this.genero = doc.data().genre;
            this.autor = doc.data().author;
            this.descripcion = doc.data().description;
            this.poster = doc.data().posterUrl;

            let p = document.getElementById("posterLibro");
            p.setAttribute("crossOrigin", "anonymous");

            ////////////////////////////////////////////// ¡COLORES DE VIBRANT AQUI!! //////////////////////////////////////////////
            document.querySelector("img").addEventListener("load", () => {
              let v = new Vibrant(p);
              v.getPalette((error, palette) => {
                // const rgb = palette.Vibrant.rgb;
                this.Vibrant = palette.Vibrant.hex;
                this.LightVibrant = palette.LightVibrant.hex;
                this.DarkVibrant = palette.DarkVibrant.hex;
                this.Muted = palette.Muted.hex;
                this.LightMuted = palette.LightMuted.hex;
                this.DarkMuted = palette.DarkMuted.hex;

                console.log(error, palette);

                jq("#tag1").css("background-color", this.DarkVibrant);
                jq("#tag2").css("background-color", this.DarkVibrant);
                jq("#tag3").css("background-color", this.DarkVibrant);
                jq("#tag4").css("background-color", this.DarkVibrant);
                jq("#back").css("color", this.Muted);

                this.$store.commit("updateAppbarColor", this.DarkVibrant);
                this.$store.commit("updateLogButtonColor", this.Muted);

                console.log(
                  `El color de ahora es ${this.$store.state.appbarColor}`
                );
              });
            });
          }
          this.getRelatedBooks();
        });
    },

    goBack() {
      // if (evt) {
      this.$router.back();
      console.log("ya debo ir atras");
      // } else console.log("que pedo que pedo no se que ondas");
    },

    getRelatedBooks() {
      this.firebase.db
        .collection("/Books")
        .where("genre", "==", this.genero)
        .get()
        .then(snapshot => {
          let unfilteredRelatedBooks = snapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
            posterUrl: doc.data().posterUrl,
            imgLocation: doc.data().imgLocation,
            author: doc.data().author,
            genre: doc.data().genre
          }));
          this.relatedBooks = unfilteredRelatedBooks.filter(
            relatedBook => relatedBook.id != this.bookID
          );
        });
    }
  },
  mounted() {
    this.getBookInfo();
    // jq("#image").on("load", this.getColor());
  }, /////////////////////
  beforeDestroy() {
    this.$store.commit("updateAppbarColor", "#695555");
    this.$store.commit("updateLogButtonColor", "#8c7171");
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

img {
  height: 500px;
}

.tag {
  /* background-color: rgba(137, 213, 243, 0.7); */
  display: inline-block;
  border-radius: 10px;
}

#valor {
  display: inline-block;
}

#back {
  transition-duration: 0.2s;
}
#back:hover {
  transform: scale(1.3);
}
</style>
