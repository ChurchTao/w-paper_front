<template>
  <div class="read">
    <el-row :gutter="20" class="content-main">
      <el-col :span="18">
        <!--标题-->
        <el-card class="box-card">
          <el-row type="flex" justify="space-between">
            <el-col :span="6">
              <div class="text item">
              文章标题
              </div>
            </el-col>
            <el-col :span="6">
              <div class="author">
                作者
              </div>
              <br/>
              <div class="time">
                2018-04-21 17:39
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
              <comment-cell></comment-cell>
              <comment-cell></comment-cell>
              <comment-cell></comment-cell>
              <comment-cell></comment-cell>
              <comment-cell></comment-cell>
            </div>
          </el-card>
        </div>

      </el-col>
      <el-col :span="6">
        <!--作者-->
        <el-card class="box-card">
          <div slot="header" >
            <span>关于作者</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看主页</el-button>
          </div>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <img class="author-img" src="../assets/logo.png"/>
            </el-col>
            <el-col style="margin-top: 5px" :span="10">
              <div class="author padding1" >
              作者姓名
              </div>
              <div class="author-info padding1" >
                作者简介
              </div></el-col>
          </el-row>

          <div class="author padding1" >
            总共被点赞：1.3k
          </div>
          <div class="author padding1" >
            文章被阅读：3.8k
          </div>
        </el-card>
        <!--推荐文章-->

      </el-col>
    </el-row>



  </div>
</template>

<script>
import markdownRead from '../components/markdownRead'
export default {
  name: 'Read',
  data () {
    return {
        markdownText :"# input"
    }
  },
  components:{
    markdownRead
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .content-main{
    width: 75%;
    height: 90%;
  }
  .post{
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
  .author{
    font-size: 13px;
  }
  .author-info{
    font-size: 13px;
    color: #999;
  }
  .padding1{
    padding: 2px 0;
  }
  .author-img{
    border-radius: 50%;
    width: 100%;
  }

  .comment-main{
    .el-card{
      &>div{
        padding: 0;
      }
    }

    .title{
      font-size: 14px;
      padding: 0 0 20px;
      box-sizing: border-box;
    }
    .comment-wrapper{
      border: 1px solid rgba(0,0,0,0.2);
      padding: 15px 10px;
      box-sizing: border-box;
      border-radius: 5px;
      box-shadow: 0 0 1px #888888;
    }
  }
</style>
