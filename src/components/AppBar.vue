<template>
  <div id="nav text-white">
    <div v-if="isAdmin">
      <AdministratePanel />
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark" id="appbar">
      <span class="navbar-brand pb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 65 81.25"
          width="50px"
          heigth="50px"
          style="enable-background:new 0 0 100 100; fill:white"
          enable-background="new 0 0 65 65"
          xml:space="preserve"
        >
          <path
            d="M61.625,3.25H3.375c-1.378,0-2.5,1.122-2.5,2.5V47.5c0,1.379,1.122,2.5,2.5,2.5H18.25v8.75h-3.333  c-0.829,0-1.5,0.672-1.5,1.5s0.671,1.5,1.5,1.5h35.166c0.828,0,1.5-0.672,1.5-1.5s-0.672-1.5-1.5-1.5H46.75V50h14.875  c1.379,0,2.5-1.121,2.5-2.5V5.75C64.125,4.372,63.004,3.25,61.625,3.25z M61.125,6.25v35.167H58.25V11.235  c0-1.37-1.121-2.485-2.5-2.485H9.25c-1.378,0-2.5,1.115-2.5,2.485v30.182H3.875V6.25H61.125z M34,41.417v-1.902  c0.011-1.121,3.83-3.204,11.125-3.204c0.828,0,1.5-0.672,1.5-1.5s-0.672-1.5-1.5-1.5c-4.197,0-8.405,0.69-11.125,2.154v-1.654  c0-1.12,3.821-3.208,11.125-3.208c0.828,0,1.5-0.671,1.5-1.5s-0.672-1.5-1.5-1.5c-4.197,0-8.405,0.691-11.125,2.155v-1.66  c0.011-1.121,3.83-3.204,11.125-3.204c0.828,0,1.5-0.671,1.5-1.5s-0.672-1.5-1.5-1.5c-4.197,0-8.405,0.69-11.125,2.155V22.5  c0-1.365,4.703-3.949,13.354-4.223v23.14H34z M17.646,18.277C26.297,18.551,31,21.135,31,22.5c0,0.001,0,0.003,0,0.005v1.543  c-2.72-1.464-6.928-2.155-11.125-2.155c-0.829,0-1.5,0.671-1.5,1.5s0.671,1.5,1.5,1.5c7.301,0,11.122,2.087,11.125,3.208  c0,0,0,0.001,0,0.001c0,0.001,0,0.003,0,0.005v1.65c-2.72-1.464-6.928-2.155-11.125-2.155c-0.829,0-1.5,0.671-1.5,1.5  s0.671,1.5,1.5,1.5c7.305,0,11.125,2.089,11.125,3.208v1.655c-2.72-1.465-6.928-2.155-11.125-2.155c-0.829,0-1.5,0.672-1.5,1.5  s0.671,1.5,1.5,1.5c7.301,0,11.122,2.087,11.125,3.207c0,0.001,0,0.001,0,0.002c0,0.002,0,0.003,0,0.005v1.893H17.646V18.277z   M50.354,16.75c0-0.829-0.672-1.5-1.5-1.5c-6.689,0-13.437,1.417-16.354,4.154c-2.917-2.737-9.665-4.154-16.354-4.154  c-0.829,0-1.5,0.671-1.5,1.5v24.667H9.75V11.75h45.5v29.667h-4.896V16.75z M43.75,58.75h-22.5V50h22.5V58.75z M3.875,47v-2.583  h57.25V47H3.875z"
          />
        </svg>
      </span>
      <span class="navbar-brand link" id="item1" @click="$router.push('/')">LiVUEria</span>
      <!---------->
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
              class="navbar-brand link"
              id="item2"
              v-on:click="handleHomeClick"
            >
              Mis libros
              <span class="sr-only">(current)</span>
              <!---------->
            </span>
          </li>
          <li class="nav-item" id="item3">
            <span class="navbar-brand link center" @click="$router.push('/libreria')">Librería</span>
            <!---------->
          </li>
        </ul>
        <div v-if="!Boolean(loggedUser)" class="r">
          <div class="inline-right-margin">
            <button
              class="btn btn-primary my-2 my-sm-0"
              @click="$router.push('signin')"
            >Inicia sesíon</button>
          </div>
          <div class="inline-right-margin">
            <button class="btn btn-info my-2 my-sm-0" @click="$router.push('signup')">Registrate</button>
          </div>
        </div>
        <div class="r inline-right-margin" v-else>
          <li class="nav-item dropdown list-unstyled dropleft">
            <a
              class="btn btn-dark dropdown-toggle"
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
              <span class="dropdown-item link" v-on:click="logout">Cerrar sesión</span>

              <span
                v-if="isAdmin"
                class="dropdown-item link"
                v-on:click="openAdminModal"
              >Administrar libros</span>
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
  computed: {
    appbarColor() {
      console.log(this.$store.getters.getAppbarColor);
      return this.$store.getters.getAppbarColor;
    },
    logButtonColor() {
      return this.$store.getters.getLogButtonColor;
    }
  },
  watch: {
    appbarColor: function(nuevoColor) {
      this.setAppbarColor(nuevoColor);
      console.log("nuevo color de navbar watch " + nuevoColor);
    },
    logButtonColor: function(nuevoColor) {
      this.setLogButtonColor(nuevoColor);
      console.log("nuevo color de logButton watch " + nuevoColor);
    }
  },
  methods: {
    handleHomeClick() {
      this.$router.push("/favorites");
    },
    logout() {
      this.firebase.signOut().then(() => this.$router.push("signin"));
    },
    openAdminModal() {
      console.log("trying to open modal");
      jq("#adminModal").modal("show");
    },
    // cambiando el color de la navbar y del boton segun el libro que se seleccione
    setAppbarColor(color) {
      console.log(`El color de de la navbar ahora es ${color}`);
      jq("#appbar").css("background-color", color);
    },
    setLogButtonColor(color) {
      console.log(`El color del logButton ahora es ${color}`);
      jq("#navbarDropdown").css("background-color", color);
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

    this.setAppbarColor(this.$store.getters.getAppbarColor);
  },
  beforeDestroy() {
    //desuscribir el listener para evitar memory leaks y errores
    this.unsubListener();
  }
};
</script>

<style>
#navbarDropdown {
  background-color: #8c7171;
  border: none;
}
</style>
