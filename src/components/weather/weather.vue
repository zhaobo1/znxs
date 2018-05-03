<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;border-left: 3px solid #2196f3;padding-left: 7px;">
        <el-breadcrumb-item :to="{ path: '/dataShow' }">数据展示</el-breadcrumb-item>
        <el-breadcrumb-item>微气象</el-breadcrumb-item>
      </el-breadcrumb>
      <div id="weatherCharts">

      </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          showindex:2
      }
  },
  mounted () {
     this.fetchdata().then(({data})=>{
         
         console.log(data.data);

     }).catch((err)=>{

     })
     var weatherC =  this.$echarts.init(document.getElementById('weatherCharts'));
     var option = {
            grid: {
                show: false,
                left: '0',
                right: '0',
                top: '30'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
     weatherC.setOption(option);
  },
  methods: {
      fetchdata(){
          return new Promise((resolve,reject)=>{
              this.$axios.get('https://www.easy-mock.com/mock/5acad68fe416f67736f0284e/example/weather')
              .then((data)=>{
                  resolve(data)
              }).catch((err)=>{
                  reject(err)
              })
          })
      }
  }

}
</script>
<style>
#weatherCharts{
    width:100%;
    height: 400px;
}
</style>
