<template>
  <div id="app" @click="closearticle($event)">
    <transition name="headerslide">
      <div class="header-container" v-show="headershow">
        <header>
          <div class="header-inner">
            <router-link to="/"><img style="height: 60px" src="../static/logo.png"/></router-link>
            <ul>
              <li>
                <ul>
                  <li><router-link to="/" exact :class="{linkactive:ifhomeactive}">首页</router-link></li>
                  <li class="books"><router-link to="/books">专辑</router-link></li>
                  <li v-show="islogin"><router-link to="/tagManagement">版块管理</router-link></li>
                  <li v-show="islogin"><router-link to="/my/all">我的主页</router-link></li>
                </ul>
              </li>
              <li class="search"><form><input placeholder="搜索"><img src="./assets/images/search.svg"/></form></li>
              <li class="article" ref="article"><img src="./assets/images/article.svg"/><span @click.stop="startarticle()">写文章</span>
                <div class="startarticle" ref="startarticle" v-show="ifstartarticle">
                  <h1>来w-paper写文章，您将有机会</h1>
                  <ul>
                    <li>与众多开发者分享您的经验和观点</li>
                    <li>被编辑推荐，获得更多曝光和关注</li>
                    <li>加入专栏作者群，结识众多优秀开发者</li>
                  </ul>
                  <router-link to="/write"><button @click="startarticleClose()">开始写文章</button></router-link>
                </div>
              </li>
              <li v-show="islogin"><span class="login" >{{loginUser==null?'':loginUser.nickname}}</span><span @click="logout">退出</span></li>
              <li class="login-register"><span v-show="!islogin" class="login" @click="login">登录</span><span v-show="!islogin" @click="register">注册</span></li>
            </ul>
          </div>
        </header>
      </div>
    </transition>
    <div class="view-wrapper">
      <router-view class="router-view" ref="view"/>
    </div>
    <panel :isarrow="isarrow" v-on:backtotop="backtotop"></panel>
    <login :isloginwindow="isloginwindow" v-if="loginshow" v-on:closeMask="closeMask"></login>
    <footer>©2018 w-paper</footer>

  </div>


</template>

<script>
  import Login from './components/Login'
  import Panel from './components/Panel'

  export default {
    components:{
      Login,Panel
    },
    data(){
      return {
        headershow: true,
        ifstartarticle: false,
        loginshow: false,
        isloginwindow: true,
        isarrow: false,
        islogin: false,
        loginUser: {},
      }
    },
    methods:{
      theScroll(){
        var scroll=document.documentElement.scrollTop;
        if(scroll>800){
          this.isarrow=true;
        }else{
          this.isarrow=false;
        }
        if(this.$route.name!='Home'){
          var scroll=document.documentElement.scrollTop;
          if(scroll>450){
            this.headershow=false;
          }else{
            this.headershow=true;
          }
        }else{
          if(scroll>2000){
            this.$refs.view.adsshow=true;
          }else{
            this.$refs.view.adsshow=false;
          }
        }
      },
      startarticle(){
        this.ifstartarticle=true;
      },
      startarticleClose(){
        this.ifstartarticle=false;
      },
      closearticle($event){
        if(this.nodeList.findIndex((v)=>v==$event.target)==-1){
          this.ifstartarticle=false;
        }
      },
      logined(){
        this.islogin=true;
      },
      getAllChildren(obj){
        var arr=[];
        (function innerFunction(obj){
          arr.push(obj);
          if(obj.childNodes.length>0){
            for(var i=0;i<obj.childNodes.length;i++){
              if(obj.childNodes[i].childNodes.length>0){
                innerFunction(obj.childNodes[i]);
              }else{
                arr.push(obj.childNodes[i]);
              }
            }
          }
        })(obj)
        return arr;
      },
      login(){
        this.isloginwindow=true;
        this.loginshow=true;
      },
      register(){
        this.isloginwindow=false;
        this.loginshow=true;
      },
      closeMask(){
        this.loginshow=false;
      },
      backtotop(){
        window.scrollTo(0,0)
        this.headershow=true;
        this.$refs.view.adsshow=false;
      },
      logout(){
        this.$storage.removeSession('login-user');
        this.$cookieTools.clearLogin();
        this.islogin=false;
        this.loginUser={};
        location.reload();
      },
      loginByToken(isFirst){
         const token =this.$cookieTools.getKey('access-token');
         const id = this.$cookieTools.getKey('user-id');
         var t = this;
        this.$fetch({
          url: '/user/loginByToken',
          method: 'post',
          data: {
            token : token,
            id : id
          }
        }).then(function (res) {
          if(res.code===200){
            t.$cookieTools.setKey('access-token',res.data.token);
            t.$storage.setSession('login-user',res.data);
            t.loginUser = res.data;
            t.islogin = true;
            if (isFirst){
                location.reload();
            }
          }else {
            t.$message.error(res.msg);
          }
        }).catch(function (err) {
          if (isFirst) {
            t.$message.error('自动登录异常，请检查网络！');
          }
        })
      }

    },
    computed: {
      nodeList(){
        return this.getAllChildren(this.$refs.startarticle);
      },
      ifhomeactive(){
        return this.$route.path.indexOf('welcome')!=-1;
      }
    },
    created(){
      if (this.$cookieTools.getKey('access-token')!=null&&this.$storage.getSession('login-user')==null){
        this.loginByToken(true);
      }
      this.loginUser=this.$storage.getSession('login-user');
      this.islogin = this.loginUser !== null;
    },
    mounted(){
      window.addEventListener('scroll', this.theScroll);
    },
    watch: {
      $route: function (to, from, next) {
          if(this.$cookieTools.getKey('access-token')!=null){
            this.loginByToken(false);
          }
      }
    }

  }
</script>

<style>

  .linkactive {
    color: #007fff
  }

  .article span:hover, .login-register span:hover {
    color: #0371DF;
  }

  .startarticle::before{
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 1rem;
    height: 1rem;
    border-top: 1px solid hsla(220,6%,72%,.5);
    border-left: 1px solid hsla(220,6%,72%,.5);
    background-color: #fff;
    transform: rotate(45deg) translate(-50%,-50%);
    transform-origin: 0 0;
  }

  .startarticle {
    position: absolute;
    width: 326px;
    top: 145%;
    box-sizing: border-box;
    padding: 2.5rem 2rem;
    border-radius: 2px;
    color: #909090;
    font-size: 1.1rem;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    border: 1px solid hsla(220,6%,72%,.5);
  }

  .startarticle h1 {
    font-size: 1.4rem;
    line-height: 1;
    font-weight: 700;
    color: #000;
    text-align: center;
    margin-bottom: 2rem;
  }

  .startarticle button {
    display: block;
    margin: 2rem auto 0;
    background-color: #83c73a;
    font-size: 1.2rem;
    padding: 1rem 4rem;
    color: #fff;
    border-radius: 2px;
    border: none;
    cursor:pointer;
  }

  .startarticle ul {
    display: block;
    margin-left: 2rem;
    padding: 0;
  }

  .startarticle ul li {
    display: list-item;
    list-style: initial;
    margin-bottom: 1rem;
    padding: 0;
  }

  .headerslide-enter, .headerslide-leave-to {
    margin-top: -5em;
  }

  .headerslide-enter-active, .headerslide-leave-active {
    transition: margin-top 0.2s;
  }

  .headerslide-leave, .headerslide-enter-to {
    margin-top: 0;
  }

  footer {
    text-align: center;
    margin: 50px auto 40px;
    font-size: 14px;
    opacity: .7;
    color: #3a4e64;
  }

  .view-wrapper {
    margin-top: 20px;
  }

  .router-view {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .header-container {
    height: 5rem;
  }

  header {
    position: fixed;
    background-color: #fff;
    height: 5rem;
    width: 100%;
    font-size: 1.33rem;
    white-space: nowrap;
    z-index: 1;
  }

  .header-inner {
    max-width: 960px;
    height: 100%;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
  }

  header ul {
    display: flex;
    width: 100%;
  }

  header ul li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }

  .search {
    flex: 1 1 auto;
    justify-content: flex-end;
  }

  .search form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid hsla(0,0%,59%,.2);
    background-color: rgba(227,231,236,.2);
  }

  .search form img {
    padding: 0 0.5rem;
  }

  .search form input{
    border: none;
    width: 10rem;
    background-color: transparent;
    color: #666;
    padding: .6rem 1rem;
    outline: none;
  }

  .search-active {
    background-color: white;
    border: 1px solid #007fff;
    position: relative;
  }

  .article {
    position: relative;
  }

  .article::after {
    content: '|';
    color: hsla(0,0%,59%,.4);
    position: absolute;
    left: 100%;
  }

  .books {
    position: relative;
  }

  .books ::after {
    content: "NEW";
    font-weight: bold;
    position: absolute;
    color: #ff5400;
    transform: scale(.5);
    transform-origin: 10% -30%;
  }

  .login::after {
    color: #007fff;
    content: "\B7";
    margin: 0 .4rem;
  }

  .login-register {
    padding: 0 0 0 20px;
  }

  header span {
    cursor: pointer;
    color: #007fff;
  }

  header span:hover {
    color: #0371DF;
  }

  header a:hover {
    color: #007fff;
  }

  a.router-link-active {
    color: #007fff;
  }

</style>
