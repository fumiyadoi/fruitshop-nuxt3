import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyA1Mtl1zK6y4fJWQzH_5o80lmsiKUI8h-4",
    authDomain: "fruitshop-nuxt3.firebaseapp.com",
    projectId: "fruitshop-nuxt3",
    storageBucket: "fruitshop-nuxt3.appspot.com",
    messagingSenderId: "658016745377",
    appId: "1:658016745377:web:8600037e9e15e645dabde0",
    measurementId: "G-SZQ7WDNT5S",
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
});
