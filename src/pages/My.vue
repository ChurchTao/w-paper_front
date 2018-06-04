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
        <el-tab-pane label="文章" name="1"><div class="recom" v-for="item in posts">
          <router-link :to="item.href">
            <div class="textintro">
              <div class="thetitle">{{item.title}}</div>
              <div class="theinfos"><span class="thetype" :style="{backgroundColor:colorlist[item.type%7]}">{{item.typeName}}</span><span class="theauthor dot">{{item.author}}</span><span class="thetime dot">{{item.time}}</span><span   class="readingtimes">{{item.readingtimes}}</span>次阅读</div>
            </div>
            <div class="picintro"></div>
          </router-link>
        </div>
          <div class="page-box">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                           layout="total, prev, pager, next, jumper,slot" :total="total">
              <button style="cursor: pointer;color: white">GO</button>
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="2">暂无</el-tab-pane>
        <el-tab-pane label="点赞" name="3"><div class="recom" v-for="item in liked">
          <router-link :to="item.href">
            <div class="textintro">
              <div class="thetitle">{{item.title}}</div>
              <div class="theinfos"><span class="thetype" :style="{backgroundColor:colorlist[item.type%7]}">{{item.typeName}}</span><span class="theauthor dot">{{item.author}}</span><span class="thetime dot">{{item.time}}</span><span   class="readingtimes">{{item.readingtimes}}</span>次阅读</div>
            </div>
            <div class="picintro"></div>
          </router-link>
        </div>
          <div class="page-box">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                           layout="total, prev, pager, next, jumper,slot" :total="total">
              <button style="cursor: pointer;color: white">GO</button>
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评论" name="4">
          <div class="recom" v-for="item in comments">
            <router-link :to="item.href">
            <div class="textintro">
              <div class="thetitle">{{item.title}}</div>
              <div class="theinfos"><span class="thetype" :style="{backgroundColor:colorlist[item.type%7]}">{{item.typeName}}</span><span class="theauthor dot">{{item.author}}</span><span class="thetime dot">{{item.time}}</span><span   class="readingtimes">{{item.readingtimes}}</span>次阅读</div>
            </div>
            <div class="picintro"></div>
            </router-link>
        </div>
          <div class="page-box">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                           layout="total, prev, pager, next, jumper,slot" :total="total">
              <button style="cursor: pointer;color: white">GO</button>
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="5">
          <div class="recom" v-for="item in collections">
            <router-link :to="item.href">
              <div class="textintro">
                <div class="thetitle">{{item.title}}</div>
                <div class="theinfos"><span class="thetype" :style="{backgroundColor:colorlist[item.type%7]}">{{item.typeName}}</span><span class="theauthor dot">{{item.author}}</span><span class="thetime dot">{{item.time}}</span><span   class="readingtimes">{{item.readingtimes}}</span>次阅读</div>
              </div>
              <div class="picintro"></div>
            </router-link>
          </div>
          <div class="page-box">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                           layout="total, prev, pager, next, jumper,slot" :total="total">
              <button style="cursor: pointer;color: white">GO</button>
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        activeName: '1',
        currentPage: 1,// 分页 当前页码
        pageSize: 10,// 分页 单页数量
        total: 0,// 分页 总数
        islogin: false,
        loginUser: {},
        collections:[],
        comments:[],
        liked:[],
        posts:[],
        colorlist:{0:'#42c67d',1:'#56c4e1',2:'#857dea',3:'#e8596b',4:'#606b9e',5:'#abbb79',6:'#ff955b',7:'#508bc6'},
      };
    },
    methods: {
      handleCurrentChange: function (val) {
        this.currentPage=val;
        this.getUserPosts();
      },
      handleClick(tab, event) {
        console.log(tab, event);
        this.currentPage=1;
        this.getUserPosts();
      },
      goEdit(){
        this.$router.push({path: '/myedit'});
      },
      getUserPosts(){
        var t = this;
        this.$fetch({
          url: '/post/getUserPost',
          method: 'get',
          params: {
            id: this.loginUser.id,
            pageNum: this.currentPage-1,
            pageSize: this.pageSize
          }
        }).then(function (res) {
          if(res.code===200){
            t.collections = res.data.data;
            t.posts = res.data.data;
            t.liked = res.data.data;
            t.comments = res.data.data;
            t.total = res.data.total;
          }
        }).catch(function (err) {
          console.log('网络异常，获取首页失败！');
        })
      }
    },
    created(){
      this.loginUser=this.$storage.getSession('login-user');
      this.islogin = this.loginUser !== null;
      this.getUserPosts();
    },
    mounted(){
      if (this.$storage.getSession('login-user')==null){
        this.$message.error('请先登录');
        this.$router.push({path: '/'});
        return;
      }

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

  .picintro {
    width: 8.9rem;
    height: 5.75rem;
    background-color: #fff;
    border-radius: 2px;
    //background-image: url();
    background-size: cover;
  }
  .page-box{
    text-align: center;
    padding: 10px 0;
  }
  .thetitle {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
    margin: .5rem 0 .8rem;
  }

  .thetitle:hover {
    text-decoration: underline;
  }

  .theinfos {
    font-size: 1rem;
    color: #8f969c;
  }

  .thetype {
    display: inline-block;
    margin-right: 1.2rem;
    padding: .38rem 0;
    min-width: 4.5rem;
    text-align: center;
    line-height: 1;
    color: #fff;
    border-radius: 2px;
  }
  .recom a{
    display: flex;
    align-items: center;
    padding: 1.167rem 2rem;
    min-height: 5.75rem;
    justify-content: space-between;
    border-bottom: 1px solid #f6f6f6;
    cursor: pointer;
  }

  .recom:hover {
    background-color: rgba(0,0,0,.01);
  }
  .recom{
    background-color: white;
    border: 1px solid rgba(142, 142, 142, 0.2);;
  }
  .dot:after {
    content: "\B7";
    margin: 0 .4em;
    color: #b2bac2;
  }

</style>
