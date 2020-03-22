<template xmlns="http://www.w3.org/1999/html">
  <div class='main-panel'>

    <div class="tree-header-tool-panel">
      <el-button type='primary' size='mini'>刷新</el-button>
    </div>

    <div class="tree-header-panel">
      <span>实验</span>
      <span>权重</span>
      <span>域限定值</span>
      <span>值</span>
    </div>
    <div class="tree-panel">

      <ul>
        <li>
          <div><span>评估</span> <span>0</span> <span>0</span> <span>0</span></div>
          <ul>
            <li>
              <div><span>能力</span> <span>0.1</span> <span>0</span> <span>0</span></div>
              <ul>
                <li>
                  <div><span>效果</span> <span>0</span> <span>0</span> <span>0</span></div>
                  <ul>
                    <li>
                      <div><span>半径</span> <span>0</span> <span>0</span> <span>100</span></div>
                    </li>
                    <li>
                      <div><span>半径</span> <span>0</span> <span>0</span> <span>100</span></div>
                    </li>
                    <li>
                      <div><span>半径</span> <span>0</span> <span>0</span> <span>100</span></div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
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

    .tree-header-tool-panel {
      background: rgba(0, 0, 0, .2);
      padding: 5px;
    }

    .tree-header-panel {
      background: rgba(0, 0, 0, .1);
      display: flex;
      font-size: 18px;
      color: #606266;
      line-height: 1.5;

      &>span {
        &:nth-child(1) {
          flex: 1;
           text-align: center;
        }

        &+span {
          width: 100px;
          text-align: center;
        }
      }
    }

    .tree-panel {
      flex: 1;

      ul {
        font-size: 15px;
        color: #606266;
        padding-left: 1em;
        line-height: 1.5;
        background: rgba(255, 255, 255, .15);
        position: relative;

        .icon-btn-up {
          position: absolute;
          top: 5px;
          left: 4px;
          width: 16px;
          height: 10px;
          border: 5px solid transparent;
          border-left: 8px solid #333;
          box-sizing: border-box;
        }

        li {
          cursor: pointer;

          &>div {
            display: flex;
            &:hover{
              background: rgba(255,255,50,.5);
            }

            &>span {
              &:nth-child(1) {
                flex: 1;
              }

              &+span {
                width: 100px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>
