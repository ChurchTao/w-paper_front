<template>
  <div class="tag-cell">
    <div>
      <img src="../../static/outlink1.png"/>
    </div>
    <div class="name">
      Redis
    </div>
    <div>
      <span>367 关注</span>
      <span>730 文章</span>
    </div>
    <div>
      <div class="button-wrapper">
        已关注
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tag-cell",
    props: {}
  }
</script>

<style lang='scss'>
  .tag-cell {
    padding: 30px 40px;
    width: 240px;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 15px 15px;
    & > div {
      text-align: center;
      margin-bottom: 5px;
      img {
        width: 40px;
        height: 40px;
      }
      span {
        color: rgba(0, 0, 0, 0.6);
      }
    }
    .name {
      font-size: 18px;
    }
    .button-wrapper {
      display: inline-block;
      padding: 8px 15px;
      margin: 0 auto;
      box-sizing: border-box;
      background: #98c379;
      color: white;
    }
  }
</style>
