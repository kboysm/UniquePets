<template>
  <div class="container">
    <div class="card">
      <h3 class="title">Card 1</h3>
    </div>
    <div class="card">
      <h3 class="title">Card 2</h3>
    </div>
    <div class="card">
      <h3 class="title">Card 3</h3>
    </div>
    <div class="card">
      <h3 class="title">Card 4</h3>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.container {
  position: relative;
  height: 300px;
  width: 600px;
  top: 60px;
  left: calc(50% - 300px);
  display: flex;
}

.card {
  display: flex;
  height: 280px;
  width: 200px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -1rem 0 3rem #000;
  /*   margin-left: -50px; */
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
}

.card:not(:first-child) {
  margin-left: -50px;
}

.card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}

.card:hover ~ .card {
  position: relative;
  left: 50px;
  transition: 0.4s ease-out;
}

.title {
  color: white;
  font-weight: 300;
  position: absolute;
  left: 20px;
  top: 15px;
}

.card:hover .filledbar {
  width: 120px;
  transition: 0.4s ease-out;
}

.card:hover .stroke {
  stroke-dashoffset: 100;
  transition: 0.6s ease-out;
}
</style>