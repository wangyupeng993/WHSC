<template>
  <el-row id="Editor">
    <el-col :span="24">
      <div ref="editor"></div>
      <div class="upload-botton">
        <el-button @click="getEditorContent" type="primary">上传编辑内容</el-button>
        <el-button type="primary">上传视频</el-button>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import E from 'wangeditor'
export default {
  name: 'Editor',
  data () {
    return {
      editorContent: '',
      // 文本编辑的相关配置
      customConfig: {
        uploadImgShowBase64: true,
        zIndex: 999
      }
    }
  },
  created () {},
  mounted () {
    const editor = new E(this.$refs.editor)
    editor.customConfig = this.customConfig
    // 检验网络图片
    editor.customConfig.linkImgCheck = function (src) {
      const domainName = src.split('/')[2]
      if (domainName === 'whscflyvideo.oss-cn-beijing.aliyuncs.com' || domainName === 'whscflyimg.oss-cn-beijing.aliyuncs.com') {
        return true
      } else {
        // console.log(src.split('/')) // 图片的链接
        return '验证失败，请用本地上传图片' // 返回字符串，即校验失败的提示信息
      }
    }
    // 获取文本编辑变化内容
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  },
  methods: {
    // 获取文本编辑内容
    getEditorContent () {
      console.log(this.editorContent)
    }
  }
}
</script>

<style  rel="stylesheet/css" lang="css">
  #Editor{
    padding:20px;
  }
  .upload-botton{
    margin-top:15px;
  }
  .w-e-text-container{
    min-height:80vh;
  }
</style>
