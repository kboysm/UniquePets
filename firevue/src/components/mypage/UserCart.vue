<template>
  <article class="userInfo">{{$store.state.user.cart}}</article>
</template>
<script>
export default {
  name: "MyInfo"
}
</script>
<style scoped>
.userInfo {
  display: flex;
}

.userInfo img {
  border: 1px solid black;
  border-radius: 12px;
}

.userInfo .infoContainer {
  width: 100%;
  padding: 12px;
}

.userInfo .infoContainer section {
  width: 100%;
  background-color: #e2e2e2;
  border-radius: 5px;
  margin: 12px;
}
.userInfo .infoContainer section button {
  float: right;
  color: red;
  margin-right: 3px;
}
</style>