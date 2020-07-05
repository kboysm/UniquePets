<template>
  <article class="userInfo">
    <img src="https://image.flaticon.com/icons/svg/149/149992.svg" alt="userImage" />
    <div class="infoContainer">
      <section>이름 : {{$store.state.user.name}}</section>
      <section>나이 : {{$store.state.user.age}}</section>
      <section>id : {{$store.state.user.id}}</section>
      <section>
        address : {{$store.state.user.address}}
        <button @click="modal=!modal">수정</button>
      </section>
      <button>비밀번호변경</button>
    </div>
    <div v-if="modal" id="myModal" class="modal">
      <span @click="modal=!modal" class="close">&times;</span>
      <gmap-autocomplete
        @place_changed="setPlace"
        class="form-input"
        style="background-color:#fff;"
      ></gmap-autocomplete>
      <GmapMap
        :center="mapCenter"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
      ></GmapMap>
    </div>
  </article>
</template>
<script>
export default {
  name: "MyInfo",
  data() {
    return {
      modal: false,
      mapCenter: { lat: 10, lng: 10 }
    };
  },
  methods: {
    setPlace(location) {
      console.log(location);
      this.mapCenter = {
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lat()
      };
    }
  }
};
</script>
<style scoped>
.googleMap {
  height: 500px;
}
.userInfo {
  display: flex;
}

.userInfo img {
  border: 1px solid black;
  border-radius: 12px;
}

.userInfo .infoContainer {
  width: 100%;
  padding: 12px;
}

.userInfo .infoContainer section {
  width: 100%;
  background-color: #e2e2e2;
  border-radius: 5px;
  margin: 12px;
}
.userInfo .infoContainer section button {
  float: right;
  color: red;
  margin-right: 3px;
}
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
</style>