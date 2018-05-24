<template>
  <el-container style="height:100%">
    <el-header style="padding:0">
      <el-row>
        <el-col :span="6">
          <img src="@/assets/img/loginlogo.png" id="logo" style="" />
        </el-col>
        <el-col :span="18">
          <div class="userinfo">
            <el-dropdown @command="handleMy">
              <img src="@/assets/img/userhead.jpg" alt="" class="userhead">
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
      <el-radio v-model="radio" label="2D8E10" style="color:#2D8E10">2D8E10</el-radio>
      <el-radio v-model="radio" label="4056FF" style="color:#4056FF">4056FF</el-radio>
      <el-radio v-model="radio" label="FF40B6" style="color:#FF40B6">FF40B6</el-radio>
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
        radio: '2D8E10'
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
    mounted() {
      document.body.className = 'custom-2D8E10';
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
          case "2D8E10":

            document.body.className = 'custom-2D8E10';
            break;
          case "4056FF":
            document.body.className = 'custom-4056FF';
            break;
          case "FF40B6":
            document.body.className = 'custom-FF40B6';
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

<style lang="scss">
  @import '../../../static/scss/globalVariable.scss';
  .el-header {
    @include headerBgcolor($theme_2D8E10)
  }

  .custom-2D8E10 .el-header {
    @include headerBgcolor($theme_2D8E10)
  }

  .custom-4056FF .el-header {
    @include headerBgcolor($theme_4056FF)
  }

  .custom-FF40B6 .el-header {
    @include headerBgcolor($theme_FF40B6)
  }

  #logo {
    display: block;
    height: 40px;
    margin-top: 10px;
    margin-left: 7px;
  }
  #showOrhide {
    width: 100%;
    height: 20px;
    z-index: 999;
    top: 0;
    right: 0;
    text-align: center;
    background: #2D8E10;
    border-top:1px solid #fff;
    cursor: pointer;
    color: #fff;
  }

  .custom-2D8E10 {
    #showOrhide {
      background: #2D8E10
    }
  }

  .custom-4056FF {
    #showOrhide {
      background: #4056FF
    }
  }

  .custom-FF40B6 {
    #showOrhide {
      background: #FF40B6
    }
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
  // 面包屑样式
   .custom-2D8E10{
     .el-breadcrumb{
       margin-bottom:10px;
       border-left: 3px solid #2D8E10;
       padding-left: 7px;
     }
   }
  .custom-4056FF{
     .el-breadcrumb{
       margin-bottom:10px;
       border-left: 3px solid #4056FF;
       padding-left: 7px;
     }
   }
   .custom-FF40B6{
     .el-breadcrumb{
       margin-bottom:10px;
       border-left: 3px solid #FF40B6;
       padding-left: 7px;
     }
   }
</style>

