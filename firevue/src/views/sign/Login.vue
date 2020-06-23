<template>
  <div id="login">
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
      <form id="dataForm">
        <h2>로그인</h2>

        <ValidationProvider v-slot="{ errors }" name="id" rules="required|max:20|min:6">
          <v-text-field
            v-model="formData.id"
            :counter="20"
            :error-messages="errors"
            label="id"
            required
            :filled="true"
            :rounded="true"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="pwd" rules="required|min:10">
          <v-text-field
            v-model="formData.pwd"
            type="Password"
            :error-messages="errors"
            label="password"
            :filled="true"
            :rounded="true"
            required
          ></v-text-field>
        </ValidationProvider>

        <v-btn class="mr-4" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { required, max, min } from "vee-validate/dist/rules"
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate"

setInteractionMode("eager")

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
})

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
})
extend("min", {
  ...min,
  message: "{_field_} may not be greater than {length} characters"
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      formData: {
        id: "",
        pwd: "",
        remember: true
      }
    }
  },
  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate() // boolean형으로 validate를 통과 여부 확인
      if (valid) {
        this.$axios.post("/api/sign/in", this.formData).then(r => {
          if (!r.data.success) return console.error(r.data.msg)
          localStorage.setItem("token", r.data.token)
          localStorage.setItem("user", JSON.stringify(r.data.user))
          this.$store.commit("getToken", r.data.user)

          this.$router.push("/")
        })
      }
    },
    clear() {
      this.formData.id = ""
      this.formData.pwd = ""
      this.$refs.observer.reset()
    }
  }
}
</script>
<style scoped>
h2 {
  margin-bottom: 18px;
}
#login {
  /* background: #e2e1e0; */
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: require();
}
#dataForm {
  background: #fff;
  border-radius: 5px;
  width: 500px;
  height: auto;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  opacity: 0.8;

  padding: 24px;
}

@media screen and (max-width: 768px) {
  #dataForm {
    width: 80vw;
    height: auto;
  }
}
</style>
