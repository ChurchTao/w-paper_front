<template>
  <div class="bodymask">
  <form class="registerwindow">
    <img src="../assets/images/login1.png" class="panda1" v-show="loginshow&&pandaactive==1">
    <img src="../assets/images/login2.png" class="panda2" v-show="loginshow&&pandaactive==2">
    <img src="../assets/images/login3.png" class="panda3" v-show="loginshow&&pandaactive==3">
    <div class="registerwindow-top">
      <i class="icon iconfont icon-msnui-close closebutton" @click="showmask"></i>
      <h1><span v-show="registershow">注册</span><span v-show="loginshow">登陆</span></h1>
      <div class="input-box" v-show="registershow">
        <input v-model="input_userName" maxlength="20" placeholder="请输入用户名">
      </div>
      <div class="input-box">
        <input v-model="phoneOrEmail" maxlength="64" placeholder="请填写手机号或邮箱" @focus="changeto2" @blur="changeto1">
      </div>
      <div class="input-box">
       <input v-model="password1" maxlength="64" placeholder="请输入密码" @focus="changeto3" @blur="changeto1">
      </div>
      <div class="button" @click="submitInfo"><span v-show="registershow">注册</span><span>登陆</span></div>
      <p class="ifregister" v-show="registershow" @click="changetologin">已有账号登陆</p>
      <p class="iflogin" v-show="loginshow">没有账号？<span  @click="changetoregister">注册</span><span>忘记密码</span></p>
    </div>
    <div class="registerwindow-bottom">
      <h4>第三方账号登陆：</h4>
      <div class="registerway">
        <div><img src="../assets/images/weibo.svg"></div>
        <div><img src="../assets/images/wechat.svg"></div>
        <div><img src="../assets/images/github.svg"></div>
      </div>
    </div>
  </form>
  </div>
</template>

<script>

export default{
  data(){
    return{
      registershow: !this.isloginwindow,
      loginshow: this.isloginwindow,
      pandaactive: 1,
      input_userName :"",
      password1 :"",
      phoneOrEmail :""

    }

  },
  props:['isloginwindow'],
  methods:{
    showmask($event){
        this.$emit('closeMask');
    },
    changeto1(){
      this.pandaactive=1;
    },
    changeto2(){
      this.pandaactive=2;
    },
    changeto3(){
      this.pandaactive=3;
    },
    changetologin(){
      this.loginshow=true;
      this.registershow=false;
    },
    changetoregister(){
      this.loginshow=false;
      this.registershow=true;
    },
    submitInfo(){
      var t = this;
      if (this.isloginwindow){
        this.$fetch({
          url: '/user/login',
          method: 'post',
          data: {
              username : this.phoneOrEmail,
              password : this.password1
          }
        }).then(function (res) {
            if(res.code===200){
              t.$emit('closeMask');
              t.$message({
                message: res.msg,
                type: 'success'
              });
              t.$cookieTools.setKey('access-token',res.data.token);
              t.$cookieTools.setKey('user-id',res.data.id);
              t.$storage.setSession('login-user',res.data);
              t.$router.push({path: '/welcome'});
            }else {
              t.$message.error(res.msg);
            }
        }).catch(function (err) {
          t.$message.error('请求异常，请检查网络！');
        })
      }else {
        this.$fetch({
          url: '/user/init',
          method: 'post',
          data: {
            username : this.input_userName,
            phoneOrEmail : this.phoneOrEmail,
            password : this.password1
          }
        }).then(function (res) {
          if(res.code===200){
            t.$emit('closeMask');
            t.$message({
              message: res.msg,
              type: 'success'
            });
            t.$cookieTools.setKey('access-token',res.data.token);
            t.$cookieTools.setKey('user-id',res.data.id);
            t.$storage.setSession('login-user',res.data);
            t.$router.push({path: '/welcome'});
          }else {
            t.$message.error(res.msg);
          }
        }).catch(function (err) {
          t.$message.error('请求异常，请检查网络！');
        })
      }
    }
  }

}

</script>

<style scoped>

.panda1 {
  transform: translate(-50%,-83%);
  position: absolute;
  top: 0;
  left: 50%;
  width: 10rem;
}

.panda2 {
  transform: translate(-50%,-75.8%);
  position: absolute;
  top: 0;
  left: 50%;
  width: 10rem;
}

.panda3 {
  transform: translate(-50%,-75%);
  position: absolute;
  top: 0;
  left: 50%;
  width: 8.6rem;
}

.registerwindow-top div {
  margin-bottom: .8rem;
}

.registerwindow-top .closebutton {
  float: right;
  cursor: pointer;
  opacity: .4;
  font-size: 2rem;
}

.closebutton:hover {
  opacity: 1;
}

.registerwindow-top input {
  padding: 10px;
  width: 100%;
  border: 1px solid #e9e9e9;
  border-radius: 2px;
  outline: none;
  box-sizing: border-box;
  font: inherit;
}

.registerwindow-top .button {
  width: 100%;
  height: 3.334rem;
  color: #fff;
  background-color: #007fff;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 0.5rem;
}

.registerwindow-top .button span{
  float: left;
  margin-left: 45%;
  margin-top: 3%;
}

.registerwindow-top .ifregister {
  text-align: center;
  color: #007fff;
  cursor: pointer;
  margin-top:12px;
}

.registerwindow-top .iflogin {
  margin-top:12px;
  color: #8b9196;
}

.registerwindow-top .iflogin span {
  cursor: pointer;
  color: #007fff;
}

.registerwindow-top .iflogin span:last-child {
  float:right;
}

.registerwindow-bottom .registerway {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 15px;
}

.registerway div {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #f4f8fb;
  justify-content: center;
  display: flex;
  align-items: center;
}

.registerway div img {
  height: 1.9rem;
  vertical-align: bottom;
  cursor: pointer;
}

.registerwindow-bottom h4 {
  margin: 1rem 0 0;
  color: #8b9196;
  font-size: 1.16rem;
}

.registerwindow h1 {
  font-size: 1.5rem;
  margin: 0 0 2rem;
  font-weight: bold;
}

.registerwindow {
  position: relative;
  padding: 2rem;
  width: 26.5rem;
  max-width: 100%;
  font-size: 1.167rem;
  background-color: #fff;
  border-radius: 2px;
  box-sizing: border-box;
}

.bodymask {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.3);
  z-index: 99;
}


</style>
