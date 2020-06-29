<template>
  <article>
    <article class="userInfo">
      <div v-for="item in cart" :key="item.item._id+$store.state.user.name">
        <ProductCard :product="item.item" />
        <p>{{item.Quantity}}</p>
        <button>up</button> |
        <button>down</button>
      </div>
    </article>
    <br />
    <hr />
    <br />
    <p>총 가격 :{{stringPrice(totalPrice)}} 원</p>
    <button>주문하기</button>
  </article>
</template>
<script>
import ProductCard from "@/components/product/Product.vue"
export default {
  name: "MyInfo",
  components: { ProductCard },
  data() {
    return {
      totalPrice: 0,
      cart: []
    }
  },
  methods: {
    stringPrice(price) {
      let stringPrice = (price + "").split("").reverse()
      let result = ""

      while (stringPrice.length > 3) {
        let aa = String(stringPrice.splice(0, 3))
          .split(",")
          .join("")
        result += aa + ","
      }

      result += String(stringPrice)
        .split(",")
        .join("")

      return result
        .split("")
        .reverse()
        .join("")
    }
  },
  created() {
    this.$store.state.user.cart.forEach(item => {
      const cartItem = { item, Quantity: 1 }
      this.cart.push(cartItem)
      this.totalPrice += item.productPrice
    })
  }
}
</script>
<style scoped>
.userInfo {
  display: flex;
  flex-wrap: wrap;
  width: auto;
  min-height: 500px;
}
</style>