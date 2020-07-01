<template>
  <article>
    <article class="userInfo">
      <div v-for="item in cart" :key="item._id+$store.state.user.name">
        <button @click="deleteItem(item)" id="deleteBtn">삭제</button>
        <ProductCard :product="item" />
        <p>수량 : {{item.Quantity}}</p>
        <button @click="itemQuantity(item,1)">up</button> |
        <button v-if="item.Quantity>1" @click="itemQuantity(item,-1)">down</button>
        <button v-else @click="deleteItem(item)">삭제</button>
      </div>
    </article>
    <br />
    <hr />
    <br />
    <p>총 가격 :{{stringPrice(totalPriceUpdate)}} 원</p>
    <button @click="purchaseCart">주문하기</button>
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
  computed: {
    totalPriceUpdate() {
      this.totalPrice = 0
      this.cart.forEach(item => {
        this.totalPrice += item.productPrice * item.Quantity
      })
      return this.totalPrice
    }
  },
  methods: {
    purchaseCart() {
      this.$axios
        .post("/api/user/cart/purchase", {
          cart: this.cart,
          u_id: this.$store.state.user._id
        })
        .then(r => {
          localStorage.setItem("user", JSON.stringify(r.data.user))
          this.$store.commit("getToken", r.data.user)
          this.$router.push("/mypage")
        })
    },
    deleteItem(item) {
      this.cart.forEach((v, i) => {
        if (v._id === item._id) {
          this.cart.splice(i, 1)
          this.$axios
            .post("/api/user/cart/delete", {
              cart: this.cart,
              u_id: this.$store.state.user._id
            })
            .then(r => {
              localStorage.setItem("user", JSON.stringify(r.data.user))
              this.$store.commit("getToken", r.data.user)
            })
          //서버로 cart 전송 후 db cart 바꾼 후 다시 user를 보내서 vuex에 저장시키기
        }
      })
    },
    itemQuantity(item, upAndDown) {
      if (item.Quantity === 0 && upAndDown === -1) {
        return
      }
      if (upAndDown === 1) {
        item.Quantity++
      } else if (upAndDown === -1) {
        item.Quantity--
      }
    },
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
      this.cart.push(item)
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
#deleteBtn {
  position: absolute;
  margin-left: 40px;
  margin-top: 10px;
  z-index: 1;
  color: red;
  font-size: large;
}
#deleteBtn:hover {
  background-color: black;
  color: #fff;
  border-radius: 5px;
}
</style>