<template>
  <div class="info">
    <div class="content-main">
      <el-card class="head-box">
        <el-row>
          <span class="title">个人资料</span>
        </el-row>
        <el-form style="margin-top: 20px" ref="form" :model="form" label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <input id="avatar-up" @change="upAvatar()" type="file"/>

          <el-form-item label="性别">
            <el-radio-group v-model="form.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input type="textarea" v-model="form.info"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
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
          gender: '',
          info: ''
        }
      };
    },
    methods: {
      onSubmit() {
        var t = this;
        this.$fetch({
          url: '/user/update',
          method: 'post',
          data: {
            nickname: this.form.name,
            gender: this.form.gender,
            info: this.form.info,
            avatar: this.form.avatar,
            id: this.loginUser.id
          }
        }).then(function (res) {
          if (res.code === 200) {
            t.$router.push({path: '/my'});
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

        }).catch(function(err) {
          console.log(err,'error');
        })
      },
      uploadHead: function () {

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
      } else {
        this.form.name = this.loginUser.nickname;
        this.form.info = this.loginUser.info;
        let gender = this.loginUser.gender == 0 ? '女' : '男';
        this.form.gender = gender;
        this.form.avatar = this.loginUser.avatar;
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
