<template xmlns="http://www.w3.org/1999/html">
  <div>


    <div id="paper2" class="paper"></div>

    <div>
      {{msg}}
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
  export default {
    props:['width','height'],
    data() {
      return {
        msg: ''
      };
    },
    mounted: function() {
      // this.shaps()
      this.init(this.width,this.height)
    },
    computed: {},
    created() {},
    methods: {
      init(width,height) {

        // var graph = new joint.dia.Graph; // 创建画板，所有图上的元素都在画板里
        // var paper = new joint.dia.Paper({ // 创建画板上的画布，画布是用来渲染画板
        //   el: $('#paper2'), // 指向HTML里ID为"myGraph"的元素
        //   model: graph, // 指定画板
        //   // width: 600, // 画布宽600像素
        //   height: 400, // 画布高100像素
        //   gridSize: 1, // 画布上元素拖动时步进的像素，默认1，设的高方便对齐
        //   background: { // 画布背景色
        //     color: 'rgba(0, 0, 0, 0.1)'
        //   },
        // });

        // var rect = new joint.shapes.standard.Rectangle();
        // rect.position(100, 30); // 矩形左上角的位置，x:100,y:30，单位像素
        // rect.resize(100, 40); // 矩形大小，宽100，高40，单位像素
        // rect.attr({
        //   body: {
        //     fill: 'blue' // 填充色
        //   },
        //   label: {
        //     text: 'Hello', // 矩形上显示的文字
        //     fill: 'white' // 文字颜色
        //   }
        // });

        // rect.addTo(graph); // 将上面定义的矩形加入到画板中
        // var rect2 = rect.clone(); // 复制一个相同的矩形
        // rect2.translate(300, 0); // 将矩形在水平方向上向右移动300像素
        // rect2.attr('label/text', 'World!'); // 设置矩形2上的文字
        // rect2.addTo(graph); // 将矩形2加入到画板中


        // // 创建一条连线
        // var link = new joint.shapes.standard.Link();
        // link.source(rect); // 连线头为矩形1
        // link.target(rect2); // 连线尾为矩形2
        // link.addTo(graph); // 将上面定义的连线加入到画板中

        var graph = new joint.dia.Graph;    // 创建画板，所有图上的元素都在画板里
        var paper = new joint.dia.Paper({   // 创建画板上的画布，画布是用来渲染画板
            el: $('#paper2'),  // 指向HTML里ID为"myGraph"的元素
            model: graph,       // 指定画板
            width: width||600,         // 画布宽600像素
            height: height||300,        // 画布高300像素
            gridSize: 5,        // 画布上元素拖动时步进的为5像素，默认1
            drawGrid: true,     // 显示步进点，方便对齐
            background: {       // 画布背景色
                color: 'rgba(0, 0, 0, 0.1)'
            },

            // 连接线风格
            defaultLink: new joint.shapes.logic.Wire({
                connector: { name: 'jumpover' },  // 当两根连线交叉时，其中一根跳过
            }),
            linkPinning: false,   // 连线必须连到某个元素，即不允许连到空白处
            snapLinks: {
                radius: 25          // 距离元素连接点25像素时自动连接上
            },

            // 验证连线是否允许，
            validateConnection: function(viewSource, magnetSource, viewTarget, magnetTarget, end, viewLink) {
                if (end === 'target') {
                    // 连线目标必须时一个"in"类型连接点
                    if (!magnetTarget || !magnetTarget.getAttribute('port-group') || magnetTarget.getAttribute('port-group').indexOf('in') < 0) {
                        return false;
                    }

                    // 检查连接点是否已经有连线接入，不允许多重接入
                    var portUsed = this.model.getLinks().some(function(link) {
                        return (link.id !== viewLink.model.id &&
                          link.get('target').id === viewTarget.model.id &&
                          link.get('target').port === magnetTarget.getAttribute('port'));
                    });
                    return !portUsed;

                } else { // end === 'source'
                    // 连线起始点必须时一个"out"类型连接点
                    return magnetSource && magnetSource.getAttribute('port-group') && magnetSource.getAttribute('port-group').indexOf('out') >= 0;
                }
            },
        });

        // 创建基础元件模板
        var gateTemplate = new joint.shapes.devs.Model({
          position: {  // 默认位置
            x: 0,
            y: 0
          },
          size: {   // 默认大小
            width: 80,
            height: 60
          },
          attrs: {
            '.label': {
              'type': 'primary',  // 自定义一个图例属性，后面事件操作时判断用
              fontSize: 12,       // 标签字体
              'ref-x': .5,        // 标签相对于元素的水平位置
              'ref-y': .05       // 标签相对于元素的垂直位置
            },
            rect: {
              fill: {
                type: 'linearGradient',
                stops: [{
                    offset: '0%',
                    color: 'cyan'
                  }, //渐变开始
                  {
                    offset: '100%',
                    color: 'cyan'
                  } //渐变结束
                ],
                attrs: {
                  x1: '0%',
                  y1: '0%',
                  x2: '0%',
                  y2: '100%'
                }
              },
              stroke: 'cyan', //边框颜色
              'stroke-width': 1 //边框大小
            }
          },

                  // "连接点"（port）的风格
          portMarkup: '<rect class="joint-port-body" width="10" height="3" style="fill:#fff" />',
          // "连接点"（port）标签文字的显示风格
          portLabelMarkup: '<text class="port-label joint-port-label" font-size="10" y="0" fill="#f00" /> ',
          ports: {  // 定义连接点
            groups: {
              'in': {  // "入"连接点的属性和风格
                attrs: {
                  '.port-body': {  // 这是JointJS类库预定义的连接点属性类
                    magnet: 'passive',   // 该连接点只入不出
                  },
                  '.joint-port-body': {  // 这是JointJS类库预定义的连接点风格类
                    x:-10   // "入"连接点左移10个像素，这样可以显示在元素外部
                  }
                },
                label: {
                  position: {
                    args: {x:55},  // 标签右移，这样可以显示在元素内部
                  },
                },
              },
              'out': {
                label: {  // "出"连接点的属性和风格
                  position: {
                    args: {x:-23},  // 标签左移，这样可以显示在元素内部
                  },
                },
              }
            }
          },

        });

        // 生成"与"元素，两个"入"连接点，一个"出"连接点，显示"And"字样标签
        function genAndPr() {
          return gateTemplate.clone().set('inPorts', ['IN1 double', 'IN2 double']).set('outPorts', ['OUT']).attr('.label/text', '加法');
        }

        // 生成"或"元素，两个"入"连接点，一个"出"连接点，显示"Or"字样标签
        function genOrPr() {
          return gateTemplate.clone().set('inPorts', ['IN1            ', 'IN2            ']).set('outPorts', ['OUT']).attr('.label/text', '减法');
        }

        // 生成"非"元素，一个"入"连接点，一个"出"连接点，显示"Not"字样标签
        function genNotPr() {
          return gateTemplate.clone().set('inPorts', ['IN              ']).set('outPorts', ['OUT']).attr('.label/text', '除法');;
        }

        // 图例加入到画板左侧
        graph.addCell(genAndPr().translate(20, 20));
        graph.addCell(genOrPr().translate(20, 120));
        graph.addCell(genNotPr().translate(20, 220));

        // 添加一个分割栏将图例和绘图区域分开
        var separator = new joint.shapes.standard.Polyline();
        separator.resize(5, height);
        separator.position(195, 0);
        separator.addTo(graph);

        function genAnd() {
          return genAndPr().set('portMarkup', '<rect class="port-body joint-port-body" width="10" height="2" style="fill:#fff" />').attr('.label/type', 'instance');
        }
        function genOr() {
          return genOrPr().set('portMarkup', '<rect class="port-body joint-port-body" width="10" height="2" style="fill:#fff" />').attr('.label/type', 'instance');
        }
        function genNot() {
          return genNotPr().set('portMarkup', '<rect class="port-body joint-port-body" width="10" height="2" style="fill:#fff" />').attr('.label/type', 'instance');
        }

        paper.on({  // JointJS事件都定义在画布上
          // 当鼠标左键按下时
          'element:pointerdown': function(elementView, evt) {
              // 当图例元素被拖走时，在原来的位置创建一个新的图例元素
              if (elementView.model.attr('.label/type') == 'primary') {
                var type = elementView.model.attr('.label/text');
                if (type == '加法') {
                  graph.addCell(genAndPr().translate(20, 20));
                } else if (type == '减法') {
                  graph.addCell(genOrPr().translate(20, 120));
                } else if (type == '除法') {
                  graph.addCell(genNotPr().translate(20, 220));
                }
                // 被拖动的元素挪到图层的最上层，这样可以遮盖现有元素
                elementView.model.toFront();
              } else if (elementView.model.attr('.label/type') == 'instance') {
                // 对于绘图元素，记住其被拖动时的起始点，当拖动位置超出绘图区域时，可以回到原点
                evt.data = elementView.model.position();
              }
          },

          // 当鼠标左键抬起时
          'element:pointerup': function(elementView, evt, x, y) {
            if (elementView.model.attr('.label/type') == 'primary') {
              // 对于图例元素，当其被拖入绘图区域时，则在该位置创建一个新的绘图元素，并删除被拖动的图例元素
              if (elementView.model.position().x > 200) {
                var type = elementView.model.attr('.label/text');
                if (type == '加法') {
                  graph.addCell(genAnd().translate(elementView.model.position().x, elementView.model.position().y));
                } else if (type == '减法') {
                  graph.addCell(genOr().translate(elementView.model.position().x, elementView.model.position().y));
                } else if (type == '除法') {
                  graph.addCell(genNot().translate(elementView.model.position().x, elementView.model.position().y));
                }
              }
              // 删除当前被拖动的元素
              graph.removeCells(elementView.model);
            } else {
              // 对于绘图元素，当其被拖出绘图区域时，则将其移回原点
              if (elementView.model.position().x < 200) {
                elementView.model.position(evt.data.x, evt.data.y);
              }
            }
          },

          // 当鼠标左键双击时
          'element:pointerdblclick': function(elementView, evt) {
            // 双击绘图元素则删除该元素，相应的连线也会被自动删除
            if (elementView.model.attr('.label/type') == 'instance') {
              elementView.model.remove();
            }
          },
        })


      }
    }
  }
</script>


<style scoped>
  #paper {
    background: darkcyan;
  }
</style>
