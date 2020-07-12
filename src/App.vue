<template>
  <div id="app">
    <AppBar />
    <router-view />
  </div>
</template>
<script>
import AppBarBase from "./components/AppBar.vue";
import { withFirebase } from "./components/HOC/FirebaseProvider";

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
  color: #2c3e50;
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
</style>
