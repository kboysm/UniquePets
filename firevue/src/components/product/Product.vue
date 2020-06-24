<template>
  <div class="card">
    <img :src="product.productImage" art="testImages" />
    <div class="content">
      <h3>{{product.productName}}</h3>
      <button>상세보기</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["product"]
}
</script>
<style lang="scss" scoped>
.card {
  margin: 12px;
  width: 250px;
  height: 250px;
  // border: 1px solid black;
  border-radius: 5px;
}

.card img {
  padding: 0;
  border-radius: 5px;
  position: relative;
  width: 250px;
  height: 200px;
  opacity: 0.9;
}
</style>