<template xmlns="http://www.w3.org/1999/html">
  <div class='paper-panel'>

    <div class='panel-tools'>
      <el-button type='success'>保存</el-button>
    </div>

    <div id="paper6" class="paper"></div>

    <div class='tree-list-panel'>
      <div class='search-tools'>
        <input type="text">
        <el-button type='primary'>搜索</el-button>
      </div>
      <ul>
        <li>复合算子</li>
        <li>数学算子</li>
        <li>统计算子
          <ul>
            <li>记录统计</li>
            <li>类型统计</li>
            <li>记分组类型统计</li>
          </ul>
        </li>
        <li>归一化算子
          <ul>
            <li>正比例归一化</li>
            <li>反比例归一化</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery'
  import __ from 'underscore'
  const _ = require('lodash')
  const joint = require('jointjs')
  const backbone = require('../../../static/js/backbone-min.js')
  import '../../../static/css/joint.css'

  const dagre = require('dagre')
  const graphlib = require('graphlib');


  export default {
    props: ['width', 'height'],
    data() {
      return {
        paper: null,
        graph: new joint.dia.Graph,

      };
    },
    mounted: function() {
      // this.shaps()
      this.init($('#paper6').width(), $('#paper6').height())
    },
    computed: {},
    created() {},
    methods: {

      init(width, height) {


        var graph = new joint.dia.Graph;

        new joint.dia.Paper({
          el: $('#paper6'),
          model: graph,
          width: width,
          height: height,
          gridSize: 1,
          drawGrid: true,
          // background: {
          //   color: '#10605a'
          // },
          interactive: false //拖拽
        });

        var CustomElement = joint.dia.Element.define('examples.CustomElement', {
          attrs: {
            e: {
              strokeWidth: 1,
              stroke: '#000000',
              fill: '#0f0'
            },
            r: {
              strokeWidth: 1,
              stroke: '#000000',
              fill: '#00f'
            },
            c: {
              strokeWidth: 1,
              stroke: '#000000',
              fill: '#f00'
            },
            outline: {
              refX: 0,
              refY: 0,
              refWidth: '100%',
              refHeight: '100%',
              strokeWidth: 1,
              stroke: '#000000',
              strokeDasharray: '5 5',
              strokeDashoffset: 2.5,
              fill: 'none'
            }
          }
        }, {
          markup: [{
            tagName: 'rect',
            selector: 'e'
          }, {
            tagName: 'rect',
            selector: 'r'
          }, {
            tagName: 'rect',
            selector: 'c'
          }, {
            tagName: 'rect',
            selector: 'outline'
          }]
        });

        var element = new CustomElement();
        element.attr({
          e: {
            refX: '0',
            x: 0, // additional x offset
            refY: '0',
            y: 0, // additional y offset
            refWidth: '100%',
            refHeight: '40%',
          },
          r: {
            refX: '0',
            x: 0, // additional x offset
            refY: '40%',
            y: 0, // additional y offset
            refWidth: '100%',
            refHeight: '30%',
          },
          c: {
            refX: '0',
            x: 0, // additional x offset
            refY: '70%',
            y: 0, // additional y offset
            refWidth: '100%',
            refHeight: '30%',
          }
        });
        element.position(280, 130);
        element.resize(150, 100);
        element.addTo(graph);

      }

    }
  }
</script>


<style lang='scss'>
  .paper-panel {
    .el-dialog__body {
      padding: 0 !important;
    }
  }
</style>

<style lang='scss' scoped>
  .paper-panel {
    flex: 1;
    display: flex;
    position: relative;

    .panel-tools {
      position: absolute;
      top: 0;
      right: 220px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 15px;
      padding: 10px;
      z-index: 100;
    }

    .tree-list-panel {
      width: 200px;
      background: #388881;
      color: #606266;

      .search-tools{
        display: flex;
      }

      ul {
        box-sizing: border-box;
        background: rgba(255, 255, 255, .2);
        line-height: 1.5;
        padding-left: 1em;

        li {
          cursor: pointer;
        }
      }
    }

    #paper6 {
      flex: 1;
       background: rgba(200,200,200,.5);
    }

  }
</style>
