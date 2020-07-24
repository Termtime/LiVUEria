<template>
  <div id="nav text-white">
<<<<<<< HEAD
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
=======
    <div v-if="isAdmin">
      <AdministratePanel />
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
>>>>>>> b3fe52ebab0888d66ec64b0ea75c522c23a2f0b2
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
<<<<<<< HEAD
            <span v-if="Boolean(loggedUser)" class="nav-link link" v-on:click="handleHomeClick">
              My Books
              <span class="sr-only">(current)</span>
            </span>
          </li>
          <li class="nav-item">
            <span class="navbar-brand link" @click="$router.push('library')">Library</span>
=======
            <span
              v-if="Boolean(loggedUser)"
              class="nav-link link"
              v-on:click="handleHomeClick"
              >Mis libros <span class="sr-only">(current)</span></span
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Librería</a>
>>>>>>> b3fe52ebab0888d66ec64b0ea75c522c23a2f0b2
          </li>
        </ul>
        <div v-if="!Boolean(loggedUser)" class="r">
          <div class="inline-right-margin">
<<<<<<< HEAD
            <button class="btn btn-primary my-2 my-sm-0" @click="$router.push('signin')">Log In</button>
          </div>
          <div class="inline-right-margin">
            <button class="btn btn-info my-2 my-sm-0" @click="$router.push('signup')">Sign Up</button>
=======
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
>>>>>>> b3fe52ebab0888d66ec64b0ea75c522c23a2f0b2
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
<<<<<<< HEAD
              <span class="dropdown-item link" v-on:click="logout">Log out</span>
=======
              <span class="dropdown-item link" v-on:click="logout"
                >Cerrar sesión</span
              >

              <span
                v-if="isAdmin"
                class="dropdown-item link"
                v-on:click="openAdminModal"
              >
                Administrar libros</span
              >
>>>>>>> b3fe52ebab0888d66ec64b0ea75c522c23a2f0b2
            </div>
          </li>
        </div>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Busca un título..."
            aria-label="Search"
          />
<<<<<<< HEAD
          <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
=======
          <button class="btn btn-success my-2 my-sm-0" type="submit">
            Buscar
          </button>
>>>>>>> b3fe52ebab0888d66ec64b0ea75c522c23a2f0b2
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import AdministratePanel from "../components/AdministratePanel.vue";
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
      unsubListener: null,
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
    this.unsubListener = this.firebase.auth.onAuthStateChanged(user => {
      if (user) {
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
      } else {
        this.loggedUser = null;
        this.isAdmin = false;
      }
      this.isAuthReady = true;
    });
  },
  beforeDestroy() {
    //desuscribir el listener para evitar memory leaks y errores
    this.unsubListener();
  }
};
</script>
