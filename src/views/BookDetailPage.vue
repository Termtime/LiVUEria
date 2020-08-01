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
          <h1 class="pt-3 font-weight-bold">Descubre más libros del género {{ genero }}</h1>
          <br />
          <br />
          <BookCard :listaLibros="relatedBooks" :firebase="firebase" />
        </div>
      </div>
    </div>
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

#descubre{
  transition-duration: 0.5s;
}

#tag1,
#tag2,
#tag3 {
  transition-duration: 0.5s;
}

#posterLibro{
  object-fit: cover;
  max-width: 100%;
}
</style>
