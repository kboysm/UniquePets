<template>
  <div id="mypage">
    <header>
      <h2>My Page</h2>
    </header>

    <section>
      <nav>
        <ul>
          <li>
            <a @click="navTrigger(0)">내 정보</a>
          </li>
          <li>
            <a @click="navTrigger(1)">장바구니</a>
          </li>
          <li>
            <a @click="navTrigger(2)">주문목록</a>
          </li>
        </ul>
      </nav>

      <MyInfo v-if="MyInfoTrig" />
      <UserCart v-if="OrderListTrig" />
      <OrderList v-if="UserCartTrig" />
    </section>
  </div>
</template>
<script>
import MyInfo from "@/components/mypage/MyInfo.vue"
import OrderList from "@/components/mypage/OrderList.vue"
import UserCart from "@/components/mypage/UserCart.vue"
export default {
  components: { MyInfo, UserCart, OrderList },
  data() {
    return {
      MyInfoTrig: true,
      OrderListTrig: false,
      UserCartTrig: false
    }
  },
  methods: {
    navTrigger(idx) {
      switch (idx) {
        case 0:
          this.MyInfoTrig = true
          this.OrderListTrig = false
          this.UserCartTrig = false
          break
        case 1:
          this.MyInfoTrig = false
          this.OrderListTrig = true
          this.UserCartTrig = false
          break
        case 2:
          this.MyInfoTrig = false
          this.OrderListTrig = false
          this.UserCartTrig = true
          break
      }
    }
  }
}
</script>
<style scoped>
#mypage {
  box-sizing: border-box;
}

/* Style the header */
#mypage header {
  background-color: #666;
  padding: 30px;
  text-align: center;
  font-size: 35px;
  color: white;
  opacity: 0.8;
}

/* Create two columns/boxes that floats next to each other */
#mypage nav {
  float: left;
  width: 25%;
  height: 300px; /* only for demonstration, should be removed */
  padding: 20px;

  position: sticky;
  top: 220px;
  left: 25px;

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
/* #mypage section nav ul {
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
} */

/* Style the list inside the menu */
#mypage nav ul {
  list-style-type: none;
  padding: 0;
}

#mypage article {
  float: left;
  padding: 20px;
  width: 50%;
  background-color: #f1f1f1;
  height: 500px; /* only for demonstration, should be removed */

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

/* Style the footer */

/* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */
@media (max-width: 600px) {
  #mypage nav {
    margin: 10px;
    float: left;
    width: 100%;
    height: auto;
  }
  #mypage section {
    float: left;
    display: block;
    width: 100%;
    height: auto;
  }
  #mypage article {
    margin: 10px;
    width: 100%;
    height: auto;
  }
}
</style>