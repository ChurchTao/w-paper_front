<template>
  <div class="tag-management" ref="tagManagement">
    <div class="tag-wrapper">
      <div class="tag-cell">
        <div>
          <el-button class="button1" @click="createNew">
            创建新版块
          </el-button>
        </div>
      </div>
      <tag-cell v-for="(item, index) in tagList" :key="index"  :item="item"></tag-cell>
    </div>
  </div>
</template>

<script>
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
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
        },
      createNew:function () {
        this.$router.push({path: '/newtag'});
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
  .tag-cell {
    padding: 30px 40px;
    width: 240px;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 15px 15px;
    .button1{
      margin-top: 30%;
    }
  }
</style>
