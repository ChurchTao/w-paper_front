<template>
  <div class="panel">
    <div class="arrow" v-if="isarrow" @click="backtotop">
      <i class="icon iconfont icon-jiantou"></i>
    </div>
    <div class="contact" @click="showcontact">
      <i class="icon iconfont icon-message"></i>
    </div>
    <div class="contactwindow" v-show="windowshow">
      <h1><span class="title">给我们留言</span><i class="icon iconfont icon-jiantouxia closearrow" @click="closecontact"></i></h1>
      <div class="content">
        <p>hello，有什么需要帮助的么？欢迎您的留言，我们之后会回复您，请耐心等待。亲爱的小伙伴，现在文章可以批量导入啦，点进写文章，然后点击头像，下方会出现批量导入功能，期待您的文章入驻掘金～</p>
        <div>
          <span>邮箱</span>
          <input placeholder="请输入邮箱">
        </div>
        <div>
          <span>微信</span>
          <input placeholder="请输入微信号">
        </div>
        <div>
          <span>留言内容</span>
          <textarea placeholder="请输入留言内容"></textarea>
        </div>
        <button @click="submitInfo()">提交</button>
      </div>
      <div class="footer"><i class="meiqia"></i>客服软件由美洽提供</div>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      windowshow: false,

    }
  },
  props:['isarrow'],
  methods:{
    showcontact(){
      this.windowshow=!this.windowshow;
    },
    closecontact(){
      this.windowshow=false;
    },
    backtotop(){
      this.$emit('backtotop');
    },
    submitInfo(){

    }
  }
}

</script>
<style scoped>

.footer {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #b7bac2;
  background-color: #f2f3f5;
  border-top: 1px solid #EDEDED;
  display: flex;
  justify-content: center;
  align-items: center;
}




.closearrow:hover {
  opacity: 1;
}

.content button {
  margin: 24px 0;
  padding: 0 16px;
  box-sizing: border-box;
  outline: none;
  background-color: #007aff;
  color: #fff;
  width: 100%;
  height: 44px;
  border-radius: 5px;
  line-height: 44px;
  text-align: center;
  font-size: 15px;
  display: block;
  cursor:pointer;
  border: none;
}

.content textarea {
  height: 90px;
  width: 100%;
  padding: 12px;
  border: none;
  outline: none;
  box-sizing: border-box;
  resize: none;
}

.content span {
  display: block;
  line-height: 1.42857143;
  font-size: 12px;
  margin: 16px 0 6px 16px;
}

.content input {
  width: 100%;
  height: auto;
  padding: 12px;
  border: none;
  font: 400 13.3333px Arial;
  outline: none;
  box-sizing: border-box;
}

.closearrow {
  cursor: pointer;
  opacity: .4;
  font-size: 1rem;
  align-self: flex-start;
  box-sizing: border-box;
}

.content p {
  margin: 16px;
  font-size: 12px;
  color: #666;
  word-break: break-all;
  line-height: 1.8;
}

.content {
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #f2f3f5;
  height: 100%;
  height: 390px;
  box-sizing: border-box;
}


.contactwindow {
  position: fixed;
  bottom: 0;
  right: 80px;
  font-size: 14px;
  line-height: 1.4;
  box-sizing: border-box;
  width: 320px;
  height: 480px;
  box-shadow: 2px 0px 2px #EDEDED, -2px 0px 2px #EDEDED;
}

.contactwindow h1 {
  background-color: #007aff;
  color: #fff;
  height: 60px;
  box-sizing: border-box;
  padding: 7px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.meiqia {
  background-image: url('../assets/images/juejinicons.png');
  background-size: 44px;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  display: inline-block;
  background-position: 0 -264px;
}

.panel .contact {
  color: #007fff;
}

.panel {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 100;
}

.contact, .arrow{
  margin: 1rem 0 0;
  width: 3.33rem;
  height: 3.33rem;
  font-size: 1.6em;
  line-height: 1;
  color: #909090;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0,0,0,.05);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
</style>
