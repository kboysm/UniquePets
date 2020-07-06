<template>
  <div class="container">
    <div class="oneOfOrder" v-for="item in orderList" :key="item.date+$store.state.user._id">
      <p>
        구매일:{{String(item.date).substring(0,10)}}
        <br />
        총급액:{{totalPrice(item.list)}} 원
      </p>
      <div class="card" v-for="list in item.list" :key="$store.state.user._id+list._id">
        <img :src="list.productImage" alt="productImage" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["orderList"],
  data() {
    return {}
  },
  methods: {
    totalPrice(item) {
      let totalPrice = 0
      item.forEach(item => {
        totalPrice += item.productPrice
      })
      return totalPrice
    }
  }
}
</script>
<style scoped>
img {
  width: 150px;
  height: 150px;
  max-width: 200px;
  max-height: 200px;
  border-radius: 10px;
  /*   margin-left: -50px; */
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
}
.container {
  display: flex;
  flex-direction: column;
}
.oneOfOrder {
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
}
.card {
  display: flex;
  height: 150px;
  width: 150px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -1rem 0 3rem #fff;
  /* margin-left: -50px; */
  transition: 0.4s ease-out;
  position: relative;
  left: 150px;
}
.card:not(:first-child) {
  margin-left: -50px;
}
.card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}
.card:hover ~ .card {
  position: relative;
  left: 130px;
  transition: 0.4s ease-out;
}
</style>