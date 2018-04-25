<template>
  <div class="commentCell-wrapper">
    <div class="first-row">
      <div class="left">
        <img :src="item.avatar"/>
        <span>{{item.name}}</span>
        <span v-if="item.response" class="response">回复</span>
        <span v-if="item.response">{{item.response}}</span>
      </div>
      <div class="right">
        <span>{{item.time | formatDate}}</span>
      </div>
    </div>
    <div class="content">
      <p>{{item.content}}</p>
    </div>
    <div class="bottom-wrapper" v-if="!isReplyShow">
      <button @click="toThumb()">
        <i v-if="!item.isThumb" class="fa fa-thumbs-o-up" aria-hidden="true"></i>
        <i v-if="item.isThumb" class="fa fa-thumbs-up" aria-hidden="true"></i>
        <span>24</span>
      </button>
      <button class="reply-button" @click="toShowReply()">
        <i class="fa fa-reply" aria-hidden="true"></i>
        <span>回复</span>
      </button>
    </div>
    <div class="reply-wrapper" v-if="isReplyShow">
      <el-input :placeholder="'回复' + item.name" size="small" v-model="reply"></el-input>
      <div class="reply-button-wrapper">
        <el-button size="small" class="cancel" type="text" @click="toCancelReply()">取消</el-button>
        <el-button size="small" type="primary" @click="toResponse()">评论</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../service/date'

  export default {
    name: "comment-cell",
    props: {
      item: {
        type: Object,
        default: {}
      },
      postId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isReplyShow: false,// 是否 显示回复
        reply: null,// 回复内容
        loginUser: {}
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created: function () {
      this.loginUser = this.$storage.getSession('login-user');
      this.islogin = this.loginUser !== null;
    },
    methods: {
      toThumb: function () {
        // 点赞
        this.item.isThumb = !this.item.isThumb;
      },
      toShowReply: function () {
        // 显示 回复框
        this.isReplyShow = !this.isReplyShow;
      },
      toCancelReply: function () {
        // 隐藏 回复框
        this.reply = null;
        this.isReplyShow = !this.isReplyShow;
      },
      toResponse: function () {
        // 回复评论
        console.log(this.loginUser);
        let v = this;
        this.$fetch({
          url: '/comment/publish',
          method: 'post',
          data: {
            content: this.reply,
            userId: this.loginUser.id,
            postId: this.postId,
            parentId: this.item.userId
          }
        }).then(function (res) {
          if (res.code === 200) {
            v.$message({
              message: res.msg,
              type: 'success'
            });
            setTimeout(function () {
              location.reload();
            },1000);
          } else {
            v.$message.error(res.msg);
          }
        }).catch(function (err) {

        })
      }
    }
  }
</script>

<style lang='scss'>
  .commentCell-wrapper {
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 10px;
    &:last-child {
      border-bottom: 1px solid transparent;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    &:hover {
      .bottom-wrapper {
        .reply-button {
          display: inline;
        }
      }
    }
    .first-row {
      display: flex;
      justify-content: space-between;
      .left {
        img {
          width: 24px;
          height: 24px;
        }
        span {
          font-size: 15px;
          line-height: 24px;
          margin-left: 10px;
          color: #000;
        }
        .response {
          color: rgba(0, 0, 0, 0.6);
        }
      }
      .right {
        span {
          font-size: 15px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.4);
          font-weight: 500;
        }
      }
    }
    .content {
      font-size: 14px;
      padding: 10px 0;
    }
    .bottom-wrapper {
      line-height: 20px;
      button {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        padding: 0 5px;
        box-sizing: border-box;
        margin-right: 5px;
        background: transparent;
        i {
          font-size: 14px;
        }
      }
      .reply-button {
        display: none;
      }
    }
    .reply-wrapper {
      margin-top: 5px;
      .reply-button-wrapper {
        display: flex;
        justify-content: flex-end;
        margin: 10px;
        .cancel {
          color: grey;
        }
      }
    }
  }
</style>
