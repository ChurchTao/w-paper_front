<template>
  <div class="tag-management" ref="tagManagement">
    <div class="tag-wrapper">
      <tag-cell v-for="(item, index) in tagList" :key="index"  :item="item"></tag-cell>

    </div>
  </div>
</template>

<script>
  export default {
    name: "tag-management",
    data() {
      return {
          tagList:[
          ]
          ,
        loginUser:{},
        islogin:false
      }
    },
    created:function () {
      this.loginUser = this.$storage.getSession('login-user');
      this.islogin = this.loginUser !== null;
      this.getTags();
    }
    ,
    mounted: function () {
      // let w = window.innerHeight;
      // this.$refs.tagManagement.style.minHeight = w + 'px';
    },
    methods: {
        getTags:function () {
          let t = this;
          this.$fetch({
            url: '/profession/getTags',
            method: 'get',
            params: {
              userId: this.loginUser.id,
            }
          }).then(function (res) {
            if(res.code===200){
              t.tagList = res.data;
            }
          }).catch(function (err) {
            console.log('网络异常，获取失败！');
          })
        }

    }
  }
</script>

<style lang='scss'>
  .tag-management {
    width: 100%;
    background: white;
    padding: 30px 0;
    box-sizing: border-box;
    .tag-wrapper {
      width: 1080px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }
</style>
