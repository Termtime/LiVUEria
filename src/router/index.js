import Vue from "vue";
import VueRouter from "vue-router";
import BooksPage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import LandingPage from "../views/LandingPage.vue";
import { withFirebase } from "../components/HOC/FirebaseProvider.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage
  },
  {
    path: "/books",
    name: "Books",
    component: BooksPage
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/signin",
    name: "Sign in",
    component: withFirebase(LoginPage)
  }
];

const router = new VueRouter({
  routes
});

export default router;
