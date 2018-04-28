<template>
  <div class="info">
    <div class="content-main">
      <el-card class="head-box">
        <el-row>
          <span class="title">新建版块</span>
        </el-row>
        <el-form style="margin-top: 20px" ref="form" :model="form" label-width="80px">
          <el-form-item label="版块名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="版块Logo">
            <input id="avatar-up" @change="upAvatar()" type="file"/>
          </el-form-item>
          <el-form-item label="版块简介">
            <el-input type="textarea" v-model="form.info"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">新建</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>

</template>

<script>
  import {uploadQN} from '../service/upload1.js'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    data() {
      return {
        islogin: false,
        loginUser: {},
        form: {
          name: '',
          avatar: '',//头像
          info: '',
        }
      };
    },
    methods: {
      onSubmit() {
        var t = this;
        this.$fetch({
          url: '/profession/add',
          method: 'post',
          data: {
            name: this.form.name,
            about: this.form.info,
            avatar: this.form.avatar
          }
        }).then(function (res) {
          if (res.code === 200) {
            t.$router.push({path: '/tagManagement'});
          } else {
            t.$message.error(res.msg);
          }
        }).catch(function (err) {
          t.$message.error('请求异常，请检查网络！');
        })
      },
      upAvatar: function () {
        var v = this;
        var option;
        option = {
          size:2,
          type:'image/jpeg,image/png'
        }
        uploadQN('avatar-up',option).then(function(res) {
          console.log(res,'success');
          v.form.avatar = res.longUrl;
        }).catch(function(err) {
          console.log(err,'error');
        })
      }
    },
    created() {
      this.loginUser = this.$storage.getSession('login-user');
      this.islogin = this.loginUser !== null;
    }
    ,
    mounted() {
      if (this.loginUser == null) {
        this.$message.error('请先登录');
        this.$router.push({path: '/'});
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .content-main {
    width: 50%;
    height: 90%;
  }

  .margin1 {
    margin-top: 10px;
  }

  .title {
    font-size: 2rem;
    font-weight: 600;
  }

  .head-box {
    padding: 30px 20px;
    width: 90%;
  }
</style>
