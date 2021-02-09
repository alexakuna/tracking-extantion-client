<template>
  <div
    class="sidenav app-sidenav"
    :class="{open: !value}"
    style="top: 30px !important;"
  ><ul>
    <li>test</li>
    <li>test</li>
    <li>test</li>
    <li>test</li>
  </ul></div>
</template>

<script>
export default {
  props: ['value'],
  name: "sidebar"
}
</script>

