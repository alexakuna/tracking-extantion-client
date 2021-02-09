<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div
      class="pre-loader"
      :class="{hide: isVisible}"
    >
      <Preloader/>
    </div>
    <div class="card-content">
      <span style="font-size: 20px" class="center">Что-бы начать пользоваться приложением необходима авторизация</span>
      <div class="input-field">
        <input
            id="seller"
            type="text"
            v-model.trim="seller"
            :class="{invalid: ($v.seller.$dirty && !$v.seller.required) || ($v.seller.$dirty && !$v.seller.seller)}"
        >
        <label for="seller">Имя</label>
        <small
            class="helper-text invalid"
            v-if="($v.seller.$dirty && !$v.seller.required)"
        >Поле email обязательно для заполнения
        </small>
        <small
            class="helper-text invalid"
            v-else-if="($v.seller.$dirty && !$v.seller.seller)"
        >Имя продавца обязательно
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
        >Поле Password не должно быть пустым
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Пароль должен иметь не менее символов. Сейчас {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div style="margin-bottom: 20px;">
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import Preloader from "@/components/preloader";
import messages from "@/utils/messages"
import {mapActions} from 'vuex'
const { required, minLength } = require('vuelidate/lib/validators')
export default {
  components: {
    Preloader
  },
  name: "login",
  data: () => ({
    seller: '',
    password: '',
    isVisible: true
  }),
  validations: {
    seller:{required},
    password: {required, minLength: minLength(6)}
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.isVisible = false
      try {
        const response = await this.$store.dispatch('login', {
          seller: this.seller,
          password: this.password,
          token: localStorage.getItem('token') || ''
        })
        if(response.status === 200) {
          if(response.data.token) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('seller-id', response.data.id)
            this.$router.push('/')
            this.isVisible = true
          }
        }
      } catch (e) {
        this.isVisible = true
        this.$error(e.response.data.message)
      }
    }
  },
  mounted() {
    if(messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  }
}
</script>

<style scoped>
.auth-card {
  width: 320px !important;
}
</style>
