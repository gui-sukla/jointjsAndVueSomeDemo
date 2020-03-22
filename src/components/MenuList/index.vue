<template>
  <div class='menu-list-panel'>
    <div class='menu-tools'>
      <el-button size='mini' type='primary'>添加</el-button>
      <el-button size='mini' type='danger'>删除</el-button>
      <el-button size='mini' type='primary'>刷新</el-button>
      <el-button size='mini' type='success'>保存</el-button>
    </div>
    <div class='search-tools'>
      <input type="text">
      <el-button type='primary'>搜索</el-button>
    </div>
    <div class='tree-list-panel'>
      <ul>
        <span class="icon-btn-up"></span>
        <li>
          指标体系构建
          <ul>
             <span class="icon-btn-up"></span>
            <li>
              <div @click="goto">评估任务</div>
              <ul>
                 <span class="icon-btn-up"></span>
                <li>
                  <div @click="goto">评估阶段1</div>
                  <ul>
                     <span class="icon-btn-up"></span>
                    <li>
                      <div @click="goto">评估对象1</div>
                      <ul>
                        <li>
                          <div @click="goto">评估维度1</div>
                        </li>
                        <li>评估维度2</li>
                        <li>评估维度n</li>
                        <li>
                          <div @click="goto">评估方案</div>
                          <ul>
                             <span class="icon-btn-up"></span>
                            <li>
                              <div @click="goto">预处理定义</div>
                              <ul>
                                <li>
                                  <div @click="goto">数据源定义</div>
                                </li>
                                <li>
                                  <div @click="goto">预处理映射</div>
                                </li>
                                <li>
                                  <div @click="goto">预处理流程定义</div>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <div @click="goto">预处理导入映射</div>
                            </li>
                            <li>
                              <div @click="goto">评估实例</div>
                              <ul>
                                 <span class="icon-btn-up"></span>
                                <li>
                                  <div @click="goto">实例1</div>
                                </li>
                                <li>实例2</li>
                                <li>实例n</li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>评估对象2</li>
                    <li>评估对象n</li>
                  </ul>
                </li>
                <li>评估阶段2</li>
                <li>评估阶段n</li>
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
    name: 'menu-list',
    data() {
      return {}
    },

    mounted: function() {},
    methods: {
      goto(evt) {
        let pathMap = {
          '评估任务': 'pinggurenwu',
          '评估阶段1': 'pinggujieduan',
          '评估对象1': 'pingguduixiang',
          '评估维度1': 'pingguweidu',
          '评估方案': 'pinggufangan',
          '预处理定义': 'yuchulidingyi',
          '数据源定义': 'shujuyuandingyi',
          '预处理映射': 'yuchuliyingshe',
          '预处理流程定义': 'yuchuliliuchengdingyi',
          '预处理导入映射': 'yuchulidaoruyingshe',
          '评估实例': 'pinggushili',
          '实例1': 'shili',
        }

        let path = pathMap[evt.target.innerText]
        this.$router.replace(path);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu-list-panel {
    font-family: "microsoft yahei";

    .menu-tools {
      border-bottom: 2px solid transparent;

      button {
        font-size: 14px;
        margin-left: 3px;
      }
    }


    .search-tools {
      display: flex;
    }


    .tree-list-panel {
      ul {
        font-size: 14px;
        color: #606266;
        padding-left: 1em;
        line-height: 1.5;
        background: rgba(255, 255, 255, .15);
        position: relative;
        .icon-btn-up{
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
        }
      }
    }
  }
</style>
