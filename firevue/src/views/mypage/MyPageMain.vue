<template>
  <div id="mypageMain">
    <Profile v-show="mypageNav[0]" />
    <ShoppingCart v-show="mypageNav[1]" />
    <OrderList v-show="mypageNav[2]" />
  </div>
</template>
<script>
import Profile from "@/components/mypage/Profile.vue"
import OrderList from "@/components/mypage/OrderList.vue"
import ShoppingCart from "@/components/mypage/ShoppingCart.vue"
export default {
  props: ["mypageNav"],
  components: {
    Profile,
    ShoppingCart,
    OrderList
  }
}
</script>
<style scoped>
#mypageMain {
  margin-left: 45px;
  border: 1px solid black;
  width: 70vw;
  height: 80vh;
  /* display: flex; */
}
</style>