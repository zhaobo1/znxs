<template>
<div id="form">
  <div id="formbox">
    <form action="">
      <img src="/static/img/loginlogo.png" id="logo" />
      <p>
         <input type="text" v-model="username"> 
      </p>
      <p>
        <input type="passworld" v-model="passworld"> 
      </p>
      <p align="center">
        <el-button type="primary" style="width:80%">登录</el-button>
      </p>
    </form>
  </div>
  
</div>
</template>
<script>
  export default{
    data(){
      return {
        username:'',
        passworld:''
      }
    }
  }
</script>
<style scoped>
#form{
  height:100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('/static/img/loginbg.png') no-repeat center/cover;
}
#formbox{
    width: 430px;
    height: 325px;
    border-radius: 7px;
    padding: 70px 20px;
    box-sizing: border-box;
    background: rgba(119, 118, 126, 0.5);
}
form{
  position: relative;
}
#logo{
  position: absolute;
  left: 50%;
  top:-70px;
  transform: translate(-50%,-50%)
}
</style>
