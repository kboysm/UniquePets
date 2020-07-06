<template>
  <div class="home">
    <header>전체 상품 목록</header>
    <section>
      <nav>
        <ul>
          <li>
            <button @click="categoryViewProductList('All')">All</button>
          </li>
          <li>
            <button @click="categoryViewProductList('frog')">frog</button>
          </li>
          <li>
            <button @click="categoryViewProductList('lizard')">lizard</button>
          </li>
          <li>
            <button @click="categoryViewProductList('snake')">snake</button>
          </li>
          <li>
            <button @click="categoryViewProductList('turtle')">turtle</button>
          </li>
          <li>
            <button @click="categoryViewProductList('scorpion')">scorpion</button>
          </li>
        </ul>
      </nav>
    </section>
    <article>
      <h2>인기상품</h2>
      <div class="hitItem">
        <div class="mySlides fade" v-for="item in hitProduct" :key="item._id+'hit'">
          <Product-card :product="item" />
        </div>
      </div>
      <br />
      <hr />
      <br />
      <h2>전체 상품 목록</h2>
      <div class="All_product">
        <div v-for="item in viewProductList" :key="item._id">
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
      viewProductList: [], //navbar에 의해 화면에 보여지는 상품 리스트
      productList: [], //전체 상품 리스트
      hitProduct: [], //인기상품목록 slider로 구현
      SliderIndex: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    categoryViewProductList(category) {
      if (category === "All") {
        this.viewProductList = this.productList
        return
      }

      const viewList = []
      this.productList.forEach(item => {
        if (item.productCategory === category) {
          viewList.push(item)
        }
      })
      this.viewProductList = viewList
      document.querySelector(".hitItem").scrollIntoView(true)
    },
    autoHitItemSliderViews() {
      let slides = document.getElementsByClassName("mySlides")
      this.SliderIndex = this.SliderIndex.map(item => {
        return (item + 1) % slides.length
      })
      for (let i = 0; i < slides.length; i++) {
        if (this.SliderIndex.includes(i)) {
          slides[i].style.display = "block"
        } else {
          slides[i].style.display = "none"
        }
      }
      setTimeout(this.autoHitItemSliderViews, 5000)
    },
    autoHitItemSliderFirst() {
      let slides = document.getElementsByClassName("mySlides")

      for (let i = 0; i < slides.length; i++) {
        if (this.SliderIndex.includes(i + 1)) {
          slides[i].style.display = "block"
        } else {
          slides[i].style.display = "none"
        }
      }
      setTimeout(this.autoHitItemSliderViews, 2000)
      // for (let idx in this.SliderIndex) {
      //   slides[idx].style.display = "block"
      // }
    }
  },
  created() {
    this.$axios
      .get("/api/product/products")
      .then(r => {
        this.productList = r.data
        this.viewProductList = this.productList
        for (let i = 0; i < this.productList.length; i++) {
          if (this.productList[i].isBestProduct === true) {
            this.hitProduct.push(this.productList[i])
          }
        }
        return 1
      })
      .then(r => {
        if (r === 1) {
          this.autoHitItemSliderFirst()
        }
      })
      .catch(e => {
        alert(e)
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
  height: 1000%;
  overflow: visible;
}
.hitItem {
  display: flex;
  flex-direction: row;
  height: fit-content;
  width: auto;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.All_product {
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  width: 20%;
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
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
/* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */
@media (max-width: 600px) {
  .home {
    height: auto;
  }
  nav {
    width: 100%;
    height: auto;
  }
  section {
    display: block;
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
