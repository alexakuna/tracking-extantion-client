<template>
  <div id="app" style="position: relative; min-width: 768px">
    <div
        class="pre-loader"
        :class="{hide: isVisible}"
    >
      <Preloader/>
    </div>
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>
<script>
import emptyLayout from '@/layouts/emptyLayout'
import mainLayout from '@/layouts/mainLayout'
import Preloader from '../src/components/preloader'
import {mapState} from 'vuex'

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    ...mapState(['isVisible'])
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function () {
      console.log('test')
    }
  },
  components: {
    emptyLayout, mainLayout, Preloader
  }
}
</script >
<style lang="scss">

@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
.app-page {
  padding: 2rem 0 !important;
}
nav {
  line-height: 0 !important;
  background-color: darkblue;
}
.pre-loader {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: aliceblue;
  z-index: 9999;
  opacity: 0.7;
}
@media only screen and (max-width:425px) {
  h1 {
    font-size: 28px !important;
  }
  h3 {
    font-size: 25px !important;
  }
}
</style>
