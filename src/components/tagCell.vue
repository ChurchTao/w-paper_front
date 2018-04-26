<template>
  <div class="tag-cell">
    <div>
      <img :src="item.avatar"/>
    </div>
    <div class="name">
      {{item.name}}
    </div>
    <div>
      <span>{{item.starnum}} 关注</span>
      <span>{{item.postnum}} 文章</span>
    </div>
    <div>
      <el-button @click="changeFocus" v-show="item.focus" type="success">
        已关注
      </el-button>
      <el-button @click="changeFocus" v-show="!item.focus" type="info">
        未关注
      </el-button>
    </div>
  </div>
</template>

<script>
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
    name: "tag-cell",
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        loginUser: {}
      }
    },methods:{
      changeFocus:function () {
        let t= this;
        let status=1;
        if (this.item.focus==true){
            status=0;
        }
        this.$fetch({
          url: '/profession/changeFocus',
          method: 'post',
          data: {
            tagId : this.item.id,
            status : status,
            userId: this.loginUser.id,
          }
        }).then(function (res) {
          if(res.code===200){
            t.$message({
              message: '修改成功',
              type: 'success'
            });
          }else {
            t.$message.error(res.msg);
          }
        }).catch(function (err) {
          t.$message.error('请求异常，请检查网络！');
        });
        this.item.focus=!this.item.focus;

      }
    },
    created: function () {
      this.loginUser = this.$storage.getSession('login-user');
      let user = this.$storage.getSession('login-user');
      this.islogin = this.loginUser !== null;
    }
  }
</script>

<style lang='scss'>
  .tag-cell {
    padding: 30px 40px;
    width: 240px;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 15px 15px;
    & > div {
      text-align: center;
      margin-bottom: 5px;
      img {
        width: 40px;
        height: 40px;
      }
      span {
        color: rgba(0, 0, 0, 0.6);
      }
    }
    .name {
      font-size: 18px;
    }
    .button-wrapper {
      display: inline-block;
      padding: 8px 15px;
      margin: 0 auto;
      box-sizing: border-box;
      background: #98c379;
      color: white;
    }
  }
</style>
