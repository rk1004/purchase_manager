<template>
  <div class="signin">
    <!-- emailとpasswordの入力欄 -->
    <!--
    <input type="email" placeholder="email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signIn">Signin</button>
    -->

    <!-- googleのアカウントでサインイン。アカウントがなければ新規に作成されます。 -->
    <button @click="signInWithGoogle">Googleアカウントでサインイン</button>

    <!-- サインアップページ遷移ボタン -->
    <!--
    <p>
      アカウントをお持ちではない方
      <router-link to="/signup">新規作成</router-link>
    </p>
    -->
  </div>
</template>

<script>
import firebase from "firebase"; // firebaseのインポート

export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {

    /* eslint-disable */
    // googleでサインインするときに呼ばれるfunction
    signInWithGoogle: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          this.$router.push("/");// still raises defined but never used
        }).catch(
          error => {
            alert(error.message)
          }
        );
    }
    /* eslint-enable */

  }
};
</script>

<style>
.signin{
  margin: 1% 0%;
}

.signin button{
  border: solid 2px #006400;
  border-radius:20px;
  background-color: #90ee90;
  margin: 0px 10px;
  padding: 0px 10px;
  font-size: 40px;
  outline: none;
}
</style>
