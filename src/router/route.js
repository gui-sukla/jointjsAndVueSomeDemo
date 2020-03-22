/**
 * @Project Name: vue-admin
 * @Author: luichooy
 * @Date: 2018-01-17 15:01
 * @Email: luichooy@163.com
 * @Idea: WebStorm
 */

import Layout from 'src/pages/layout/layout';

// 不作为main组件子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('src/pages/login/login')
};

// 错误页面
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error'
  },
  component: () =>
    import('src/pages/error/index')
};

// 作为main组件子页面展示  但不在左侧菜单显示的路由卸载otherRoter里
export const otherRouter = {
  path: '',
  name: 'otherRouter',
  redirect: '/home',
  meta: {
    requireAuth: true
  },
  component: Layout,
  children: [{
    path: 'home',
    name: 'home',
    title: '首页',
    component: () => import('src/pages/home/home')
  }]
};

//业务相关
export const svgRouter = {
  path: '',
  name: 'svgRouter',
  redirect: '/svg',
  meta: {
    requireAuth: true
  },
  component: Layout,
  children: [
    {
      path: 'pinggurenwu',
      name: 'pinggurenwu',
      title: '评估任务',
      component: () => import('src/myPages/pinggurenwu')
    },
    {
      path: 'pinggujieduan',
      name: 'pinggujieduan',
      title: '评估阶段',
      component: () => import('src/myPages/pinggujieduan')
    },
    {
      path: 'pingguduixiang',
      name: 'pingguduixiang',
      title: '评估对象',
      component: () => import('src/myPages/pingguduixiang')
    },

    {
      path: 'pingguweidu',
      name: 'pingguweidu',
      title: '评估维度',
      component: () => import('src/myPages/pingguweidu')
    },
    {
      path: 'pinggufangan',
      name: 'pinggufangan',
      title: '评估方案',
      component: () => import('src/myPages/pinggufangan')
    },
    {
      path: 'yuchulidingyi',
      name: 'yuchulidingyi',
      title: '预处理定义',
      component: () => import('src/myPages/yuchulidingyi')
    },
    {
      path: 'shujuyuandingyi',
      name: 'shujuyuandingyi',
      title: '数据源定义',
      component: () => import('src/myPages/shujuyuandingyi')
    },
    {
      path: 'yuchuliyingshe',
      name: 'yuchuliyingshe',
      title: '预处理映射',
      component: () => import('src/myPages/yuchuliyingshe')
    },
    {
      path: 'yuchuliliuchengdingyi',
      name: 'yuchuliliuchengdingyi',
      title: '预处理流程定义',
      component: () => import('src/myPages/yuchuliliuchengdingyi')
    },
    {
      path: 'yuchulidaoruyingshe',
      name: 'yuchulidaoruyingshe',
      title: '预处理导入映射',
      component: () => import('src/myPages/yuchulidaoruyingshe')
    },
    {
      path: 'pinggushili',
      name: 'pinggushili',
      title: '评估实例',
      component: () => import('src/myPages/pinggushili')
    },
    {
      path: 'shili',
      name: 'shili',
      title: '实例1',
      component: () => import('src/myPages/shili')
    },

    {
      path: 'primary',
      name: 'primary',
      title: '元',
      component: () => import('src/myPages/svg/svgPrimary')
    },

    {
      path: 'svg',
      name: 'svg',
      title: '绘图',
      component: () => import('src/myPages/svg/basic')
    },
    {
      path: 'svg1',
      name: 'svg1',
      title: '上下解构图',
      component: () => import('src/myPages/svg/svg1')
    }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
    path: '/tables',
    name: 'tables',
    title: '表格管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [{
        path: 'basic',
        name: 'basic',
        title: '基本表格',
        component: () => import('src/pages/tables/basic')
      },
      {
        path: 'sort',
        name: 'sort',
        title: '排序表格',
        component: () => import('src/pages/tables/sort')
      },
      {
        path: 'filter',
        name: 'filter',
        title: '筛选表格',
        component: () => import('src/pages/tables/filter')
      }
    ]
  },
  {
    path: '/charts',
    name: 'charts',
    title: 'echarts图表',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [{
        path: 'bar',
        name: 'bar',
        title: '柱状图',
        component: () => import('src/pages/charts/bar')
      },
      {
        path: 'line',
        name: 'line',
        title: '折线图',
        component: () => import('src/pages/charts/line')
      },
      {
        path: 'pie',
        name: 'pie',
        title: '饼图',
        component: () => import('src/pages/charts/pie')
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    title: '表单管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [{
      path: 'render',
      name: 'render',
      title: '渲染表单',
      component: () => import('src/pages/form/render/render')
    }]
  },
  {
    path: '/system',
    name: 'system',
    title: '系统管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [{
      path: 'index',
      name: 'system_index',
      title: '系统管理',
      component: () => import('src/pages/system/index/index')
    }]
  },
  {
    path: '/user',
    name: 'user',
    title: '用户管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [{
      path: 'index',
      name: 'user_index',
      title: '用户管理',
      component: () => import('src/pages/user/index')
    }]
  },
  {
    path: '/access',
    name: 'access',
    title: '权限管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [{
      path: 'index',
      name: 'access_index',
      title: '权限管理',
      component: () => import('src/pages/access/index')
    }]
  },
  {
    path: '/log',
    name: 'log',
    title: '日志管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [{
      path: 'index',
      name: 'log_index',
      title: '操作日志',
      component: () => import('src/pages/log/index')
    }]
  },
  {
    path: '/test',
    name: 'test',
    title: '测试',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [{
      path: 'index',
      name: 'test_index',
      title: '测试',
      component: () => import('src/pages/test/test')
    }]
  }
];

export const routers = [
  loginRouter,
  errorRouter,
  otherRouter,
  svgRouter,
  ...appRouter
];
