// FirebaseProvider.js
import Vue from "vue";
import { Firebase } from "../../providers/firebase";

const firebaseApp = new Firebase();

export const withFirebase = component => {
  return Vue.component("withSubscription", {
    render(createElement) {
      return createElement(component, {
        props: {
          firebase: firebaseApp
        }
      });
    }
  });
};
