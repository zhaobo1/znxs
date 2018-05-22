<template>
  <div id="upload">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;border-left: 3px solid #2196f3;padding-left: 7px;">
      <el-breadcrumb-item :to="{ path: '/task' }">任务管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/task' }">人工任务</el-breadcrumb-item>
      <el-breadcrumb-item>上传文档</el-breadcrumb-item>
    </el-breadcrumb>
    <el-upload class="upload-demo" drag 
    action="https://jsonplaceholder.typicode.com/posts/" 
    multiple 
    show-file-list="false"
    :on-progress="handleProgress"
    :on-change="handleChange"
    :on-preview="handPreview"
    :on-success="handleSuccess"
    :on-error="handleError"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
  export default {
    methods: {
      handleProgress(){
        console.log('progress');
      },
      handleChange(){
        console.log('change');
      },
      handlePreview(){
        console.log('preview');
      },
      handleSuccess(){
        console.log('success');
      },
      handleError(){
        console.log('error');
      }
    }
  }

</script>

<style>
#upload .el-upload,.el-upload-dragger{
  width:100%;
}

</style>
