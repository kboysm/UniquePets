<template>
  <div class="container">
    {{address}}
    <br />
    {{center}}
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          id="autoComplete"
          :value="address"
          @input="address = $event.target.value"
          @place_changed="setPlace"
          :options="{fields: ['geometry']}"
        ></gmap-autocomplete>
        <button v-if="trig" @click="addMarker">수정</button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-marker :position="marker.position" @click="center=marker.position"></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      trig: false,
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      address: "대한민국 서울시",
      center: { lat: 45.508, lng: -73.587 },
      marker: {},
      places: [],
      currentPlace: null
    }
  },

  mounted() {
    this.geolocate()
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.trig = true
      this.currentPlace = place
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.marker = { position: marker }
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
        this.$emit("updateAddress", {
          address: this.address,
          center: this.center
        })
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  background-color: #fff;
}
.container #autoComplete {
  width: 50%;
}
</style>