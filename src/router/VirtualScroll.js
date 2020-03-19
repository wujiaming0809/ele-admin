/**
 * Created by wujiaming on 2020/3/16
 * */

const VirtualScroll = () => import('../views/VirtualScroll/index');

export default {
  path: '/virtualScroll',
  name: 'VirtualScroll',
  component: VirtualScroll,
  meta: {
    title: '虚拟滚动',
    icon: 'el-icon-collection',
  },
  children: [],
};
