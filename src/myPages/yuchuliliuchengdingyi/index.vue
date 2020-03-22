<template xmlns="http://www.w3.org/1999/html">
  <div class='main-panel'>
    <div class="item-panel">
      <ul>
        <li>
          端口列表
          <ul>
            <li><div class="item">半径</div></li>
            <li><div class="item">半径</div></li>
            <li><div class="item">半径</div></li>
            <li><div class="item">半径</div></li>
            <li><div class="item">半径</div></li>
            <li><div class="item">半径</div></li>
            <li><div class="item">半径</div></li>

          </ul>
        </li>
      </ul>
    </div>

    <SVGzhibiao :width='svgWidth' :height='svgHeight' :status='"status2"'></SVGzhibiao>
  </div>

</template>

<script>
  // import SVGzhibiao from '../svg/svg1.vue'
  // import SVGzhibiao from '../svg/svg4.vue'
  import SVGzhibiao from '../svg/svgSelf2.vue'
  export default {
    components: {
      SVGzhibiao
    },
    data() {
      return {
        svgWidth: this.getViewportSize().width - 255-6-2,
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

   .item-panel{
     width: 200px;
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
         .item{
           &:hover{
             background: rgba(255,255,255,.2);
           }
         }
       }
     }
   }
  }
</style>
