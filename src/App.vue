<template>
  <div id="app">
    <AppBar />
    <router-view />
  </div>
</template>
<script>
import AppBarBase from "./components/AppBar.vue";
import { withFirebase } from "./components/HOC/FirebaseProvider.js";

const AppBar = withFirebase(AppBarBase);
export default {
  components: { AppBar }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  padding: 0;
  margin: 0;
}

html {
  background-color: #111;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.left {
  align-self: flex-start;
}

.inline-right-margin {
  margin-right: 10px;
}

.center {
  justify-content: center;
  align-content: center;
}

.bg-super-dark {
  background-color: #111;
}

.link {
  cursor: pointer;
}
.loginCard {
  width: 400px;
  margin: 100px 100px 20px 100px;
  padding: 20px;
  text-align: left;
  border-radius: 5px;
}
</style>
