<template>
  <div>
    <h2>Shopping Cart</h2>
    <div id="shoppingCart">
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
      <ProductCard class="cardStyle" />
    </div>
  </div>
</template>
<<script>
import ProductCard from '../ProductCard'
export default {
  components:{
    ProductCard
  }
}
</script>
<style lang="scss" scoped>
#shoppingCart {
  display: flex;
  flex-wrap: wrap;

  h2 {
    text-align: center;
  }
}
</style>