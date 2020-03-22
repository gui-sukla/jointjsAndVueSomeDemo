<template xmlns="http://www.w3.org/1999/html">
  <div class='main-panel'>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="对象代号"><el-input></el-input></el-form-item>
      <el-form-item label="对象名称"><el-input></el-input></el-form-item>
      <el-form-item label="对象级别"><el-input></el-input></el-form-item>
      <el-form-item label="对象类型"><el-input></el-input></el-form-item>
      <el-form-item label="对象属方"><el-input></el-input></el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    components:{

    },
    data() {
      return {

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
    form {
      width: 100%;
    }
  }
</style>
