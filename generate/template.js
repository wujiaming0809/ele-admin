module.exports = {
  vueTemplate: componentName => `<template>
  <div class="${componentName}">${componentName}</div>
</template>
<script>
import ${componentName} from '../../../api/${componentName}/${componentName}'
export default {
  name: '${componentName}',
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  activated() {},
  deactivated() {},
};
</script>

<style lang="scss" scoped>
</style>
`,
};
