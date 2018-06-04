<template>
  <div class="tag-management" ref="tagManagement">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已关注" name="first">
        <div class="tag-wrapper">
        <tag-cell v-for="(item, index) in tagList" :key="index"  :item="item"></tag-cell>
      </div>
        <div class="page-box">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                         layout="total, prev, pager, next, jumper,slot" :total="total">
            <button style="cursor: pointer;color: white">GO</button>
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="未关注" name="second">
        <div class="tag-wrapper">
          <div class="tag-cell">
            <div>
              <el-button class="button1" @click="createNew">
                创建新版块
              </el-button>
            </div>
          </div>
          <tag-cell v-for="(item, index) in tagList2" :key="index"  :item="item"></tag-cell>
        </div>
        <div class="page-box">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
                         layout="total, prev, pager, next, jumper,slot" :total="total">
            <button style="cursor: pointer;color: white">GO</button>
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

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
          ],
        tagList2:[
        ]
          ,activeName: 'first',
        loginUser:{},
        islogin:false,
        currentPage: 1,// 分页 当前页码
        pageSize: 11,// 分页 单页数量
        total: 0,// 分页 总数
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
            url: '/profession/getTagsFocus',
            method: 'get',
            params: {
              userId: this.loginUser.id,
              pageNum: this.currentPage-1,
              pageSize: this.pageSize
            }
          }).then(function (res) {
            if(res.code===200){
              t.tagList = res.data.data;
              t.total = res.data.total;
            }
          }).catch(function (err) {
            console.log('网络异常，获取失败！');
          })
        },
      handleClick(tab, event) {
        this.currentPage=1;
        if (tab.name=='first'){
            this.getTags();
        }else {
            this.getTags2();
        }
      },
      getTags2:function () {
        let t = this;
        this.$fetch({
          url: '/profession/getTagsNotFocus',
          method: 'get',
          params: {
            userId: this.loginUser.id,
            pageNum: this.currentPage-1,
            pageSize: this.pageSize
          }
        }).then(function (res) {
          if(res.code===200){
            t.tagList2 = res.data.data;
            t.total = res.data.total;
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
