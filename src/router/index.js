import Vue from "vue";
import VueRouter from "vue-router";
import BooksPage from "../views/BooksPage.vue";
import LoginPage from "../views/LoginPage.vue";
import SignUpPage from "../views/SignUpPage.vue";
import LandingPage from "../views/LandingPage.vue";
import Library from "../views/Library.vue";
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
<<<<<<< HEAD
    name: "Library",
    component: Library
=======
    name: "library",
    component: null
  },
  {
    path: "/library/book/:bookID",
    name: "bookDetail",
    component: null
>>>>>>> b3fe52ebab0888d66ec64b0ea75c522c23a2f0b2
  }
];

const router = new VueRouter({
  routes
});

export default router;
