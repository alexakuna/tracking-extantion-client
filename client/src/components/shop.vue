<template>
<div>
  <div class="header-wrapper">
    <span> Всего заказов: {{data.orders_total}}</span>
  </div>
  <table>
    <thead>
    <tr>
      <th>Имя покупателя</th>
      <th>Наименование</th>
      <th>Номер отслеживания</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(order, index) in data.orders" :key="index">
      <td>{{order.buyerName}}</td>
      <td>{{order.title}}</td>
      <td>{{order.trackNumbers === null ? 'Трек номер отсутствует' : order.trackNumbers[0].number}}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
name: "shop",
  props: ["data"],
  computed: {
  },
  methods: {

  },
  mounted() {
  }
}
</script>

<style scoped>
.header-wrapper {
  padding: 0.5em 0.5rem;
}
</style>
