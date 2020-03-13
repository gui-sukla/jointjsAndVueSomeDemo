<template>
  <div>
    <div class="item">指标体系管理</div>
    <div class="item">
      <div class="item">指标体系</div>
      <div class="item">
        <div class="item">指标体系_1</div>
        <div class="item">
          <div class="item">聚合流程_1</div>
        </div>
      </div>
    </div>

    <div class="item">算子管理</div>
    <div class="item">图表管理</div>
    <div class="item">预处理模板管理</div>
  </div>
</template>

<script>
  export default {
    name: 'menu-list',
    data () {
      return {
      }
    },

    mounted: function () {
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .item{
    color: #fff;
    font-size: 18px;
    background: #00adad;
    border: 1px solid cyan;
    border-left-width: 3px;
    box-sizing: border-box;
    margin: 5px 0;
    padding-left: 5px;
    line-height: 28px;
  }
</style>
