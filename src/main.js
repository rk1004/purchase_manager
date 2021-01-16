import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAY-67C_YhQ-4r6AJKkAb0_VS-MAeAyOhg",
  authDomain: "vue-todo-9ee29.firebaseapp.com",
  databaseURL: "https://vue-todo-9ee29-default-rtdb.firebaseio.com",
  projectId: "vue-todo-9ee29",
  storageBucket: "vue-todo-9ee29.appspot.com",
  messagingSenderId: "308376480256",
  appId: "1:308376480256:web:d6ef8b1c94a1f9422446e5",
  measurementId: "G-NR17SWE0KK"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
