/**
 * Created by wujiaming on 2020/3/16
 * */

const Search = () => import('../views/Search/index.vue');

export default {
  path: '/search',
  name: 'Search',
  component: Search,
  meta: {
    title: '搜索组件',
    icon: 'el-icon-table-lamp',
  },
  children: [],
};
