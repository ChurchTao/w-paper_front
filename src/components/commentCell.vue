<template>
  <div class="commentCell-wrapper">
    <div class="first-row">
      <div class="left">
        <img src="../../static/outlink1.png"/>
        <span>咖喱给给</span>
        <span class="response">回复</span>
        <span>给给咖喱</span>
      </div>
      <div class="right">
        <span>10 天前</span>
      </div>
    </div>
    <div class="content">
      <p>冤有头，债有主，该得的补偿可以走司法程序，不给揍老板一顿我也敬他是条汉子，但这样偷偷摸摸搞破坏，搞不好让.Net背黑锅，就坑队友了</p>
    </div>
    <div class="bottom-wrapper">
      <button>大拇指 👍</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "comment-cell"
  }
</script>

<style lang='scss'>
  .commentCell-wrapper{
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    padding-bottom: 10px;
    .first-row{
      display: flex;
      justify-content: space-between;
      .left{
        img{
          width: 24px;
          height: 24px;
        }
        span{
          font-size: 15px;
          line-height: 24px;
          margin-left: 10px;
          color: #000;
        }
        .response{
          color: rgba(0,0,0,0.6);
        }
      }
      .right{
        span{
          font-size: 15px;
          line-height: 24px;
          color: rgba(0,0,0,0.4);
          font-weight: 500;
        }
      }
    }
    .content{
      font-size: 14px;
      padding: 10px 0;
    }
    .bottom-wrapper{

    }
  }
</style>
