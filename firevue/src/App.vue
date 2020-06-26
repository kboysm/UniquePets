<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/notice">Notice</router-link>|
      <template v-if="!$store.state.token">
        <router-link to="/register">sign up</router-link>|
        <router-link to="/login">sign in</router-link>
      </template>
      <template v-else>
        <router-link to="/mypage">mypage</router-link>|
        <a @click="signOut">sign out</a>
      </template>
    </div>
    <!-- <img :src="require('@/assets/insect.jpg')" /> -->
    <transition name="custom-classes-transition" leave-active-class="animated bounceOutRight">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backInsect: ""
    };
  },
  methods: {
    signOut() {
      // localStorage.removeItem('token')
      this.$store.commit("delToken");
      this.$router.push("/").catch(() => {});
    }
  }
};
</script>

<style>
a,
a:visited,
a:link {
  text-decoration: none;
  color: #036;
  cursor: pointer;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("assets/insect.jpg") no-repeat;
  background-position: center;
  width: 100vw;
  height: 100vh;
  /* overflow: hidden; */
  /* background-size: 150px; */
}
body {
  margin: 0;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
