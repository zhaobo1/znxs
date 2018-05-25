<template>
  <div class="container">
    <div class='test2'></div>
    <div class='wrapper'>
      <h1>美洽</h1>
      <h3>网页在线客服系统</h3>
      <el-form :model='loginInfo' status-icon :rules='loginRules' label-width='80px' class='myform' ref='loginform'>
        <el-form-item class='form-item' prop='username'>
          <span class='labelSpan'>用户名</span>
          <el-input v-model='loginInfo.username' placeholder='请输入用户名' class='elInput' auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item class='form-item' prop='password'>
          <span class='labelSpan'>密码</span>
          <el-input type='password' v-model='loginInfo.password' placeholder='请输入密码' class='elInput' auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item class='form-item'>
          <el-button type='primary' size='medium' id='logo-button' @click='handlesubmitForm("loginform")' :loading='loading'>登录</el-button>
          <span class='register' @click='registerfn'>么有账号?立即注册ss</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import ApiUrl from '@/Api/api.js';
  export default {
    data() {
      return {
        loading: false,
        loginInfo: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [
            {required: true, message: '必填选项', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '必填选项', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      registerfn() {
        this.$router.push('/reg');
      },
      handlesubmitForm(loginform) {
        var _this = this;
        this.$refs[loginform].validate((valid) => {
          if (valid) {
            this.loading = true;
            var url = ApiUrl.baseURL + "/login?username=" + this.loginInfo.username + "&password=" + this.loginInfo.password;
            this.$axios.post(url, {
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            })
              .then((res) => {
                this.loading = false;
                if (res.timeout) {
                  this.$notify.error({
                    title: '错误',
                    message: '登录超时'
                  });
                }
                if (res.data.success) {
                  if (window.localStorage) {
                    localStorage.setItem('auth', res.data.result.authorization);
                    localStorage.setItem('username', res.data.result.user.name);
                    localStorage.setItem('region', res.data.result.user.region);
                    this.$router.push('/map');
                  }
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '用户名或密码错误'
                  });
                }

              })
              .catch((error) => {
                console.log(error);
              })
          } else {
            return false;
          }
        })
      }
    }
  }
</script>
<style type='text/css' scoped>
  .el-button--primary:focus, .el-button--primary:hover {
    background: #66b1ff !important;
    color: white !important;
  }

  .form-item .el-form-item__error {
    left: 100px !important;
  }

  .container {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../assets/img/loginBg.jpg') no-repeat;
    background-size: cover;
  }

  .wrapper {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 420px;
    height: 400px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
  }

  .myform {
    width: 420px;
    position: absolute;
    left: -15%;
  }

  .container h1 {
    padding-bottom: 10px;
    margin-top: 20px;
    color: rgba(255, 255, 255, 0.5);
  }

  h3 {
    font-size: 20px;
    color: #070374;
    padding-bottom: 40px;
    padding-top: 10px;
  }

  .elInput, #logo-button {
    display: inline-block;
    width: 70%;
  }

  .labelSpan {
    width: 80px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    display: inline-block;
  }

  #logo-button {
    margin-left: 85px;
  }

  .register {
    position: absolute;
    right: 0;
    bottom: -40px;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
</style>
