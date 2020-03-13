<template xmlns="http://www.w3.org/1999/html">
  <div class='main-panel'>
    <div class='main-item-box'>
      <SVGzhibiao :width='svgWidth' :height='svgHeight'></SVGzhibiao>
    </div>

    <div class='main-item-box'>
      <SVGjuhe :width='svgWidth' :height='svgHeight'></SVGjuhe>
    </div>

  </div>

</template>

<script>
  import SVGzhibiao from '../svg/svg5.vue'
  // import SVGjuhe from '../svg/svg2.vue'
  import SVGjuhe from '../svg/svg6.vue'
  export default {
    components:{
      SVGzhibiao,
      SVGjuhe
    },
    data() {
      return {
        svgWidth: this.getViewportSize().width - 255-6-2,
        svgHeight: (this.getViewportSize().height - 20)/2
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
    background: darkcyan;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .main-item-box{
      flex: 1;
      &+.main-item-box{
        border-top: 5px solid #172d2d;
      }
    }
  }
</style>
