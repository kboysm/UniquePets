<template>
  <div>
    <h1>My Page</h1>
    <div id="mypage">
      <MypageNav @viewList="viewList" />
      <MypageMain :mypageNav="mypageNav" />
    </div>
  </div>
</template>
<script>
import MypageMain from "./MyPageMain"
import MypageNav from "./MyPageNav"
export default {
  components: {
    MypageNav,
    MypageMain
  },
  data() {
    return {
      mypageNav: [0, 0, 0]
    }
  },
  methods: {
    viewList(item) {
      this.mypageNav = item
    }
  }
}
</script>
<style scoped>
#mypage {
  margin-top: 12px;
  display: flex;
}
</style>