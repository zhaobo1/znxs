<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;border-left: 3px solid #2196f3;padding-left: 7px;">
        <el-breadcrumb-item :to="{ path: '/task' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>人工任务</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <search></search>
      </div>
    <el-table :data="tableData" style="width:100%" border height="550" v-loading="loading">
      <el-table-column type='selection'></el-table-column>
      <el-table-column align='center' prop='lineName' label='线路名称'></el-table-column>
      <el-table-column align='center' prop='towerNumber' label='杆塔号'></el-table-column>
      <el-table-column align='center' prop='inspectDate' label='巡检日期' width='110'></el-table-column>
      <el-table-column align='center' prop='voltageLevel' label='电压等级'></el-table-column>
      <el-table-column align='center' prop='level' label='缺陷等级'></el-table-column>
      <el-table-column align='center' label='缺陷描述' width='190' prop='description'>
        <!-- <template slot-scope="scope">
          <tablepic :row='scope.row' :index='scope.$index'></tablepic>
        </template> -->
      </el-table-column>
      <el-table-column align='center' prop='part' label='缺陷部位'></el-table-column>
      <el-table-column align='center' prop='team' label='巡检小组'></el-table-column>
      <el-table-column align='center' label='状态' width='100'>
        <template slot-scope='scope'>
          <el-tag :type='scope.row.state | stateFilter' size='medium'>{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align='center' prop='taskType' label='任务类型'></el-table-column>
      <el-table-column align='center' prop='inspectLength' label='巡检长度'></el-table-column>
      <el-table-column align='center' prop='droneAircraft' label='无人机型号'></el-table-column>
      <el-table-column align='center' prop='droneModel' label='无人机机型'></el-table-column>
      <el-table-column align='center' prop='inspectDuring' label='滞空时间'></el-table-column>
      <el-table-column align='center' prop='businessType' label='业务类型'></el-table-column>
      <el-table-column label="操作" fixed="right" width='110' align='center'>
        <template slot-scope="scope">
          <el-button size='mini' type='plain' @click="handleModifyStatus(scope.row,'已审核')" v-if="scope.row.state=='未审核'" class='stateButton'>审核
          </el-button>
          <el-button size='mini' :type="scope.row.edit?'success':'plain'" @click="handleEditRow(scope.row)" v-if='scope.row.picture==null'>
            {{scope.row.edit?'完成':'编辑'}}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pull-right clearfix"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNum"
      :page-sizes="pageSizesList"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalDataNumber"
      background
    >
    </el-pagination>
  </div>
</template>
<script>
import ApiUrl from '@/Api/api.js';
import search from '@/components/search/search.vue';
export default {
  data(){
    return {
      loading:true,
      pageNum:1,
      pagesize:10,
      pageSizesList: [10, 20, 30, 40, 50],
      totalDataNumber:0,
      tableData: []//返回的结果集合,
    }
  },
  components: {
    search,
  },
  computed: {
    tableParams() {
        return ({
          "pageSize": this.pagesize,//每页显示条数
          "pageNum": this.pageNum,//当前页码
          "orderBy": 'string',
          "data": {
            "dateFrom": '',
            "dateTo": '',
            "typeList": []
          }
        });
    }
  },
  created () {
    this.getTabledata();
  },
  filters: {
    stateFilter(state) {
      const stateMap = {
        '已审核': 'success',
        '未审核': 'warning'
      }
      return stateMap[state];
    }
  },
  methods: {
    getTabledata(){
        this.$axios.post(ApiUrl.fetchtableData,this.tableParams)
        .then(({data})=>{
          console.log(data.result.data)
          this.tableData = data.result.data;
          this.totalDataNumber = data.result.totalCount;
          this.loading = false;
        }).catch((err)=>{

        })
    },
    handleSizeChange(val){
      this.pagesize = val;
      this.getTabledata();
    },
    handleCurrentChange(val){
      this.pageNum = val;
      this.getTabledata();
    }
  }
}
</script>
<style scoped>;
   .stateButton {
    background: #4876FF !important;
    color: white !important;
    border: none !important;
  }

  .stateButton:hover {
    color: white !important;
  }
  .el-button+.el-button{
    margin-left: 0;
    margin-top: 4px;
  }

</style>
