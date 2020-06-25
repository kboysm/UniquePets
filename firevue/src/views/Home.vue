<template>
  <div class="home">
    <header>전체 상품 목록</header>
    <section>
      <nav>
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
            <button>turtle</button>
          </li>
          <li>
            <button>scorpion</button>
          </li>
        </ul>
      </nav>
    </section>
    <article>
      <h2>인기상품</h2>
      <div class="hitItem">
        <div v-for="item in hitProduct" :key="item._id+'hit'">
          <Product-card :product="item" />
        </div>
      </div>
      <br />
      <hr />
      <br />
      <h2>전체 상품 목록</h2>
      <div class="All_product">
        <div v-for="item in productList" :key="item._id">
          <product-card :product="item" />
        </div>
      </div>
    </article>

    <!-- <div></div> -->
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
      productList: [], //전체 상품 리스트
      hitProduct: [] //인기상품목록 slider로 구현
    }
  },
  created() {
    this.$axios.get("/api/product/products").then(r => {
      this.productList = r.data
      for (let i = 0; i < 5; i++) {
        this.hitProduct.push(this.productList[i])
      }
    })
  }
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.home {
  display: block;
  height: 200%;
  overflow: visible;
}
.hitItem {
  display: flex;
  flex-direction: row;
  height: fit-content;
  width: auto;
  justify-content: center;
  flex-wrap: wrap;
}

.All_product {
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* Style the header */
header {
  background-color: #666;
  padding: 30px;
  text-align: center;
  font-size: 35px;
  color: white;
  opacity: 0.8;
}

/* Create two columns/boxes that floats next to each other */
section {
  float: left;
  width: 15%;
  height: 300px; /* only for demonstration, should be removed */

  padding: 20px;
  position: -webkit-sticky;
  position: sticky;

  top: 4rem;
}

section ul {
  height: 200px;
  background: #fff;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  padding: 24px;
  margin-right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
/* Style the list inside the menu */
nav ul {
  list-style-type: none;
  padding: 0;
}

article {
  float: left;
  padding: 20px;
  width: 60%;
  background-color: #f1f1f1;
  height: auto; /* only for demonstration, should be removed */

  background: #fff;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  padding: 24px;
  margin-left: 120px;
  margin-top: 20px;
}

/* Clear floats after the columns */
section:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */
@media (max-width: 600px) {
  nav,
  section {
    width: 100%;
    height: auto;
  }

  article {
    margin: 10px;
    width: 100%;
    height: auto;
  }
}
</style>
