<template>
  <div class="container">
    <div class="overlay">
      <div class="items"></div>

      <div class="items cart">
        <i class="fa fa-shopping-cart"></i>
        <span>자세히 보기</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$bg: #fef5df;

body {
  background-color: $bg;
}

.container {
  width: 150px;
  height: 150px;

  position: relative;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 12px;

  background: url("https://i.pinimg.com/564x/6f/5a/b1/6f5ab1b470beeeeaf285bb451c63ac8f.jpg");
  background-color: black;
  background-size: cover;
  cursor: pointer;

  -webkit-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;
}

.overlay {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr 2fr 1fr;

  background: rgba(77, 77, 77, 0.9);
  color: $bg;
  opacity: 0;
  transition: all 0.5s;

  font-family: "Playfair Display", serif;
}

.items {
  padding-left: 20px;
  letter-spacing: 3px;
}

.cart {
  font-size: 12px;
  opacity: 0;
  letter-spacing: 1px;
  font-family: "Lato", sans-serif;
  transform: translateY(40px);
  transition: all 0.7s;
  i {
    font-size: 16px;
  }
  span {
    margin-right: 10px;
  }
}

.container:hover .overlay {
  opacity: 1;
  & .head {
    transform: translateY(0px);
  }

  & hr {
    width: 75px;
    transition-delay: 0.4s;
  }

  & .price {
    transform: translateY(0px);
    transition-delay: 0.3s;
    opacity: 1;
  }

  & .cart {
    transform: translateY(0px);
    transition-delay: 0.6s;
    opacity: 1;
  }
}
</style>