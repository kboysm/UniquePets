<template>
  <div class="home">
    <nav>
      <ul>
        <li>item1</li>
        <li>item2</li>
        <li>item2</li>
        <li>item3</li>
        <li>item4</li>
      </ul>
    </nav>
    <div class="hitItem">
      <div v-for="item in productList" :key="item._id">
        <Product-card :product="item" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/product/Product.vue"
// @ is an alias to /src
export default {
  components: {
    ProductCard
  },
  data() {
    return {
      productList: []
    }
  },
  created() {
    this.$axios.get("/api/product/products").then(r => {
      this.productList = r.data
    })
  }
}
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
nav {
  width: 15vw;
  height: auto;
  position: sticky;
  left: 0;
  background: #fff;
  border-radius: 5px;
  height: 800px;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  padding: 24px;
}
.hitItem {
  display: flex;
  flex-direction: row;

  width: auto;
  background: #fff;
  border-radius: 5px;

  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  padding: 24px;
}
</style>
