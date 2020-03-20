/**
 * Created by wujiaming on 2020/3/13
 * */
module.exports = {
  vueTemplate: componentName => `<template>
  <div class="${componentName}">${componentName}</div>
</template>
<script>
export default {
  name: '${componentName}',
};
</script>

<style lang="scss" scoped>
</style>
`,
};
