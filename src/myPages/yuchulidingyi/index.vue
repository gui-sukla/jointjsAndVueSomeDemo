<template xmlns="http://www.w3.org/1999/html">
  <div class='main-panel'>

    <div class="tab-panel">
      <div class='tab-box'>
        <span class='tab-btn active-tab'>数据属性</span><span class='tab-btn'>数据值</span>
      </div>
      <div class='btn-box'>
        <el-button type='primary' size='mini'>添加</el-button>
        <el-button type='danger' size='mini'>删除</el-button>
        <el-button type='success' size='mini'>保存</el-button>
      </div>
    </div>

    <div class="grid-panel">
      <table>
        <tr>
          <th>列号</th>
          <th>列名称</th>
          <th>列类型</th>
        </tr>
        <tr v-for="count in 15">
          <td>0</td>
          <td>半径</td>
          <td>double</td>
        </tr>
      </table>
    </div>

  </div>

</template>

<script>
  export default {
    components: {

    },
    data() {
      return {

      };
    },
    mounted: function() {

    },
    computed: {},
    created() {},
    methods: {
      init() {

      }
    }
  }
</script>


<style lang='scss' scoped>
  .main-panel {
    flex: 1;
    display: flex;
    flex-direction: column;

    .tab-panel {
      display: flex;
      border-bottom: 2px solid rgba(0, 0, 0, .3);

      .tab-box {
        flex: 1;

        .tab-btn {
          display: inline-block;
          padding: 0 10px;
          margin: 0;
          line-height: 40px;
          height: 100%;
          font-size: 16px;
          color: #606266;
          border: 2px solid transparent;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-bottom-width: 1px;
          box-sizing: border-box;
          position: relative;
          top: 1px;
          cursor: pointer;

          &:hover {
            background: rgba(255, 255, 255, .3);
          }

          &.active-tab {
            border-color: rgba(0, 0, 0, .3);
          }
        }

      }

      .btn-box {
        background: rgba(0, 0, 0, .5);
        border-radius: 5px;
        padding: 5px;
      }
    }

    .grid-panel {
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
</style>
