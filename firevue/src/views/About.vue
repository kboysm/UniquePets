<template>
  <div class="about">
    <div class="company">
      <h2>{{aboutUs.title}}</h2>
      <br />
      <p v-html="aboutUs.content"></p>
      <br />
      <br />
      <h2>회사 위치</h2>
      <br />
      <img :src="aboutUs.companyImg" alt="회사위치" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aboutUs: {}
    }
  },
  created() {
    this.$axios
      .get("/api/about/aboutUs")
      .then(r => {
        this.aboutUs = r.data[0]
        this.aboutUs.content = this.aboutUs.content.split("\n").join("<br />")
      })
      .catch(e => {
        alert(e)
      })
  }
}
</script>
<style scoped>
.about {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about .company {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  opacity: 0.8;
  padding: 24px;

  width: 65%;
  height: auto;
}
.about .company img {
  width: 50%;
  height: 30%;
}
</style>