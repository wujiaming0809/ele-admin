module.exports = {
  routerTemplate: componentName => `const ${componentName} = () => import('../views/${componentName}/${componentName}.vue');

export default {
  path: '/${componentName}',
  name: '${componentName}',
  component: Search,
  meta: {
    title: '${componentName}',
    icon: '',
  },
  children: [],
};`,
};
