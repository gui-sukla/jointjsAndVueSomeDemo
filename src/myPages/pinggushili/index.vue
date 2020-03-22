<template xmlns="http://www.w3.org/1999/html">
  <div class='main-panel'>

    <div class="grid-btn-panel">
      <el-button type='primary'>添加</el-button>
      <el-button type='primary'>保存</el-button>
    </div>

    <div class="grid-panel">
      <table>
        <tr>
          <th>实例</th>
          <th>描述</th>
        </tr>
        <tr v-for="i in 10">
          <td>0</td>
          <td>0</td>
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

    .grid-btn-panel {
      padding: 5px;
      background: rgba(0, 0, 0, .2);
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
