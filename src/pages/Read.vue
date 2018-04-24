<template>
  <div class="read">
    <el-row :gutter="20" class="content-main">
      <el-col :span="18">
        <!--标题-->
        <el-card class="box-card">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <div class="text item">
                {{postInfo.title}}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="author">
                {{authorInfo.nickname}}
              </div>
              <br/>
              <div class="time">
                {{postInfo.createtime | formatDate}}
              </div>
            </el-col>
          </el-row>

        </el-card>
        <!--文章-->
        <el-card style="margin-top: 10px" class="box-card">
          <markdown-read class="post"
                         :previewStatusP="true"
                         :dataIn="markdownText"
          ></markdown-read>
        </el-card>

        <!--点赞等工具条-->

        <!--评论-->
        <div class="comment-main">
          <el-card style="margin-top: 10px;padding: 0" class="box-card">
            <div class="title">154 条评论</div>
            <div class="comment-wrapper">
              <comment-cell v-for="(item, index) in commentList" :key="index" :item="item"></comment-cell>
            </div>
            <div class="page-box">
              <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                             layout="total, prev, pager, next, jumper,slot" :total="total">
                <button style="cursor: pointer;color: white">GO</button>
              </el-pagination>
            </div>
            <div class="comment-wrapper">
              <div class="send-title">发表评论</div>
              <div class="send-comment">
                <el-input size="small" placeholder="请写下你的评论..."></el-input>
                <el-button>发表</el-button>
              </div>
            </div>
            <div class="">

            </div>
          </el-card>
        </div>

      </el-col>
      <el-col :span="6">
        <!--作者-->
        <el-card class="box-card">
          <div slot="header">
            <span>关于作者</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看主页</el-button>
          </div>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <img class="author-img" :src="authorInfo.avatar"/>
            </el-col>
            <el-col style="margin-top: 5px" :span="10">
              <div class="author padding1">
                {{authorInfo.nickname}}
              </div>
              <div class="author-info padding1">
                {{authorInfo.info}}
              </div>
            </el-col>
          </el-row>

          <div style="margin-top: 10px" class="author padding1">
            总共被点赞：{{authorInfo.likeNum}}
          </div>
          <div class="author padding1">
            文章被阅读：{{authorInfo.likeNum}}
          </div>
        </el-card>
        <!--推荐文章-->

      </el-col>
    </el-row>


  </div>
</template>

<script>
  import markdownRead from '../components/markdownRead'
  import {formatDate} from '../service/date'
  export default {
    name: 'Read',
    data() {
      return {
        markdownText: '# ???',
        postIdNow:0,
        currentPage: 1,// 分页 当前页码
        pageSize: 6,// 分页 单页数量
        total: 0,// 分页 总数

        commentList: [
          {
            name: 'Asura',
            response: null,
            content: '本回答经许可转载的只有4人，其余都是违规未经授权转载的。',
            isThumb: false
          }
        ]
        ,
        postInfo:{},
        authorInfo:{},
      }
    },
    components: {
      markdownRead
    },
    filters:{
        formatDate(time){
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
    ,
    methods:{
      handleCurrentChange: function (val) {

      },
      getPost:function () {
        let t = this;
        this.$fetch({
          url: '/post/getPostById',
          method: 'get',
          params: {
            id: this.postIdNow,
          }
        }).then(function (res) {
          if(res.code===200){
            t.postInfo = res.data;
            t.markdownText = res.data.content;
          }
        }).catch(function (err) {
          console.log('网络异常，获取失败！');
        })
      },
      getAuthor:function () {
          let t = this;
        this.$fetch({
          url: '/post/getAuthor',
          method: 'get',
          params: {
            id: this.postIdNow,
          }
        }).then(function (res) {
          if(res.code===200){
            t.authorInfo = res.data;
          }
        }).catch(function (err) {
          console.log('网络异常，获取失败！');
        })
      }
    },
    created:function () {
      this.postIdNow= this.$route.params.id;
      this.getPost();
      this.getAuthor();
    },
    mounted:function(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .content-main {
    width: 75%;
    height: 90%;
  }

  .post {
    width: 100%;
    height: 500px;
  }

  .read {
    width: 100%;
    height: 100%;
  }

  .text {
    font-size: 2rem;
    font-weight: 600;
  }

  .item {
    padding: 5px 0;
  }

  .box-card {
    width: 100%;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .author {
    font-size: 13px;
  }

  .author-info {
    font-size: 13px;
    color: #999;
  }

  .padding1 {
    padding: 2px 0;
  }

  .author-img {
    border-radius: 50%;
    width: 100%;
  }

  .comment-main {
    .el-card {
      & > div {
        padding: 0;
      }
    }

    .title {
      font-size: 14px;
      padding: 0 0 20px;
      box-sizing: border-box;
    }
    .comment-wrapper {
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 15px 10px;
      box-sizing: border-box;
      border-radius: 5px;
      box-shadow: 0 0 1px #888888;

      .send-title{
        font-size: 14px;
        margin-bottom: 10px;
      }
      .send-comment{
        display: flex;
        justify-content: space-between;
        .el-input{
          flex: 0.9;
        }
        button{
          /*flex: 0.2;*/
        }
      }
    }
    .page-box{
      text-align: center;
      padding: 10px 0;
    }
  }
</style>
