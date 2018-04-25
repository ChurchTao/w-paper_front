<template>
  <div class="info">
    <div class="content-main">
      <el-card class="head-box">
        <el-row type="flex" justify="space-between">
          <el-col :span="3">
            <img class="author-img" :src="loginUser==null?'../assets/logo.png':loginUser.avatar"/>
          </el-col>
          <el-col :span="15" style="margin-left: 30px">
            <div class="title padding1" >
              {{loginUser==null?'':loginUser.nickname}}
            </div>
            <div class="author-info padding1" >
              {{loginUser==null?'':loginUser.info}}
            </div>
          </el-col>
          <el-col :span="6" >
            <el-button @click="goEdit" style="float: right" type="text">修改个人信息</el-button>
          </el-col>
        </el-row>
      </el-card>

      <el-tabs class="pane" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="文章" name="1">文章</el-tab-pane>
        <el-tab-pane label="专辑" name="2">专辑</el-tab-pane>
        <el-tab-pane label="点赞" name="3">点赞</el-tab-pane>
        <el-tab-pane label="评论" name="4">评论</el-tab-pane>
        <el-tab-pane label="收藏" name="5">收藏</el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        activeName: '1',
        islogin: false,
        loginUser: {}
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      goEdit(){
        this.$router.push({path: '/myedit'});
      }
    },
    mounted(){
      if (this.$storage.getSession('login-user')==null){
        this.$message.error('请先登录');
        this.$router.push({path: '/'});
        return;
      }
      this.loginUser=this.$storage.getSession('login-user');
      this.islogin = this.loginUser !== null;
      console.log(this.loginUser);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .content-main{
    width: 65%;
    height: 90%;
  }
  .padding1{
    padding: 5px 0;
  }
  .title {
    font-size: 2rem;
    font-weight: 600;
  }
  .head-box {
    width: 100%;
  }
  .info {
    width: 100%;
    height: 100%;
  }
  .author-img{
     border-radius: 50%;
     width: 100%;
   }
  .author-info{
    font-size: 18px;
    color: #999;
  }
  .pane{
    margin-top: 5px;
  }
</style>
