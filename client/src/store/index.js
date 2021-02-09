import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth";
import main from "@/store/main";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isVisible: true,
    shops: [],
    data: ''
  },
  mutations: {
    SHOP_NAMES(store, shops) {
      store.shops = shops
    },
    DATA_SHOP(store, data) {
      store.data = data
    }
  },
  actions: {
    LOGOUT() {
      axios.post('http://localhost:3000/api/auth/logout', {id: localStorage.getItem('seller-id')})
          .then(data => {
            localStorage.clear()
            router.push('/login?message=logout')
          })
          .catch(e => console.log(e))
    },
    async GET_DATA({commit}, data) {
      return await axios.post('https://api.seller-online.com/orders', data, {headers: {'Api-Key': 'ARCtR2|sF97{EjSFky838jo#qMtS5qe~4Pzviv3M'}})
          .then(data => commit('DATA_SHOP', data.data))
          .catch(err => console.log(err))
    }
  },
  getters: {
    MODAL(state) {
      return state.isVisible
    },
    SHOPS(state) {
      return state.shops
    },
    DATA(state) {
      return state.data
    }
  },
  modules: {
    auth,
    main
  }
})
