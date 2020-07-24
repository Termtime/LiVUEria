import Vue from "vue";
import VueRouter from "vue-router";
import BooksPage from "../views/BooksPage.vue";
import LoginPage from "../views/LoginPage.vue";
import SignUpPage from "../views/SignUpPage.vue";
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
    component: withFirebase(BooksPage)
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
  },
  {
    path: "/signup",
    name: "Sign up",
    component: withFirebase(SignUpPage)
  },
  {
    path: "/library",
    name: "library",
    component: null
  },
  {
    path: "/library/book/:bookID",
    name: "bookDetail",
    component: null
  }
];

const router = new VueRouter({
  routes
});

export default router;
