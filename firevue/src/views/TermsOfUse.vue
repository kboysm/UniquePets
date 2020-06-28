<template>
  <div class="terms">
    <div class="container">
      <h2>{{terms.title}}</h2>
      <br />
      <p v-html="terms.content"></p>
      <br />
      <br />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      terms: {}
    }
  },
  created() {
    this.$axios.get("/api/termsOfUse/Terms").then(r => {
      this.terms = r.data[0]
      this.terms.content = this.terms.content.split("\n").join("<br />")
    })
  }
}
</script>
<style scoped>
.terms {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.terms .container {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  opacity: 0.8;
  padding: 24px;

  width: 65%;
  height: auto;
}
</style>