import Vue from 'vue';
import Router from 'vue-router';

import Search from './Search';
import VirtualScroll from './VirtualScroll';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('../views/index.vue'),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('../views/Home/index.vue'),
          meta: {
            title: '首页',
            icon: 'el-icon-s-home',
          },
        },
        Search,
        VirtualScroll,
      ],
    },
  ],
});

export default router;
