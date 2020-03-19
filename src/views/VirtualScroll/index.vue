<template>
  <div ref="list" class="infinite-list-container">
    <div class="infinite-list-phantom"></div>
    <div class="infinite-list">
      <div ref="items" class="infinite-list-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualScroll',
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
  },
  created() {
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>
