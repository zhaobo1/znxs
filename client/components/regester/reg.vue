<template>
  <div>
    <h1>注册页面</h1>
    <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        ruleForm2: {
          name: '',
          pass: ''
        }
      }
    },
    methods: {
      submitForm() {
        this.$axios.post('/api/user/addUser', {
            username:this.ruleForm2.name,
            password: this.ruleForm2.pass
          })
          .then()
          .catch()
      }
    }

  }

</script>

<style>


</style>
