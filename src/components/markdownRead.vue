<template>
  <div class="previewContainer markdown-body"
                 v-html="compiledMarkdown1"
                 v-if="previewStatus">
  </div>
</template>

<script>
    import Vue from 'vue'
    import marked from 'marked'
    import scroll from 'vue-scroll'
    import hljs from '../../static/js/highlight.min.js'
    import range from '../../static/js/rangeFn.js'
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight: function(code) {
            return hljs.highlightAuto(code).value
        }
    });
    export default {
        name: 'markdownRead',
        props: ['previewStatusP','dataIn'],
        data() {
            return {
                previewStatus: Boolean(this.previewStatusP),
                markdownText: this.dataIn
            }
        },
        methods: {

        },
        computed: {
            compiledMarkdown1: function() {
                return marked(
                    this.markdownText, {
                    sanitize: true
                    }
                )
            }
        }
    }
</script>

<style lang="scss">
    /*引入reset文件*/

    @import "../../static/css/reset";

    /*引入github的markdown样式文件*/

    @import "../../static/css/github-markdown.css";

    /*引入atom的代码高亮样式文件*/

    @import "../../static/css/atom-one-dark.min.css";

    // 预览区
    .previewContainer {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
        padding: 10px;
    }
</style>
