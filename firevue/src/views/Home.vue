<template>
  <div class="home">
    <nav class="nav">
      <ul>
        <li>
          <button>frog</button>
        </li>
        <li>
          <button>lizard</button>
        </li>
        <li>
          <button>snake</button>
        </li>
        <li>
          <button>hamster</button>
        </li>
        <li>
          <button>Supplies</button>
        </li>
      </ul>
    </nav>
    <div class="hitContainer">
      <h2>인기상품</h2>
      <div class="hitItem">
        <div v-for="item in hitProduct" :key="item._id">
          <Product-card :product="item" />
        </div>
      </div>
    </div>
    <div></div>
    <div class="All_product">
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
      <product-card :product="productList[0]" />
    </div>
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
      productList: [], //전체 상품 리스트
      hitProduct: [] //인기상품목록 slider로 구현
    };
  },
  created() {
    this.$axios.get("/api/product/products").then(r => {
      this.productList = r.data;
      for (let i = 0; i < 5; i++) {
        this.hitProduct.push(this.productList[i]);
      }
    });
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.home {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.nav {
  width: auto;
  height: 300px;
  position: sticky;
  top: 25%;
  background: #fff;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  padding: 24px;
  margin-right: 0;
}
.nav ul {
  height: 250px;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hitItem {
  display: flex;
  flex-direction: row;
  height: fit-content;
  width: 59vw;
}
.hitContainer {
  margin-right: 100px;
  width: auto;
  height: fit-content;
  width: 59vw;
  background: #fff;
  border-radius: 5px;

  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  padding: 24px;
  overflow: hidden;
}
.All_product {
  margin-right: 100px;
  width: 60%;
  height: auto;
  display: flex;
  flex-wrap: wrap;

  background: #fff;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  padding: 24px;
  margin-right: 0;
}
</style>
