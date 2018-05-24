<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/task' }">任务管理</el-breadcrumb-item>
      <el-breadcrumb-item>无人机任务</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="peopleTaskData" style="width:100%" border height="600" v-loading="loading">
      <el-table-column type="index" label="序号" align="center" width="100">
      </el-table-column>
      <el-table-column prop="name" label="线路" width="120">
      </el-table-column>
      <el-table-column prop="Startdate" label="开始时间" width="150">
      </el-table-column>
      <el-table-column prop="Enddate" label="结束时间" width="150">
      </el-table-column>
      <el-table-column prop="fuxiany" label="护线员" width="150">
      </el-table-column>
      <el-table-column prop="towerObj" label="铁塔对象" width="120">
      </el-table-column>
      <el-table-column prop="seaObj" label="巡视对象" width="120">
      </el-table-column>
      <el-table-column prop="time" label="最近拍摄时间" width="150">
      </el-table-column>
      <el-table-column prop="progress" label="拍摄进度" align="center" width="120">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
            记录
          </el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
            上传图片
          </el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
            已上传图片
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        peopleTaskData: [],
        loading: true
      }
    },
    created() {
      this.$axios.get('https://www.easy-mock.com/mock/5acad68fe416f67736f0284e/example/peopleTaskdata').then(({
        data
      }) => {
        this.peopleTaskData = data.data;
        this.loading = false;
      }).catch((err) => {

      })
    },
    beforeRouteEnter(to, from, next) {

      next();
    }
  }

</script>
<style>
  ;

</style>
