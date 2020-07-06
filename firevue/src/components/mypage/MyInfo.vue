<template>
  <article class="userInfo">
    <img v-if="!uploadImageFile" :src="viewImg" alt="userImage" />
    <img v-else :src="viewImg" alt="userImage" />

    <div class="infoContainer">
      <section>이름 : {{$store.state.user.name}}</section>
      <section>나이 : {{$store.state.user.age}}</section>
      <section>id : {{$store.state.user.id}}</section>
      <section>point : {{$store.state.user.point}}</section>
      {{pointCharging}}
      <label>
        충전 할 포인트 :
        <form>
          <input v-model="pointCharging" style="border:1px solid black;" type="number" />
        </form>
        <button @click="chargingPoint">충전하기</button>
      </label>
      <section>
        address : {{$store.state.user.address}}
        <button @click="modal=!modal">수정</button>
      </section>

      <button v-if="!passwordModal" @click="passwordModal = !passwordModal">비밀번호변경</button>
      <label v-if="passwordModal">
        변경하실 비밀번호 :
        <form>
          <input v-model="updatePasswordData" style="border:1px solid black;" type="password" />
        </form>
        <button @click="updatePassword">변경</button>
      </label>
      <br />
      <form onsubmit="return false;">
        <input
          type="file"
          id="ex_file"
          ref="uploadImageFile"
          @change="onFileSelected"
          accept="image/*"
        />
        <input v-if="uploadImageFile" @click="onSave" type="submit" value="저장" />
      </form>
    </div>
    <div v-if="modal" id="myModal" class="modal">
      <span @click="modal=!modal" class="close">&times;</span>
      <GoogleMap
        :beforeAddress="$store.state.user.address"
        :beforeMarker="$store.state.user.center"
        @updateAddress="updateAddress"
      />
    </div>
  </article>
</template>
<script>
import GoogleMap from "../googleMap/GoogleMap.vue"
export default {
  name: "MyInfo",
  components: { GoogleMap },
  data() {
    return {
      modal: false,
      passwordModal: false,
      updatePasswordData: "",
      pointCharging: 0,
      viewImg: "",
      uploadImageFile: ""
    }
  },
  created() {
    if (!this.$store.state.user.img) {
      this.viewImg = "https://image.flaticon.com/icons/svg/149/149992.svg"
    } else {
      this.viewImg =
        "http://localhost:3000/userImg/" + this.$store.state.user.img
    }
  },
  methods: {
    onFileSelected(event) {
      this.uploadImageFile = this.$refs.uploadImageFile.files[0] //3번
      this.viewImg = URL.createObjectURL(this.uploadImageFile) // 이미지 미리보기 구현
    },
    async onSave() {
      const fd = new FormData() //반드시 필요
      fd.append("upLoadImage", this.uploadImageFile) //4번
      fd.append("_id", this.$store.state.user._id) //4번
      await this.$axios
        .post("/api/user/userImage", fd)
        .then(r => {
          localStorage.setItem("user", JSON.stringify(r.data.user))
          this.$store.commit("getToken", r.data.user)
        })
        .catch(e => {
          alert(e)
        })
    },
    chargingPoint() {
      if (this.pointCharging < 0) {
        alert("0보다 낮은 금액은 충전할 수 없습니다")
        return
      }
      const backendData = {
        _id: this.$store.state.user._id,
        point: this.pointCharging
      }
      this.$axios
        .post("/api/user/update/payment", backendData)
        .then(r => {
          localStorage.setItem("tid", r.data.tid)
          this.$store.commit("getTid", r.data.tid)
          window.location.replace(r.data.next_redirect_pc_url)
        })
        .catch(e => {
          alert("에러가 발생했습니다. 다시 시도해주세요")
          this.$router.push("/")
        })
    },
    updateAddress(item) {
      this.modal = false
      item._id = this.$store.state.user._id
      this.$axios
        .post("/api/user//update/address", item)
        .then(r => {
          localStorage.setItem("user", JSON.stringify(r.data.user))
          this.$store.commit("getToken", r.data.user)
        })
        .catch(e => {
          alert(e)
        })
    },
    updatePassword() {
      this.$axios
        .post("/api/user/update/password", {
          _id: this.$store.state.user._id,
          password: this.updatePasswordData
        })
        .then(r => {
          if (r.data.success) {
            this.passwordModal = false
            alert(r.data.msg)
          }
        })
        .catch(e => {
          alert(e)
        })
    }
  }
}
</script>
<style scoped>
.userInfo {
  display: flex;
}

.userInfo img {
  width: 30%;
  border: 1px solid black;
  border-radius: 12px;
}

.userInfo .infoContainer {
  width: 70%;
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