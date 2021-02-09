<template>
  <div class="app-main-layout">
    <navbar @click="isOpen = !isOpen"/>
<!--    <sidebar v-model="isOpen"/>-->

    <main class="app-content row" :class="{full: isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import sidebar from "@/components/sidebar";

export default {
  name: "mainLayout",
  data: () => ({
    isOpen: true
  }),
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function () {
      this.isOpen = !this.isOpen
    }
  },
  components: {navbar, sidebar}
}
</script>

