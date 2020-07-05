<template>
  <div>
    <h1>point 충전 완료</h1>
  </div>
</template>
<script>
export default {
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      const pg_token = this.$route.query.pg_token

      this.$axios
        .post(`/api/user/payment/approval`, {
          pg_token,
          tid: this.$store.state.tid,
          _id: this.$store.state.user._id
        })
        .then(res => {
          // this.getUser()
          localStorage.setItem("user", JSON.stringify(res.data.user))
          this.$store.commit("getToken", res.data.user)
        })
        .catch(err => {
          console.log(err)
        })
    }
    // getUser() {
    //   this.$axios(`/api/user/${this.$store.state.user._id}`).then(r => {
    //     localStorage.setItem("user", JSON.stringify(r.data))
    //     this.$store.commit("getToken", r.data)
    //   })
    // }
  }
}
</script>