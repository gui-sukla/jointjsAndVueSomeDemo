<template xmlns="http://www.w3.org/1999/html">
  <div class='main-panel'>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="训练任务">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="训练任务描述">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="训练计划">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="训练计划描述">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="评估任务">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="评估任务描述">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="评估目的">
        <el-input type="textarea" :rows="10"></el-input>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        form: {

        }
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
    form{
      width: 100%;
    }
  }
</style>
