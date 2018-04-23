<template>
  <div class="repospage">
    <el-tabs class="pane" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="收藏的文章" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="收藏的专辑" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .pane{
    width: 70%;
  }
  .repospage {
    width: 100%;
    height: 100%;
  }
</style>
