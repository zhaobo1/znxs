<template>
  <el-container style="height:100%">
    <el-header style="padding:0;background:#444">
      <el-row>
        <el-col :span="6">
          <img src="/static/img/loginlogo.png" id="logo" />
        </el-col>
        <el-col :span="18">
          <div class="userinfo">
            <el-dropdown @command="handleMy">
              <img src="static/img/userhead.jpg" alt="" class="userhead">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginout">退出</el-dropdown-item>
                <el-dropdown-item command="seting">设置</el-dropdown-item>
                <el-dropdown-item command="changeTheme">切换主题</el-dropdown-item>
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
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>
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
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>你确定要退出吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="realyout">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="themeVisible" width="30%" center>
      <span>主题切换</span>
      <br>
      <el-radio v-model="radio" label="2F663D">2F663D</el-radio>
      <el-radio v-model="radio" label="2D8E10">2D8E10</el-radio>
      <el-radio v-model="radio" label="4056FF">4056FF</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="themeVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeThemeSure">切 换</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
  import {
    mapMutations,
    mapState,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        isCollapse: false,
        nav: [],
        centerDialogVisible: false,
        themeVisible: false,
        radio: '2F663D'
      };
    },
    created() {
      //实例化后获取nav菜单；
      this.$axios
        .get(
          "https://www.easy-mock.com/mock/5acad68fe416f67736f0284e/example/nav"
        )
        .then(({
          data
        }) => {
          this.nav = data.data;
        })
        .catch(err => {
          cosnole.log(err);
        });
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      realyout() {
        localStorage.removeItem("auth");
        this.$router.push({
          path: "/login"
        });
      },
      handleMy(str) {
        if (str === "loginout") {
          this.centerDialogVisible = true;
        }
        if (str === "seting") {
          this.$router.push('/seting')
        }
        if (str === 'changeTheme') {
          //切换主题
          this.themeVisible = true;
        }
      },
      changeThemeSure() {
        switch (this.radio) {
          case "2F663D":
            document.body.className = 'custom-2F663D';
            break;
          case "2D8E10":
            document.body.className = 'custom-2D8E10';
            break;
          case "4056FF":
            document.body.className = 'custom-4056FF';
            break;
          default:
            break;
        }
        this.themeVisible = false;
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      showOrhide() {
        this.isCollapse = !this.isCollapse;
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

  #showOrhide {
    width: 100%;
    height: 20px;
    z-index: 999;
    top: 0;
    right: 0;
    text-align: center;
    cursor: pointer;
    background-color: #2196f3;
    color: #fff;
  }

  .userinfo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .userhead {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: block;
    margin-right: 10px;
    cursor: pointer;
  }

  .el-submenu__title {
    padding: 0 40px;
  }

  .el-color-picker__trigger {
    margin-top: 11px;
    border: none;
  }

</style>
