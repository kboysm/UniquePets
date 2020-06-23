<template>
  <div id="myNav">
    <h2>My Page Nav</h2>
    <v-btn @click="showMypage([1,0,0])">프로필</v-btn>
    <v-btn @click="showMypage([0,1,0])">장바구니</v-btn>
    <v-btn @click="showMypage([0,0,1])">주문목록</v-btn>
  </div>
</template>
<script>
export default {
  methods: {
    showMypage(item) {
      this.$emit("viewList", item);
    }
  }
};
</script>
<style scoped>
#myNav {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  border: 1px solid black;
  height: 80vh;
  width: 20vw;
}
</style>