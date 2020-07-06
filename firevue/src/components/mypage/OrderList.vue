<template>
  <article class="userInfo">
    <PurchaseList class="purchase" :orderList="$store.state.user.orderList" />
  </article>
</template>
<script>
import PurchaseList from "@/components/purchase/PurchaseList.vue"

export default {
  components: { PurchaseList }
}
</script>
<style scoped>
.userInfo {
  display: flex;
}
</style>