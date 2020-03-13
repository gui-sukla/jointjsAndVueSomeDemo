<template xmlns="http://www.w3.org/1999/html">
  <div>


    <div id="paper4" class="paper"></div>


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

        function get_graph() {
          let graph = new joint.dia.Graph();

          let rect = new joint.shapes.standard.Rectangle();
          rect.position(100, 30);
          rect.resize(100, 40);
          rect.attr({
            body: {
              fill: 'blue'
            },
            label: {
              text: 'Hello',
              fill: 'white'
            }
          });
          rect.addTo(graph);

          let rect2 = rect.clone();
          rect2.translate(300, 0);
          rect2.attr('label/text', 'World!');
          rect2.addTo(graph);

          for (let i = 0; i < 10; i++) {
            let cir = new joint.shapes.standard.Circle();
            cir.resize(100, 100);
            cir.position(10, 10);
            cir.attr('root/title', 'joint.shapes.standard.Circle');
            cir.attr('label/text', 'Circle' + i);
            cir.attr('body/fill', 'lightblue');
            cir.addTo(graph);

            let ln = new joint.shapes.standard.Link();
            ln.source(cir);
            ln.target(rect2);
            ln.addTo(graph);
          }

          let link = new joint.shapes.standard.Link();
          link.source(rect);
          link.target(rect2);
          link.addTo(graph);

          //auto  layout
          joint.layout.DirectedGraph.layout(graph, {
            nodeSep: 50,
            edgeSep: 50,
            rankDir: "RL",//BT TB LR RL 
            dagre: dagre,
            graphlib: graphlib
          });

          // return graph.toJSON();
          return graph;
        }

        // let graph = new joint.dia.Graph;
        // graph.fromJSON(get_graph());
        let paper = new joint.dia.Paper({
          el: $('#paper4'),  // 指向HTML里ID为"myGraph"的元素
          model: get_graph(),       // 指定画板
          width: width||600,         // 画布宽600像素
          height: height||300,        // 画布高300像素
          gridSize: 5,        // 画布上元素拖动时步进的为5像素，默认1
          drawGrid: true,     // 显示步进点，方便对齐
          background: {       // 画布背景色
              color: 'rgba(0, 0, 0, 0.1)'
          },
        });





      }
    }
  }
</script>


<style scoped>
  #paper {
    background: darkcyan;
  }
</style>
