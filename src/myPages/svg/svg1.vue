<template xmlns="http://www.w3.org/1999/html">
  <div class='paper-panel'>
    <div id="paper" class="paper"></div>

    <el-dialog :title="dialogTitle" width="200px" :visible.sync="dialogFormVisible">
      <div class='pointer-btn' @click="elementRemoveHandle">删除节点</div>
      <div class='pointer-btn'>添加子节点</div>
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
  export default {
    props: ['width', 'height'],
    data() {
      return {
        dialogFormVisible: false,
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
      init(width, height) {
        let that = this;


        var graph = new joint.dia.Graph();

        var ElementView = joint.dia.ElementView.extend({
          pointerdown: function() {
            this._click = true;
            joint.dia.ElementView.prototype.pointerdown.apply(this, arguments);
          },
          pointermove: function(evt, x, y) {
            this._click = false;
            joint.dia.ElementView.prototype.pointermove.apply(this, arguments);
          },
          pointerup: function(evt, x, y) {
            if (this._click) {
              // triggers an event on the paper and the element itself
              this.notify('cell:click', evt, x, y);
            } else {
              joint.dia.ElementView.prototype.pointerup.apply(this, arguments);
            }
          }
        });
        var LinkView = joint.dia.LinkView.extend({
          addVertex: function(evt, x, y) {},
          removeVertex: function(endType) {},
          pointerdown: function(evt, x, y) {}
        });

        //定义画布
        var paper = new joint.dia.Paper({
          el: $('#paper'),
          width: width || 1200,
          height: height || 480,
          gridSize: 2,
          model: graph,
          elementView: ElementView,
          linkView: LinkView,
          clickThreshold: 1 //or any number > 0 if you have more specific events there
        });


        //定义形状
        var state = function(x, y, shape, background, text, w, h) {
          var cell;
          if (shape === "rect") {
            cell = new joint.shapes.basic.Rect({
              position: {
                x: x,
                y: y
              }, //坐标
              size: {
                width: w || 140,
                height: h || 40
              }, //宽高
              attrs: {
                rect: {
                  fill: {
                    type: 'linearGradient',
                    stops: [{
                        offset: '0%',
                        color: background
                      }, //渐变开始
                      {
                        offset: '100%',
                        color: background
                      } //渐变结束
                    ],
                    attrs: {
                      x1: '0%',
                      y1: '0%',
                      x2: '0%',
                      y2: '100%'
                    }
                  },
                  stroke: background, //边框颜色
                  'stroke-width': 1 //边框大小
                },
                text: {
                  text: text
                } //显示文字
              }
            });
          } else if (shape === "ellipse") { //椭圆
            cell = new joint.shapes.basic.Ellipse({
              position: {
                x: x,
                y: y
              }, //坐标
              size: {
                width: 140,
                height: 40
              }, //宽高
              attrs: {
                ellipse: {
                  fill: {
                    type: 'linearGradient',
                    stops: [{
                        offset: '0%',
                        color: background
                      }, //渐变开始
                      {
                        offset: '100%',
                        color: background
                      } //渐变结束
                    ],
                    attrs: {
                      x1: '0%',
                      y1: '0%',
                      x2: '0%',
                      y2: '100%'
                    }
                  },
                  stroke: background, //边框颜色
                  'stroke-width': 1 //边框大小
                },
                text: {
                  text: text
                } //显示文字
              }
            });
          }
          graph.addCell(cell);
          return cell;
        };

        //定义连线
        function link(source, target, label) {
          var cell = new joint.dia.Link({
            source: { //连线的起点
              id: source.id
            },
            target: { //连线的终点
              id: target.id
            },
            labels: [{
              position: 0.5,
              attrs: {
                text: {
                  text: label || '',
                  'font-weight': 'bold'
                }
              }
            }],
            router: {
              name: 'manhattan'
            }, //设置连线弯曲样式 manhattan直角
            attrs: {
              '.connection': {
                stroke: '#00ffff', //连线颜色
                'stroke-width': 2 //连线粗细
              },
              '.marker-target': {
                fill: '#00ffff', //箭头颜色
                d: 'M 10 0 L 0 5 L 10 10 z' //箭头样式
              }
            }
          });
          graph.addCell(cell);
          return cell;
        }

        //创建元素
        var centerWidth = width / 2 - 70
        var start = state(centerWidth, 50, "rect", "#00ffff", "指标体系_1");
        var state1 = state(centerWidth, 150, "rect", "#00ffff", "指标1");

        var state2 = state(centerWidth - 200, 250, "rect", "#00ffff", "指标4", 40, 140);
        var state3 = state(centerWidth - 100, 250, "rect", "#00ffff", "指标5", 40, 140);
        var state4 = state(centerWidth, 250, "rect", "#00ffff", "指标6", 40, 140);
        var state5 = state(centerWidth + 100, 250, "rect", "#00ffff", "指标7", 40, 140);
        var state6 = state(centerWidth + 200, 250, "rect", "#00ffff", "指标8", 40, 140);
        var state7 = state(centerWidth + 300, 250, "rect", "#00ffff", "指标9", 40, 140);


        //创建连线
        link(start, state1, "");
        link(state1, state2, "");
        link(state1, state3, "");
        link(state1, state4, "");
        link(state1, state5, "");
        link(state1, state6, "");
        link(state1, state7, "");

        // 可以添加前缀，以区分不同的点击区域(blank是空白区域)：
        // cell:pointerdblclick link:pointerdblclick element:pointerdblclick blank:pointerdblclick
        //给所有元素添加点击事件
        // paper.on('cell:pointerclick', function(el,event) {
        //   debugger;
        //   console.log(123456789)
        //   // var arr = $("#" + e.id + " tspan");
        //   // if (arr.length === 1) {

        //   //   that.msg = $(arr).html();
        //   // } else {
        //   //   var tmp = "";
        //   //   $.each(arr, function(k, v) {
        //   //     tmp += $(v).html();
        //   //   });
        //   //   that.msg = tmp;
        //   // }

        // });

        // 1 在聚合界面中
        //点击元素 找到该元素和它的子元素
        //把这一组数据去查询他们之间的运算关系
        //得到算子数据和附加参数
        //在聚合里面展示出来 等待编辑

        // 2 在指标界面中 点击后增加删改指标体系的解构

        // paper.on('element:pointerdblclick', function(el, event) {

        //   alert('指标体系控制面板 增删改查');
        //   // var arr = $("#" + e.id + " tspan");
        //   // if (arr.length === 1) {

        //   //   that.msg = $(arr).html();
        //   // } else {
        //   //   var tmp = "";
        //   //   $.each(arr, function(k, v) {
        //   //     tmp += $(v).html();
        //   //   });
        //   //   that.msg = tmp;
        //   // }

        // });
        //单击
        paper.on('element:pointerclick', function(elementView, event) {
          // alert('判断是在指标界面 还是聚合界面 指标体系控制面板 查询父子节点 获取父子计算聚合过程 展示聚合关系 等待编辑');
          that.dialogFormVisible = true;
          that.activeElement = elementView;
          //删除
          //   elementView.model.remove();
          //弹窗控制
          that.dialogTitle = $("#" + elementView.id + " tspan").html();

          // var arr = $("#" + e.id + " tspan");
          // if (arr.length === 1) {

          //   that.msg = $(arr).html();
          // } else {
          //   var tmp = "";
          //   $.each(arr, function(k, v) {
          //     tmp += $(v).html();
          //   });
          //   that.msg = tmp;
          // }

        });
      },

      //删除element节点
      elementRemoveHandle() {
        this.activeElement.model.remove();
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

    #paper {
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
