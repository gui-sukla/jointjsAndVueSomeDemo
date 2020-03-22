<template xmlns="http://www.w3.org/1999/html">
  <div class='main-panel'>

    <SVGzhibiao :width='svgWidth' :height='svgHeight' :status='"status2"'></SVGzhibiao>

    <div class="commit-panel">
      <el-button type='success'>保存</el-button>
    </div>
  </div>

</template>

<script>
  // import SVGzhibiao from '../svg/svg1.vue'
  // import SVGzhibiao from '../svg/svg4.vue'
  import SVGzhibiao from '../svg/svg5.vue'
  export default {
    components: {
      SVGzhibiao
    },
    data() {
      return {
        svgWidth: this.getViewportSize().width - 255 - 6 - 2,
        svgHeight: this.getViewportSize().height - 15
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

    .commit-panel {
      box-sizing: border-box;
      height: 60px;
      padding: 10px;
      background: rgba(0, 0, 0, .3);
      display: flex;
      flex-direction: row-reverse;
    }
  }
</style>
