<template>
<el-container style="height:100%">
  <el-header style="padding:0;background:#444">
      <el-row>
          <el-col :span="6">
              <img src="/static/img/loginlogo.png" id="logo" />
          </el-col>
          <el-col :span="18">
              <div class="userinfo">
                  <el-dropdown @command="loginOutfn">
                    <img src="static/img/userhead.jpg" alt="" class="userhead">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="loginout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
              </div>
          </el-col>
      </el-row>
  </el-header>
  <el-container>
    <el-aside style="width:auto;background-color:#f4f4f4;position:relative">
        <div id="showOrhide" @click="showOrhide">
            <i :class="{'el-icon-d-arrow-right':isCollapse,'el-icon-d-arrow-left':!isCollapse}"></i>
        </div>
        <el-menu class="el-menu-vertical-demo" 
        @open="handleOpen"
         @close="handleClose"
          :collapse="isCollapse"
          router
          >
           <el-submenu :index="item.url" v-for="(item,indexs) in nav" v-if="item.children.length" :key="indexs">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item-group v-for="(child,i) in item.children" :key="i">
                    <el-menu-item :index="item.url+'/'+child.url">{{child.title}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.url">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import {mapMutations,mapState,mapActions} from 'vuex';
export default {
  data() {
    return {
      isCollapse: false,
      nav:[]
    };
  },
  created () {
    //实例化后获取nav菜单；
    this.$axios.get('https://www.easy-mock.com/mock/5acad68fe416f67736f0284e/example/nav').then(({data})=>{
        this.nav = data.data;
    }).catch((err)=>{
        cosnole.log(err)
    })
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      loginOutfn(str){
          if(str==='loginout')
          {
                localStorage.removeItem('auth');
                this.$router.push({path:'/login'})
          }
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      showOrhide(){
          this.isCollapse = !this.isCollapse
      }
    }
};
</script>
<style scoped>
#logo {
display: block;
  height: 60px;
}
#infobar {
  height: 50px;
  background-color: #555;
}
#showOrhide{
    width:100%;
    height:20px;
    z-index:999;
    top:0;
    right:0;
    text-align:center;
    cursor:pointer;
    background-color: #2196F3;
    color:#fff
}
.userinfo{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.userhead{
    width:50px;
    height: 50px;
    border-radius: 50%;
    display: block;
    margin-right: 10px;
    cursor: pointer;
}
.el-submenu__title{
    padding: 0 40px
}
</style>

