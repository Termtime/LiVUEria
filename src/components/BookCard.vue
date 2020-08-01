<template>
  <div v-if="listaLibros.length !== 0" class="section">
    <div class="card-container">
      <div v-for="libro in listaModificada" :key="libro.id" class="card-unit">
        <span
          :id="libro.id"
          class="icon-red r top-right-corner"
          @click="toggleFavorite"
        >
          <i
            :class="
              `${
                libro.hasOwnProperty('esFav') ? 'fas' : 'far'
              } fa-heart icon-lg`
            "
          ></i>
          <!-- <i
            class="fas fa-heart icon-lg"
            v-if="libro.hasOwnProperty('esFav')"
          ></i>-->
        </span>
        <div
          class="card reactive-card shadow center"
          style="width: 18rem;"
          v-on:click="goToBook(libro.id)"
        >
          <img
            :src="libro.posterUrl != '' ? libro.posterUrl : placeholder"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body text-left">
            <h5 class="card-title text-dark">
              {{ libro.title }}
              <h6 style="font-size: 13px">{{ libro.genre }}</h6>
            </h5>
            <h6 class="card-subtitle text-dark">{{ libro.author }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noimg from "../assets/nobookimg.png";

export default {
  name: "BookCard",
  data: function() {
    return {
      placeholder: noimg
    };
  },
  props: ["listaLibros", "firebase"],
  methods: {
    toggleFavorite(evt) {
      console.log(this.listaLibros);
      var libroId = evt.currentTarget.id;
      var targetElement = document.getElementById(libroId);
      var childNodes = targetElement.childNodes;
      var icon = childNodes[0];
      if (icon.dataset.prefix === "fas") {
        this.removerFavorito(libroId);
        icon.classList.remove("fas");
        icon.classList.add("far");
      } else {
        this.crearFavorito(libroId);
        icon.classList.remove("far");
        icon.classList.add("fas");
      }
    },
    crearFavorito(libroID) {
      if (this.$store.state.isAuth) {
        this.firebase.db
          .collection("/Favorites")
          .add({ bookID: libroID, uid: this.firebase.auth.currentUser.uid });
      } else {
        this.$store.commit("addTempFavorite", {
          bookID: libroID
        });
      }
    },
    removerFavorito(libroID) {
      if (this.$store.state.isAuth) {
        this.firebase.db
          .collection("/Favorites")
          .where("bookID", "==", libroID)
          .get()
          .then(snapshot => {
            let documentoBorrar = snapshot.docs.filter(
              doc => doc.data().uid === this.firebase.auth.currentUser.uid
            );
            console.log(documentoBorrar);
            this.firebase.db
              .collection("/Favorites")
              .doc(documentoBorrar[0].id)
              .delete();
          });
      } else {
        this.$store.commit("removeFavoriteWithID", libroID);
      }
    },
    goToBook(bookID) {
      this.$router.push(`/library/book/${bookID}`);
    }
  },
  computed: {
    favoritos() {
      return this.$store.getters.getFavorites;
    },
    listaModificada() {
      let librosFavoritos = this.listaLibros.filter(
        libro =>
          this.favoritos.filter(favorito => favorito.bookID == libro.id)
            .length > 0
      );
      let listaMod = this.listaLibros.map(libro =>
        librosFavoritos.filter(lf => lf.id == libro.id).length > 0
          ? { ...libro, esFav: true }
          : libro
      );
      return listaMod;
    }
  },
  mounted() {
    const images = document.getElementsByTagName("img");
    for (let image of images) {
      if (
        image.onload == null &&
        !image.classList.contains("a-img") &&
        image.id != "posterLibro"
      ) {
        image.addEventListener("load", fadeImg);
        image.style.opacity = "0";
      }
    }

    function fadeImg() {
      this.style.transition = "opacity 2s";
      this.style.opacity = "1";
    }

    window.scrollTo(0,0);
  }
};
</script>
