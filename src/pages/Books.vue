<template>
  <div class="bookspage">
    <div class="books-container">
      <div class="books-left">
        <router-link to="/" class="bookslist" v-for="n in 13" :key="n">
          <img src="../assets/images/1.png"/>
          <div class="books-details">
            <div class="title">使用webpack定制前端开发环境</div>
            <div class="desc">基于4.x版本，从细节和深度上弄懂webpack，随心所欲定制前端开发环境</div>
            <div class="author"><img src="../assets/images/1.png"/><span>teabyii</span><span class="author-info">前支付宝前端开发，现唯品会高级开发</span></div>
            <div class="moreinfo"><span class="price">19.9</span><span>16</span>小节 · 阅读时长<span>122分</span>&nbsp·&nbsp<span>609</span>人已购买</div>
          </div>
        </router-link>
      </div>
      <div class="books-right">
        <div class="books-right-inner">
          <div class="sidebar">
            <p class="title">掘金小册是什么？</p>
            <p class="desc">一个小篇幅、高浓度、成体系、有收益的技术学习平台</p>
          </div>
          <div class="codebar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'books',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.moreinfo .price{
  color: #ed7b11;
  font-size: 18px;
  margin-right: 20px;
}

.moreinfo {
  display: flex;
  align-items: center;
  margin-top: 6px;
  font-size: 14px;
  color: #71777c;
}


.books-left .author-info {
  color: #71777c;
  margin-left: 10px;
  margin-right: 10px;
}

.books-left .title {
  font-size: 20px;
  font-weight: 400;
  color: rgb(46, 49, 53);
}

.books-left .desc {
  margin-top: 5px;
  line-height: 20px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #71777c;
  font-size: 14px;
}

.books-left .author {
  display: flex;
  align-items: center;
  margin-top: 6px;
  font-size: 14px;
  color:black;
}

.books-details {
  padding-left: 22px;
}

.author img {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-right: 8px;
}

.bookslist {
  display:flex;
  padding: 20px;
  border-bottom: 1px solid #e6e8e8;
}

.bookslist>img {
  width:100px;
  height:140px;
}

.books-container {
  max-width: 960px;
  width: 100%;
  display: flex;
  justify-content:space-between;
  align-items: flex-start;
}

.books-left {
  background-color: white;
  flex-grow: 1;
}

.books-right {  
  width: 240px;
  margin-left: 20px;
  position: relative;
}

.books-right-inner {
  width: 240px;
  background-color: white;
  position: fixed;
}

.sidebar {
  padding: 15px 20px;
  border-bottom: 1px solid #e6e8e8;
}

.books-right .title {
  font-size: 15px;
}

.books-right .desc {
  margin-top: 8px;
  line-height: 1.4;
  font-size: 14px;
  color: #646464;
}

.codebar {
  height: 120px;
  background-image: url('../assets/images/background.png');
  background-position: 50%;
  background-size: contain;
}

</style>
