<template>
  <nav style="height: 30px !important;padding: 0 0.7rem;
" class="navbar">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <div> Всего заказов: {{DATA.orders_total}} |</div>
        <div style="margin-left: 5px">{{ new Date() | dateFormat('DD.MM.YYYY') }}</div>
<!--        <a href="#" @click.prevent="$emit('click')">-->
<!--          Меню-->
<!--        </a>-->
      </div>
      <div class="logout-wrapper">
        <a @click.prevent="LOGOUT" href="#">Выход</a>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "navbar",
  computed: {
    ...mapGetters(['DATA'])
  },
  methods: {
    ...mapActions(['LOGOUT'])
  }
}
</script>
