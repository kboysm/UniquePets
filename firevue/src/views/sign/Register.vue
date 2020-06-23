<template>
  <div id="login">
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
      <form id="dataForm">
        <h2>회원가입</h2>
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
        <ValidationProvider v-slot="{ errors }" name="name" rules="required">
          <v-text-field
            v-model="formData.name"
            :error-messages="errors"
            label="name"
            :filled="true"
            :rounded="true"
            required
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="age" rules="required">
          <v-text-field
            v-model="formData.age"
            type="number"
            :error-messages="errors"
            label="age"
            :filled="true"
            :rounded="true"
            required
          ></v-text-field>
        </ValidationProvider>
        <vue-recaptcha
          v-if="!formData.response"
          ref="recaptcha"
          :sitekey="$cfg.recaptchaSiteKey"
          size="visible"
          @verify="onVerify"
          @expired="onExpired"
        ></vue-recaptcha>
        <v-btn class="mr-4" @click="checkRobot()">submit</v-btn>
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
        age: 0,
        name: "",
        response: ""
      }
    }
  },
  methods: {
    onVerify(r) {
      this.formData.response = r
      this.$refs.recaptcha.reset()
      // this.submit()
    },
    onExpired() {
      this.formData.response = ""
      this.$refs.recaptcha.reset()
    },
    checkRobot() {
      if (this.formData.response) this.submit()
      else this.$refs.recaptcha.execute()
    },

    submit() {
      this.$refs.observer
        .validate()
        .then(r => {
          if (!r) throw new Error("모두 기입해주세요")
          return this.$axios.post("/api/register", this.formData)
        })
        .then(r => {
          if (!r.data.success) throw new Error("서버가 거부했습니다.")
          console.log("가입 완료 되었습니다.")
          this.$router.push("/login")
        })
        .catch(e => console.log(e.message, "warning"))
    },
    clear() {
      this.formData.name = ""
      this.formData.id = ""
      this.formData.age = 0
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
