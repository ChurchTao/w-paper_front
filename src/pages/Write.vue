<template>
  <div class="indexContainer">
    <!--<div class="btnsContainer">-->
      <!--<div class="btn" @click="getMdValueFn">获取mdValue</div>-->
      <!--<div class="btn" @click="getHtmlValueFn">获取htmlValue</div>-->
    <!--</div>-->
    <el-row :gutter="15" style="width: 75%">
      <el-col :span="8">
          <el-input v-model="input" placeholder="请输入标题.." ></el-input>
      </el-col>
      <el-col :span="4"><span class="titleInput">请选择分类：</span></el-col>
      <el-col :span="8">
        <el-cascader
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions"
          >
        </el-cascader>
      </el-col>
      <el-col :span="4">
        <el-button @click="submitPost" type="primary">确认发布</el-button>
      </el-col>
    </el-row>

    <div class="maskContainer" v-if="dilogStatus">
      <div class="contentContainer">
        <div class="closeBtnContainer" @click="closeMaskFn"></div>
        <textarea class="showAreaContainer" v-model="msgShow" readonly></textarea>
      </div>
    </div>
    <div class="editorContainer">
      <markdown
        :mdValuesP="msg.mdValue"
        :fullPageStatusP="false"
        :editStatusP="true"
        :previewStatusP="true"
        :navStatusP="true"
        :icoStatusP="true"
        @childevent="childEventHandler"
      ></markdown>
    </div>
  </div>
</template>

<script>
  import markdown from '../components/markdown'
  export default {
    name: 'write',
    data() {
      return {
          loginUser:{},
        islogin:false,
        input: '',
        msgShow:'我要显示的内容',
        dilogStatus:false,
        msg: {
          mdValue:''
        },
        options: [],
        selectedOptions: []
      }
    },
    components: {
      markdown
    },
    methods: {
      childEventHandler:function(res){
        // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
        this.msg=res;
      },
      getMdValueFn:function(){
        this.msgShow=this.msg.mdValue;
        this.dilogStatus=true;
      },
      getHtmlValueFn:function(){
        this.msgShow=this.msg.htmlValue;
        this.dilogStatus=true;

      },
      closeMaskFn:function(){
        this.msgShow='';
        this.dilogStatus=false;
      },
      getTypes:function () {
        const cate = this.$storage.getSession('user-cate');
        let options = [];
        for (let i=0;i<cate.length;i++){
            let option = {};
            option.value=cate[i].id;
            option.label=cate[i].typeName;
            options.push(option);
        }
        this.options=options;
      },
      submitPost:function () {
        let selectedId=this.selectedOptions[0];
        let t = this;
        this.$fetch({
          url: '/post/publish',
          method: 'post',
          data: {
            title : this.input,
            content : this.msg.mdValue,
            userId: this.loginUser.id,
            userName: this.loginUser.nickname,
            kind: selectedId,
            kindName: this.options[selectedId].label,
          }
        }).then(function (res) {
          if(res.code===200){
            t.$message({
              message: res.msg,
              type: 'success'
            });
            t.$router.push({path: '/'});
          }else {
            t.$message.error(res.msg);
          }
        }).catch(function (err) {
          t.$message.error('请求异常，请检查网络！');
        })
      }
    },created:function () {
      this.loginUser=this.$storage.getSession('login-user');
      this.islogin = this.loginUser !== null;
      this.getTypes();
    },
    mounted:function(){
      if (this.loginUser == null) {
        this.$message.error('请先登录');
        this.$router.push({path: '/'});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .show{
    position: absolute;
    left: 0;
    top: 0;
  }
  .titleInput{
    font-size: 1.2rem;
    font-weight: 500;
  }
  .inline{
    display: flex;
    flex-direction: row;
  }
  .indexContainer {
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
  }
  .btnsContainer{
    position: absolute;
    z-index: 10;
    left: 65px;
    top: 5px;
    height: 25px;
    min-width: 300px;
    // background: pink;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .btn{
      display: inline-block;
      border:1px solid #ccc;
      margin-right: 10px;
      box-sizing: border-box;
      padding: 0 10px;
      background: #fff;
      font-size: 12px;
      height: 25px;
      line-height: 25px;
      cursor:pointer;
      moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select:none;
      -khtml-user-select:none; /* you could also put this in a class */
      -webkit-user-select:none;/* and add the CSS class here instead */
      -ms-user-select:none;
      user-select:none;/**禁止选中文字*/
      &:active{
        opacity: 0.8;
        background: lightblue;
      }
    }
  }
  .maskContainer{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.5);
    // z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    .contentContainer{
      width: 60%;
      height: 60%;
      background: #fefefe;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      .showAreaContainer{
        height: 100%;
        width: 100%;
        outline: none;
        background: #eee;
        display: block;
        resize: none;
        padding: 10px;
        box-sizing: border-box;
      }
      .closeBtnContainer{
        position: absolute;
        height: 30px;
        width: 30px;
        right: -40px;
        top: -40px;
        border:1px solid #fff;
        border-radius: 50%;
        &::before{
          content: '';
          position: absolute;
          width: 70%;
          height: 2px;
          display: block;
          background: #fff;
          left: 15%;
          top: calc(50% - 1px);
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
        }
        &::after{
          content: '';
          position: absolute;
          width: 70%;
          height: 2px;
          display: block;
          background: #fff;
          left: 15%;
          top: calc(50% - 1px);
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
        }
      }

    }

  }

  .editorContainer {
    margin-top: 20px;
    width: 80%;
    height: 90%;
    border: 1px solid #ddd;
  }
</style>
