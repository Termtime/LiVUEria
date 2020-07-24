import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import * as CONFIG from "../constants/firebaseConfig";

const config = {
  apiKey: CONFIG.API_KEY,
  authDomain: CONFIG.AUTH_DOMAIN,
  databaseURL: CONFIG.DATABASE_URL,
  projectId: CONFIG.PROJECT_ID,
  storageBucket: CONFIG.STORAGE_BUCKET,
  messagingSenderId: CONFIG.MESSAGING_SENDER_ID,
  appId: CONFIG.APP_ID
};

export class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.auth.useDeviceLanguage();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  //AUTH functions
  createUserWithEmailPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  loginWithEmailPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  _loginWithProvider = provider => {
    return this.auth.signInWithPopup(provider);
  };

  loginWithGoogle = () => {
    return this._loginWithProvider(this.googleProvider);
  };

  signOut = () => {
    return this.auth.signOut();
  };

  passwordReset = email => {
    return this.auth.sendPasswordResetEmail(email);
  };

  updatePassword = newPassword => {
    return this.auth.currentUser.updatePassword(newPassword);
  };

  updateProfileInfo = info => this.auth.currentUser.updateProfile(info);

  //Database and storage Functions

  getUserFavorites = uid =>
    this.db
      .collection("Favorites")
      .where("uid", "==", uid)
      .get();

  allBooksPath = () => this.db.collection("Books");
  getCurrentUserUid = () => this.auth.currentUser.uid;
  selectCollection = dbPath => this.db.collection(dbPath);
  getDocRef = (dbPath, docID) => this.db.collection(dbPath).doc(docID);
}
