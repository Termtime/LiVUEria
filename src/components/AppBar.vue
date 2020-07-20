<template>
  <div id="nav text-white">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
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
              >My Books <span class="sr-only">(current)</span></span
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Library</a>
          </li>
        </ul>
        <div v-if="!Boolean(loggedUser)" class="r">
          <div class="inline-right-margin">
            <button
              class="btn btn-primary my-2 my-sm-0"
              @click="$router.push('signin')"
            >
              Log In
            </button>
          </div>
          <div class="inline-right-margin">
            <button
              class="btn btn-info my-2 my-sm-0"
              @click="$router.push('signup')"
            >
              Sign Up
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
                >Log out</span
              >
            </div>
          </li>
        </div>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  data: function() {
    return {
      isAuthReady: false,
      unsubListener: null,
      loggedUser: null
    };
  },
  props: ["firebase"],
  methods: {
    handleHomeClick() {
      this.$router.push("books");
    },
    logout() {
      this.firebase.signOut().then(() => this.$router.push("signin"));
    }
  },
  mounted() {
    this.unsubListener = this.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedUser = user;
      } else {
        this.loggedUser = null;
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
