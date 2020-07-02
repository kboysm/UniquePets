<template>
  <div class="container">selectedQuestion</div>
</template>
<script>
export default {
  created() {
    console.log(this.$route.params.SelectedQuestion)
  }
}
</script>
<style lang="scss" scoped>
</style>