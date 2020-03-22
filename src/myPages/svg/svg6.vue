<template xmlns="http://www.w3.org/1999/html">
  <div class='paper-panel'>

    <!-- <textarea name="" id="adjacency-list" cols="30" rows="10" v-model="adjacencyList"></textarea>
    <button id="btn-layout">ok</button> -->

    <div id="paper6" class="paper"></div>

    <el-dialog :title="dialogTitle" width="200px" :visible.sync="dialogFormVisible">
      <div class='pointer-btn' @click="elementRemoveHandle">删除节点</div>
      <div class='pointer-btn'>添加子节点
        <div>
          <input type="text" v-model="addChildName">
          <button @click="elementAddChildHandle">确定</button>
          <button>取消</button>
        </div>
      </div>
      <div class='pointer-btn'>编辑值域</div>
    </el-dialog>

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
        adjacencyList1: {
          '指标4': ['算子1'],
          '指标5': ['算子1'],
          '指标6': ['算子1'],
          '算子1': ['算子2'],
          '算子2': ['指标1'],
          '指标1': []
        },
        dialogFormVisible: false,
        addChildName: '',
        dialogTitle: '节点名称',
        activeElement: '' //点击中的模型删除的时候使用
      };
    },
    mounted: function() {
      // this.shaps()
      this.init(this.width, this.height)
    },
    computed: {},
    created() {},
    methods: {

      buildGraphFromAdjacencyList(adjacencyList) {
        let that = this;

        var elements = [];
        var links = [];

        __.each(adjacencyList, function(edges, parentElementLabel) {
          elements.push(that.makeElement(parentElementLabel));

          __.each(edges, function(childElementLabel) {
            links.push(that.makeLink(parentElementLabel, childElementLabel));
          });
        });

        // Links must be added after all the elements. This is because when the links
        // are added to the graph, link source/target
        // elements must be in the graph already.
        return elements.concat(links);
      },

      makeLink(parentElementLabel, childElementLabel) {

        return new joint.dia.Link({
          source: {
            id: parentElementLabel
          },
          target: {
            id: childElementLabel
          },
          // attrs: {
          //   '.marker-target': {
          //     d: 'M 4 0 L 0 2 L 4 4 z'
          //   }
          // },
          attrs: {
            '.connection': {
              stroke: '#00ffff', //连线颜色
              'stroke-width': 2 //连线粗细
            },
            '.marker-target': {
              fill: '#00ffff', //箭头颜色
              d: 'M 10 0 L 0 5 L 10 10 z' //箭头样式
            }
          },
          // smooth: true//曲线
          router: {
            name: 'manhattan'
          } //设置连线弯曲样式 manhattan直角
        });
      },

      makeElement(label) {

        var maxLineLength = __.max(label.split('\n'), function(l) {
          return l.length;
        }).length;

        // Compute width/height of the rectangle based on the number
        // of lines in the label and the letter size. 0.6 * letterSize is
        // an approximation of the monospace font letter width.
        var letterSize = 15;
        var width = 2 * (letterSize * (0.6 * maxLineLength + 1));
        var height = 2 * ((label.split('\n').length + 1) * letterSize);

        // return new joint.shapes.basic.Rect({
        return new joint.shapes.devs.Model({
          id: label,
          size: {
            width: width,
            height: height
          },
          
          inPorts: ['in1', 'in2'],
          outPorts: ['out'],
          ports: {
            groups: {
              'in': {
                attrs: {
                  '.port-body': {
                    fill: '#16A085'
                  }
                }
              },
              'out': {
                attrs: {
                  '.port-body': {
                    fill: '#E74C3C'
                  }
                }
              }
            }
          },

          attrs: {
            text: {
              text: label,
              fill: '#0f0',
              'font-size': letterSize,
              'font-family': 'monospace',
              'font-weight': 'bold',
            },
            rect: {
              width: width,
              height: height,
              rx: 5,
              ry: 5,
              // stroke: '#555',
              fill: {
                type: 'linearGradient',
                stops: [{
                    offset: '0%',
                    color: 'darkcyan'
                  }, //渐变开始
                  {
                    offset: '100%',
                    color: 'dark'
                  } //渐变结束
                ],
                attrs: {
                  x1: '0%',
                  y1: '0%',
                  x2: '0%',
                  y2: '100%'
                }
              },
              stroke: 'darkcyan', //边框颜色
              'stroke-width': 1 //边框大小
            }
          },
        })
      },

      layout(graph) {
        var adjacencyList = this.adjacencyList1;
        var cells = this.buildGraphFromAdjacencyList(adjacencyList);
        graph.resetCells(cells);
        // joint.layout.DirectedGraph.layout(graph, {
        //   setLinkVertices: false
        // });
        joint.layout.DirectedGraph.layout(graph, {
          nodeSep: 50,
          edgeSep: 50,
          rankDir: "LR", //BT TB LR RL
          dagre: dagre,
          graphlib: graphlib
        });

        // return graph;
      },


      init(width, height) {

        let that = this;

        var graph = this.graph;

        this.layout(graph);

        this.paper = new joint.dia.Paper({
          el: $('#paper6'), // 指向HTML里ID为"myGraph"的元素
          width: width || 600, // 画布宽600像素
          height: height || 300, // 画布高300像素
          gridSize: 10, // 画布上元素拖动时步进的为5像素，默认1
          drawGrid: true, // 显示步进点，方便对齐
          background: { // 画布背景色
            color: 'rgba(0, 0, 0, 0.1)'
          },
          // model: layout()
          model: graph
        });

        this.paper.on('element:pointerclick', function(elementView, event) {
          // alert('判断是在指标界面 还是聚合界面 指标体系控制面板 查询父子节点 获取父子计算聚合过程 展示聚合关系 等待编辑');
          that.dialogFormVisible = true;
          that.activeElement = elementView;
          //删除
          //   elementView.model.remove();
          //弹窗控制
          that.dialogTitle = $("#" + elementView.id + " tspan").html();

        });



      },

      //删除element节点
      elementRemoveHandle() {
        this.activeElement.model.remove();
        this.dialogFormVisibleClose();
      },

      elementAddChildHandle() {
        //加一个子节点 name:[]
        //在父节点数组中push一个子节点名字
        this.adjacencyList1[this.addChildName] = [];
        this.adjacencyList1[this.dialogTitle].push(this.addChildName);
        this.layout(this.graph);
        this.dialogFormVisibleClose();
      },

      //关闭弹窗
      dialogFormVisibleClose() {
        this.dialogFormVisible = false;
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

    #paper4 {
      flex: 1;
      background: darkcyan;
    }



    .pointer-btn {
      background: darkcyan;
      cursor: pointer;
      line-height: 20px;
      color: #fff;
      box-sizing: border-box;
      padding: 3px;
      font-size: 18px;

      &:hover {
        background: #052d2d;
      }
    }


  }
</style>
