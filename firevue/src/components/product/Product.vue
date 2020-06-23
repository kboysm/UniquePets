<template>
  <div class="card">
    <img :src="product.productImage" art="testImages" />
    <p>{{product.ProductName}}</p>
    <p>{{product.productDescription}}</p>
    <p style="font-size:5px; color:red;">category : {{product.category}}</p>
  </div>
</template>
<script>
export default {
  props: ["product"]
};
</script>
<style scoped>
.card {
  margin: 0 0 12px 12px;
  width: 250px;
  height: 250px;
  border: 1px solid black;
  border-radius: 5px;
}
.card img {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: relative;
  width: 250px;
  height: 200px;
  opacity: 0.9;
}
</style>