<template>
  <article class="userInfo">
    <img src="https://image.flaticon.com/icons/svg/149/149992.svg" alt="userImage" />
    <div>
      <section>이름 : {{$store.state.user.name}}</section>
      <section>나이 : {{$store.state.user.age}}</section>
      <section>id : {{$store.state.user.id}}</section>
    </div>
  </article>
</template>
<script>
export default {
  name: "MyInfo"
};
</script>
<style scoped>
.userInfo {
  display: flex;
}
</style>