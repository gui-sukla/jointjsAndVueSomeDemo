<template>
  <div class="main-panel">

    <div class="main-left-panel">
      <MenuList></MenuList>
    </div>
    <router-view class="main-right-panel"></router-view>
  </div>
</template>
<script>
  import {
    sessionStorage
  } from 'src/assets/js/storage';
  import MenuList from 'src/components/MenuList';

  export default {
    components: {
      MenuList
    },
    created() {
      this.checkAuth();
    },
    data() {
      return {
        sider_menu_data: [{
            path: '/home',
            title: '首页',
            icon: 'el-icon-adm-home'
          },
          {
            path: '/tables',
            title: '表格管理',
            icon: 'el-icon-adm-linechart',
            children: [{
                path: '/tables/basic',
                title: '基本表格'
              },
              {
                path: '/tables/sort',
                title: '排序表格'
              },
              {
                path: '/tables/filter',
                title: '筛选表格'
              }
            ]
          },
          {
            path: '/charts',
            title: '图表管理',
            icon: 'el-icon-adm-statistics',
            children: [{
                path: '/charts/bar',
                title: '柱状图'
              },
              {
                path: '/charts/line',
                title: '折线图'
              },
              {
                path: '/charts/pie',
                title: '饼图'
              }
            ]
          },
          {
            path: '/form',
            title: '表单管理',
            icon: 'el-icon-adm-form',
            children: [{
              path: '/form/render',
              title: '渲染表单'
            }]
          },
          {
            path: '/system/index',
            title: '系统管理',
            icon: 'el-icon-adm-project'
          },
          {
            path: '/user/index',
            title: '用户管理',
            icon: 'el-icon-adm-user'
          },
          {
            path: '/access/index',
            title: '权限管理',
            icon: 'el-icon-adm-organization'
          },
          {
            path: '/log/index',
            title: '操作日志',
            icon: 'el-icon-adm-log'
          },
          {
            path: '/test/index',
            title: '测试',
            icon: 'el-icon-adm-formsetup'
          }
        ],
        isCollapsed: false,
        adminMenuShow: false
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      checkAuth() {
        let token = this.$store.state.token || sessionStorage.getItem('token');
        if (!token) {
          this.$router.replace('/login');
        } else {
          this.getUser();
        }
      },
      getUser() {
        let User = {
          id: '7f859967-9b12-441c-badc-8a7d312f6da4',
          username: 'admin',
          name: 'luichooy',
          type: {
            code: 0,
            name: '超级管理员'
          }
        };

        this.$store.commit('SET_USER', User);
      },
      handleCommand(command) {
        console.log(command);
      },
      toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.$store.commit('SET_TOKEN', '');
            this.$store.commit('SET_USER', null);
            this.$router.replace({
              path: '/login'
            });
          })
          .catch(() => {
            return false;
          })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/styles/variable';

  html,
  body {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;;
  }
</style>


<style lang="scss" scoped>
  .main-panel {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #10605a;
    display: flex;
    border: 1px solid cyan;
    padding: 3px;


    .main-left-panel {
      width: 250px;
      margin-right: 5px;
    }

    .main-right-panel {
      display: flex;
      flex: 1;
      box-sizing: border-box;
      border: 1px solid cyan;
    }
  }
</style>
