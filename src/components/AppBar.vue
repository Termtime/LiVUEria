<template>
  <div id="nav text-white">
    <div v-if="isAdmin">
      <AdministratePanel />
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <span class="navbar-brand link" @click="$router.push('/')">LiVUEria</span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <span
              v-if="Boolean(loggedUser)"
              class="nav-link link"
              v-on:click="handleHomeClick"
            >
              Mis libros
              <span class="sr-only">(current)</span>
            </span>
          </li>
          <li class="nav-item">
            <a class="nav-link link" @click="$router.push('libreria')"
              >Librería</a
            >
          </li>
        </ul>
        <div v-if="!Boolean(loggedUser)" class="r">
          <div class="inline-right-margin">
            <button
              class="btn btn-primary my-2 my-sm-0"
              @click="$router.push('signin')"
            >
              Inicia sesíon
            </button>
          </div>
          <div class="inline-right-margin">
            <button
              class="btn btn-info my-2 my-sm-0"
              @click="$router.push('signup')"
            >
              Registrate
            </button>
          </div>
        </div>
        <div class="r inline-right-margin" v-else>
          <li class="nav-item dropdown list-unstyled">
            <a
              class="btn btn-primary dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{
                isAuthReady
                  ? loggedUser.displayName == null
                    ? loggedUser.email.substring(
                        0,
                        loggedUser.email.indexOf("@")
                      )
                    : loggedUser.displayName
                  : null
              }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <span class="dropdown-item link" v-on:click="logout"
                >Cerrar sesión</span
              >

              <span
                v-if="isAdmin"
                class="dropdown-item link"
                v-on:click="openAdminModal"
                >Administrar libros</span
              >
            </div>
          </li>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import AdministratePanelBase from "../components/AdministratePanel.vue";
import { withFirebase } from "../components/HOC/FirebaseProvider.js";

const AdministratePanel = withFirebase(AdministratePanelBase);

const jq = require("jquery");
window.jq = jq;

export default {
  name: "AppBar",
  components: {
    AdministratePanel
  },
  data: function() {
    return {
      isAuthReady: false,
      adminCheckUnsub: null,
      bookListener: null,
      favoritesListener: null,
      loggedUser: null,
      isAdmin: false
    };
  },
  props: ["firebase"],
  methods: {
    handleHomeClick() {
      this.$router.push("books");
    },
    logout() {
      this.firebase.signOut().then(() => this.$router.push("signin"));
    },
    openAdminModal() {
      console.log("trying to open modal");
      jq("#adminModal").modal("show");
    }
  },
  mounted() {
    this.adminCheckUnsub = this.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.commit("login");
        this.loggedUser = user;
        var administradores = [];
        this.firebase.db
          .collection("Administrators")
          .doc("adminList")
          .get()
          .then(doc => {
            if (doc.exists) {
              administradores = doc.data().administrators;
              if (administradores.includes(user.email)) this.isAdmin = true;
            }
          });

        this.firebase.getUserFavorites(user.uid).onSnapshot(snapshot => {
          let favorites = snapshot.docs.map(doc => ({
            bookID: doc.data().bookID,
            id: doc.id
          }));
          this.$store.commit("updateFavorites", favorites);
        });
      } else {
        this.$store.commit("logout");
        this.loggedUser = null;
        this.isAdmin = false;
      }
      this.bookListener = this.firebase.allBooksPath().onSnapshot(snapshot => {
        let libros = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          year: doc.data().year,
          description: doc.data().description,
          posterUrl: doc.data().posterUrl,
          imgLocation: doc.data().imgLocation,
          author: doc.data().author,
          genre: doc.data().genre
        }));
        this.$store.commit("updateBooks", libros);
      });
      this.isAuthReady = true;
      this.$store.commit("authIsReady");
    });
  },
  beforeDestroy() {
    //desuscribir el listener para evitar memory leaks y errores
    this.unsubListener();
  }
};
</script>
