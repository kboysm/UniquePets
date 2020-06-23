<template>
  <div class="home">
    <hr />
    <div v-for="item in productList" :key="item._id">
      <Product-card :product="item" />
    </div>
    <hr />
  </div>
</template>

<script>
import ProductCard from "@/components/product/Product.vue";
// @ is an alias to /src
export default {
  components: {
    ProductCard
  },
  data() {
    return {
      productList: []
    };
  },
  created() {
    this.$axios.get("/api/product/products").then(r => {
      this.productList = r.data;
    });
  }
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
