<template>
  <div class="card">
    <img @click="modal = !modal" id="myImg" :src="product.productImage" alt="testImages" />
    <div class="content">
      <h3>{{product.productName}}</h3>
    </div>
    <div v-if="modal" id="myModal" class="modal">
      <span @click="modal=!modal" class="close">&times;</span>
      <img class="modal-content" :src="product.productImage" id="img01" />
      <p>{{product.productName}}</p>

      <p style="color:red;">{{stringPrice(product.productPrice)}}원</p>
      <br />
      <p v-html="product.productDescription"></p>
      <br />
      <p>category : {{product.productCategory}}</p>
      <br />
      <br />
      <button @click="addCart">장바구니</button>
      <div id="caption"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["product"],
  data() {
    return {
      modal: false
    }
  },
  methods: {
    stringPrice(price) {
      let stringPrice = (price + "").split("").reverse()
      let result = ""

      while (stringPrice.length > 3) {
        let aa = String(stringPrice.splice(0, 3))
          .split(",")
          .join("")
        result += aa + ","
      }

      result += String(stringPrice)
        .split(",")
        .join("")

      return result
        .split("")
        .reverse()
        .join("")
    },
    addCart() {
      if (!this.$store.state.token) {
        console.log("no login")
        return
      }
      this.$axios
        .post("/api/user/cart", {
          u_id: this.$store.state.user._id,
          p_id: this.product._id
        })
        .then(r => {
          localStorage.setItem("user", JSON.stringify(r.data.user))
          this.$store.commit("getToken", r.data.user)
          this.modal = false

          console.log(r)
        })
        .catch(e => {
          alert(e)
        })
      // console.log(this.$store.state.user._id)
      // console.log(this.product._id)
    }
  },

  created() {
    // console.log(this.product)
    // console.log(this.product.productImage)
  }
}
</script>
<style lang="scss" scoped>
p {
  color: #fff;
}
button {
  color: red;
  border: 1px solid #fff;
}
.card {
  margin: 12px;
  width: 150px;
  height: 150px;
  // border: 1px solid black;
  border-radius: 5px;
}

.card img {
  padding: 0;
  border-radius: 5px;
  position: relative;
  width: 150px;
  height: 100px;
  opacity: 0.9;
  cursor: pointer;
  transition: 0.3s;
}
.card img:hover {
  opacity: 0.3s;
}

/* The Modal (background) */
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
#img01 {
  width: 50%;
  height: 40%;
}
/* Modal Content (image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}

/* Caption of Modal Image */
#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

/* Add Animation */
.modal-content,
#caption {
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* The Close Button */
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

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
  .modal p {
    width: 90%;
  }
}
</style>