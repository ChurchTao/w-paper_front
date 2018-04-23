<template>
  <div class="homepage">
    <div class="home-container">
      <div class="home-left">
        <div class="home-left-title">
          <span>热门文章</span>
          <ul class="categories">
            <li v-for="item in cate" :key="item.id"><router-link :to="item.url" exact>{{item.typeName}}</router-link></li>
          </ul>
        </div>
        <div  class="main-content">
          <div v-if="isrecom">
            <div class="recom" v-for="item in recomlist">
              <a href="#">
                <div class="textintro">
                  <div class="thetitle">{{item.title}}</div>
                  <div class="theinfos"><span class="thetype" :style="{backgroundColor:colorlist[item.type]}">{{item.typeName}}</span><span class="theauthor dot">{{item.author}}</span><span class="thetime dot">{{item.time}}</span><span   class="readingtimes">{{item.readingtimes}}</span>次阅读</div>
                </div>
                <div class="picintro"></div>
              </a>
            </div>
          </div>
          <div v-else class="morecates" @mouseover="sharebutton=true" @mouseleave="sharebutton=false" v-for="item in entrylist">
            <a>
              <div>
                <div class="firstline"><span class="hot" v-if="item.ishot">热</span><span class="specialist" v-if="item.isspecialist">专栏</span><span class="theauthor">{{item.author}}</span><span class="thetime">{{item.time}}</span></div>
                <div class="catetitle">{{item.title}}</div>
                <div class="lastline">
                  <div class="lastline-left"><span class="like"><img src="../assets/images/like.svg">{{item.like}}</span><span class="comments"><img src="../assets/images/comment.svg">{{item.comment}}</span></div>
                  <div class="lastline-right" v-show="sharebutton"><span><img src="../assets/images/share.svg"></span><span><img src="../assets/images/favourite.svg"></span></div></div>
              </div>
                <div class="picintro"></div>
            </a>
          </div>
        </div>
      </div>
      <div class="home-right">
        <div class="sideblock firstblock">
          <div class="title">掘金 - juejin.im</div>
          <div class="intro">一个帮助开发者成长的社区</div>
          <div class="input-wrapper">
            <input v-model="nickName1" placeholder="昵称" maxlength="20">
          </div>
          <div class="input-wrapper">
            <input v-model="phoneOrEmail1" placeholder="邮箱 / 手机" maxlength="64">
          </div>
          <div class="input-wrapper">
            <input v-model="password1" placeholder="密码(不少于6位)" maxlength="64">
          </div>
          <button class="regbutton" @click="submitNow()">立即注册</button>
          <div class="thirdpartylogin">第三方登陆：<img src="../assets/images/weibo.svg"/><img src="../assets/images/github.svg"/><img src="../assets/images/wechat.svg"/></div>
        </div>
        <div class="sideblock secondblock">
          <div class="hottag"><span>热门标签</span><a>查看全部</a></div>
          <div class="tagslist">
            <router-link :to="tag.url" :key="tag.id" target="_blank" v-for="tag in tags">{{tag.name}}</router-link>
          </div>
        </div>
        <div class="sideblock thirdblock">
          <img src="../assets/images/download.png">
          <div class="desc">
            <h1>下载掘金客户端</h1>
            <div>一个帮助开发者成长的社区</div>
          </div>
        </div>
        <div class="sideblock fourthblock">
          <ul>
            <li v-for="item in linkout" :key="item.id">
              <router-link :to="item.url"><img :src="item.src"/><span>{{item.name}}</span></router-link>
            </li>
          </ul>
        </div>
        <div class="ad">
          <router-link to="/">
            <div class="ad1">
            </div>
          </router-link>
        </div>
        <div class="ad">
          <router-link to="/">
            <div class="ad2">
            </div>
          </router-link>
        </div>
        <div class="sideblock followus">
          <div>关注我们</div>
          <ul>
            <li><a href="#"><img src="../assets/images/followweibo.png"></a></li>
            <li><a href="#"><img src="../assets/images/followwechat.png"></a></li>
            <li><a href="#"><img src="../assets/images/followzhihu.png"></a></li>
            <li><a href="#"><img src="../assets/images/followjianshu.png"></a></li>
          </ul>
        </div>
        <div class="moreinfo">
          <ul>
            <li><a href="#">关于</a><span>·</span></li>
            <li><a href="#">招聘</a><span>·</span></li>
            <li><a href="#">商务合作</a><span>·</span></li>
            <li><a href="#">友情链接</a></li>
          </ul>
          <ul>
            <li><a href="#">发现更多</a></li>
            <li><span>·</span>©2018 掘金</li>
          </ul>
        </div>
        <div class="adsfxied" v-show="adsshow">
        <div class="fixedwrapper">
          <div class="ad">
            <router-link to="/">
              <div class="ad1">
              </div>
            </router-link>
          </div>
          <div class="ad">
            <router-link to="/">
              <div class="ad2">
              </div>
            </router-link>
          </div>
          <div class="sideblock thirdblock">
            <img src="../assets/images/download.png">
            <div class="desc">
              <h1>下载掘金客户端</h1>
              <div>一个帮助开发者成长的社区</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      tags:[                {url:'/',name:'架构',id:1},{url:'/',name:'开源',id:2},{url:'/',name:'算法',id:3},{url:'/',name:'GitHub',id:4},{url:'/',name:'面试',id:5},{url:'/',name:'代码规范',id:6},{url:'/',name:'产品',id:7},{url:'/',name:'掘金翻译计划',id:8}
      ],
      linkout:[      {url:'/#',name:'收藏级',src:'/static/outlink1.png',id:1},{url:'/',name:'下载掘金浏览器插件',src:'/static/outlink2.png',id:2},{url:'/',name:'前往掘金翻译计划',src:'/static/outlink3.png',id:3},{url:'/',name:'商务合作',src:'/static/outlink4.png',id:4}
      ],
      adsshow:false,
      cate:[        {url:'/',typeName:'推荐',type:'',id:1},{url:'/welcome/frontend',typeName:'前端',type:'frontend',id:2},{url:'/welcome/android',typeName:'Android',type:'android',id:3},{url:'/welcome/backend',typeName:'后端',type:'backend',id:4},{url:'/welcome/ai',typeName:'人工智能',type:'ai',id:5},{url:'/welcome/ios',typeName:'iOS',type:'ios',id:6},{url:'/welcome/freebie',typeName:'工具资源',type:'freebie',id:7},{url:'/welcome/article',typeName:'阅读',type:'article',id:8}
      ],
      sharebutton:false,
      isrecom:true,
      entries:[
        {href:'#',title:'我是前端',author:'前端作者A',typeName:'前端',type:'frontend',readingtimes:293,tags:[],like:6,comment:11,ishot:true,isspecialist:true,time:'3天前'},
        {href:'#',title:'我是前端1',author:'前端作者B',typeName:'前端',type:'frontend',readingtimes:953,tags:[],like:6,comment:11,ishot:false,isspecialist:true,time:'2天前'},
        {href:'#',title:'我是前端2',author:'前端作者C',typeName:'前端',type:'frontend',readingtimes:295,tags:[],like:6,comment:11,ishot:true,isspecialist:true,time:'1天前'},
        {href:'#',title:'我是后端',author:'后端作者A',typeName:'后端',type:'backend',readingtimes:23,tags:[],like:16,comment:12,ishot:true,isspecialist:false,time:'13天前'},
        {href:'#',title:'我是人工智能',author:'人工智能作者A',typeName:'人工智能',type:'ai',readingtimes:2,tags:[],like:26,comment:13,ishot:true,isspecialist:true,time:'23天前'},
        {href:'#',title:'我是人工智能1',author:'人工智能作者B',typeName:'人工智能',type:'ai',readingtimes:53,tags:[],like:26,comment:13,ishot:false,isspecialist:false,time:'12天前'},
        {href:'#',title:'我是工具资源',author:'工具资源作者A',typeName:'工具资源',type:'freebie',readingtimes:93,tags:[],like:36,comment:14,ishot:true,isspecialist:true,time:'12天前'},
        {href:'#',title:'我是阅读',author:'阅读作者A',typeName:'阅读',type:'article',readingtimes:2953,tags:[],like:46,comment:15,ishot:false,isspecialist:false,time:'22天前'},
        {href:'#',title:'我是iOS',author:'iOS作者A',typeName:'iOS',type:'ios',readingtimes:2953,tags:[],like:56,comment:16,ishot:true,isspecialist:true,time:'23天前'},
        {href:'#',title:'我是Android',author:'Android作者A',typeName:'Android',type:'android',readingtimes:253,tags:[],like:66,comment:17,ishot:true,isspecialist:true,time:'31天前'},
        {href:'#',title:'我是Android1',author:'Android作者B',typeName:'Android',type:'android',readingtimes:295,tags:[],like:66,comment:17,ishot:true,isspecialist:false,time:'13天前'},
        {href:'#',title:'我是Android2',author:'Android作者A',typeName:'Android',type:'android',readingtimes:293,tags:[],like:66,comment:17,ishot:false,isspecialist:true,time:'26天前'},
        {href:'#',title:'我是Android3',author:'Android作者C',typeName:'Android',type:'android',readingtimes:53,tags:[],like:66,comment:17,ishot:true,isspecialist:false,time:'7天前'},
      ],
      entrylist:[],
      recomlist:[],
      colorlist:{frontend:'#56c4e1',backend:'#857dea',ai:'#e8596b',freebie:'#606b9e',article:'#abbb79',ios:'#ff955b',android:'#42c67d'},
      nickName1:"",
      phoneOrEmail1:"",
      password1:""
    }
  },
  methods:{
    targetList(thetype){
      return this.entries.filter(v=>v.type==''+thetype);
    },
    submitNow(){
//      this.$fetch({
//        url: '/getAllUser',
//        method: 'get',
//      }).then(function (res) {
//        console.log(res)
//      }).catch(function (err) {
//
//      })
      this.$fetch({
        url: '/user/init',
        method: 'post',
        data: {
          username : this.nickName1,
          phoneOrEmail : this.phoneOrEmail1,
          password : this.password1
        }
      }).then(function (res) {
        console.log(res.msg)
      }).catch(function (err) {

      })
    },
    shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
      return a;
    }

  },
  mounted:function(){
    this.recomlist=this.shuffle(this.entries);
  },
  beforeRouteUpdate(to,from,next){
   if(to.params.type){
     this.isrecom=false;
     this.entrylist=this.targetList(to.params.type);
   }else{
     this.isrecom=true;
     this.recomlist=this.shuffle(this.entries);
   }
    next();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.morecates .lastline {
  display: flex;
  align-items: center;
}

.morecates .lastline .lastline-left {
  display: flex;
}

.morecates .lastline .lastline-right {
  margin-left: .8rem;
  display: flex;
}

.morecates .lastline span {
  padding: 0 .8rem;
  color: #b2bac2;
  border-radius: 1px;
  border: 1px solid #edeeef;
  height: 2rem;
  font-size: 1.083rem;
  line-height: 1;
  display: flex;
  align-items: center;
}

.morecates .lastline span:hover {
  background-color: #f7f8fa;
}

.morecates .firstline span:after {
  content: "\B7";
  margin: 0 .4em;
  color: #b2bac2;
}

.morecates .firstline span:last-child:after {
  display: none;
}

.morecates .hot {
  font-weight: 500;
  color: red;
}

.morecates .specialist {
  font-weight: 500;
  color: #b71ed7;
}

.morecates .catetitle {
  margin: .5rem 0 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.2;
  color: #2e3135;
}

.morecates .catetitle:hover {
  text-decoration: underline;
}

.morecates .firstline {
  font-size: 1rem;
  color: #b2bac2;
}

.morecates a {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.morecates {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f6f6f6;
  cursor: pointer;
}

.morecates:hover {
  background-color: rgba(0,0,0,.01);
}

.picintro {
  width: 8.9rem;
  height: 5.75rem;
  background-color: #fff;
  border-radius: 2px;
  //background-image: url();
  background-size: cover;
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

.dot:after {
  content: "\B7";
  margin: 0 .4em;
  color: #b2bac2;
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

.home-left-title ul{
  display: flex;
  align-items: center;
}

.home-left-title span {
  font-size: 16px;
  font-weight: 500;
}

.home-left-title li {
  margin-right: 20px;
  font-size: 14px;
  color: #90979c;
}

.home-left-title li:last-child {
  margin-right: 0;
}


.home-left-title {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f6f6f6;
}

.home-left {
  flex-grow: 1;
  background-color: #fff;
}


.adsfxied {
  position: absolute;
  left: 0;
  top: 0;
}

.fixedwrapper {
  position: fixed;
  width: 240px;
}

.moreinfo span {
  margin: 0 .4rem;
}

.moreinfo {
  display: flex;
  flex-direction: column;
  color: #909090;
  font-size: 1.1rem;
}

.moreinfo a {
  color: #909090;
  font-size: 1.1rem;
}

.moreinfo ul{
  display: flex;
  justify-content: center;
  margin-bottom: .4rem;
}

.ad {
  height: 200px;
  margin-bottom: 1.5rem;
}

.ad a{
  display: block;
  height: 100%;
}

.ad1 {
  background-image: url(../assets/images/ad1.jpg);
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  height: 100%;
}

.ad2 {
  background-image: url(../assets/images/ad2.jpg);
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  height:100%;
}

.fourthblock a img {
  width: 3rem;
  margin-right: .8rem;
}

.fourthblock a span {
  font-size: 1.16rem;
  line-height: 1;
  color: #333;
}

.fourthblock a {
  display: flex;
  padding: 1rem;
  align-items: center;
}


.thirdblock {
  display: flex;
  align-items: center;
  padding: 1.3rem;
}

.thirdblock img {
  margin-right: .5rem;
  width: 4.167rem;
  height: 4.167rem;
}

.thirdblock .desc {
  cursor: pointer;
  color: #909090;
}

.thirdblock h1 {
  font-size: 1.167rem;
  font-weight: 600;
  color: #333;
}

.thirdblock .desc div {
  margin-top: .5rem;
  font-size: 1rem;
  color: #909090;
}

.tagslist a {
  margin-right: 12px;
  margin-bottom: 12px;
  background-color: #f3f6f3;
  cursor: pointer;
  height: 30px;
  color: inherit;
  line-height: 30px;
  padding-left: 22px;
  padding-right: 22px;
  border-radius: 30px;
}

.tagslist a:hover {
  color: #fff;
  background-color: #0c0;
}

.tagslist {
  padding-top: 15px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  word-break: break-word;
}


.hottag {
  display:flex;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}

.hottag span {
  font-size: 14px;
}

.hottag a {
  color: #007fff;
}

.thirdpartylogin img {
  margin-left: 1.2rem;
  height: 1.9rem;
  vertical-align: bottom;
  cursor: pointer;
}

.thirdpartylogin {
  margin-top: 1.5rem;
  font-size: 1rem;
  line-height: 1.9rem;
  color: #8f969c;
}

.firstblock .title {
  margin-bottom: .5rem;
  font-size: 1.167rem;
  font-weight: 600;
  color: #2e3135;
}

.firstblock .intro {
  margin-bottom: 1.333rem;
  font-size: 1.167rem;
  color: #2e3135;
}

.input-wrapper {
  position: relative;
  margin-bottom: .833rem;
}

.input-wrapper input {
  padding: .7rem .6rem;
  width: 100%;
  font-size: 1.167rem;
  background-color: #fbfbfb;
  border: 1px solid #f4f4f4;
  border-radius: 2px;
  outline: none;
  box-sizing: border-box;
  position: relative;
}

.regbutton {
  padding: .7rem 0;
  width: 100%;
  font-size: 1.167rem;
  background-color: #007fff;
  color: #fff;
  border-radius: 2px;
  border: none;
  transition: background-color .3s,color .3s;
  cursor: pointer;
}

.regbutton:hover {
  background-color: #0371df;
  color: #fff;
}

.home-container {
  max-width: 960px;
  width: 100%;
  display: flex;
  justify-content:space-between;
  align-items: flex-start;
}

.home-right {
  width: 240px;
  margin-left: 20px;
  position: relative;
}

.sideblock {
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 1.5rem;
}

.firstblock {
  padding: 1.333rem;
}

.secondblock {
  padding:15px;
}

.followus {
  background-color: #f4f5f5;
  display: flex;
  flex-direction: column;
  align-items:center;
  margin-bottom: 0;
  color: #909090;
}

.followus ul {
  display: flex;
  margin: 1rem 0;
}

.followus img {
  width: 24px;
  margin-left: .5rem;
  margin-right: .5rem;
}



</style>
