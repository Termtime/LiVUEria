<template>
  <div v-if="listaLibros.length !== 0" class="section">
    <div class="card-container ">
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
          ></i> -->
        </span>
        <div
          class="card reactive-card shadow center"
          style="width: 18rem;"
          v-on:click="goToBook(libro.id)"
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
</template>

<script>
export default {
  name: "BookCard",
  data: function() {
    return {
      listaModificada: [],
      favoritos: []
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
      this.firebase.db
        .collection("/Favorites")
        .add({ bookID: libroID, uid: this.firebase.auth.currentUser.uid });
    },
    removerFavorito(libroID) {
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
      // .delete({ bookID: libroID, uid: this.firebase.auth.currentUser.uid });
    },
    obtenerFavoritos() {
      this.firebase.db.collection("/Favorites").onSnapshot(snapshot => {
        let favs = snapshot.docs.map(favorito => ({
          id: favorito.id,
          libroId: favorito.data().bookID,
          uid: favorito.data().uid
        }));
        this.favoritos = favs;

        console.log(this.listaLibros);
        console.log(favs);
        let librosFavoritos = this.listaLibros.filter(
          libro =>
            favs.filter(favorito => favorito.libroId == libro.id).length > 0
        );
        console.log(librosFavoritos);
        this.listaModificada = this.listaLibros.map(libro =>
          librosFavoritos.filter(lf => lf.id == libro.id).length > 0
            ? { ...libro, esFav: true }
            : libro
        );
      });
    }
  },
  mounted() {
    this.listaModificada = [""];
  },
  beforeUpdate() {
    if (this.listaModificada[0] == "") {
      this.obtenerFavoritos();
    }
  }
};
</script>
