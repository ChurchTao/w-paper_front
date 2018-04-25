<template>
  <div class="tag-management" ref="tagManagement">
    <div class="tag-wrapper">
      <tag-cell></tag-cell>
      <tag-cell></tag-cell>
      <tag-cell></tag-cell>
      <tag-cell></tag-cell>
      <tag-cell></tag-cell>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tag-management",
    data() {
      return {}
    },
    created:function () {
      this.getTags();
    }
    ,
    mounted: function () {
      // let w = window.innerHeight;
      // this.$refs.tagManagement.style.minHeight = w + 'px';
    },
    methods: {
        getTags:function () {

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
