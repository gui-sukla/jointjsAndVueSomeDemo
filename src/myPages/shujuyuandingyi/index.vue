<template xmlns="http://www.w3.org/1999/html">
  <div class='main-panel'>

    <div class="search-panel">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="数据库类型">
              <el-select placeholder="请选择数据库类型">
                <el-option label="ORACLE" value="ORACLE"></el-option>
                <el-option label="MYSQL" value="MYSQL"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主机地址">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="端口号">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="数据库名称">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type='primary'>应用</el-button>
    </div>

    <div class="grid-panel">

      <div class='gird-tools-panel'>
        <el-checkbox v-model="checked">筛选数据</el-checkbox>
      </div>

      <div class="gird-tab-panel">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="事件1.CSV" name="first">
            <div class='table-panel'>
              <table>
                <tr>
                  <th><el-checkbox></el-checkbox>Time</th>
                  <th><el-checkbox></el-checkbox>ID</th>
                  <th><el-checkbox></el-checkbox>Flag</th>
                </tr>
                <tr v-for="count in 15">
                  <td>0</td>
                  <td>9999</td>
                  <td>1</td>
                </tr>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="事件2.CSV" name="second">事件2.CSV</el-tab-pane>
          <el-tab-pane label="事件3.CSV" name="third">事件3.CSV</el-tab-pane>
          <el-tab-pane label="事件4.CSV" name="fourth">事件4.CSV</el-tab-pane>
        </el-tabs>
      </div>

    </div>

    <div class='commit-panel'>
      <el-button type='success'>保存</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        activeName: 'first',
        checked: '',
        value: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      };
    },
    mounted: function() {

    },
    computed: {},
    created() {},
    methods: {
      init() {

      },
      handleClick() {}
    }
  }
</script>


<style lang='scss' scoped>
  .main-panel {
    flex: 1;
    display: flex;
    flex-flow: column;

    .search-panel {
      display: flex;
      padding-right: 20px;

      .el-form {
        margin-right: 20px;
        flex: 1;

        .el-form-item {
          margin: 0;

          .el-select {
            width: 100%;
          }
        }
      }

    }


    .grid-panel {
      flex: 1;

      .gird-tools-panel {
        padding: 10px;
        background: rgba(255, 255, 255, .2);
      }

      .table-panel {
        flex: 1;

        table {
          width: 100%;
          color: #333;
          font-size: 16px;
          border-collapse: collapse;

          tr {
            padding: 0;
            line-height: 2;
            background: rgba(0, 0, 200, .1);

            &:nth-child(even) {
              background: rgba(255, 255, 255, .3);
            }

            th,
            td {
              border: 1px solid rgba(100, 100, 100, .2);
            }

            td {
              &:nth-child(1) {
                text-align: center;
              }
            }
          }
        }
      }
    }

    .commit-panel {
      padding: 10px;
      background: rgba(0, 0, 0, .3);
      display: flex;
      flex-direction: row-reverse;
    }

  }
</style>
