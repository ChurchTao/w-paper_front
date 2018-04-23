<template>
  <div class="indexContainer">
    <!--<div class="btnsContainer">-->
      <!--<div class="btn" @click="getMdValueFn">获取mdValue</div>-->
      <!--<div class="btn" @click="getHtmlValueFn">获取htmlValue</div>-->
    <!--</div>-->
    <el-row :gutter="15" style="width: 75%">
      <el-col :span="10">
          <el-input v-model="input" placeholder="请输入标题.."></el-input>
      </el-col>
      <el-col :span="8">
        <span class="titleInput">请选择分类：</span>
        <el-cascader
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">确认发布</el-button>
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
        input: '',
        msgShow:'我要显示的内容',
        dilogStatus:false,
        msg: {
          mdValue:'## Vue-markdownEditor'
        },
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
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
