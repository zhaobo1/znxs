<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/dataShow' }">数据展示</el-breadcrumb-item>
        <el-breadcrumb-item>微气象</el-breadcrumb-item>
      </el-breadcrumb>
      <div id="weatherCharts"  v-loading="loading" style="height:400px">

      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showindex: 2,
      data: [],
      datalength: 0,
      limtLength: 50,
      loop:null,
      loading:true
    };
  },
  mounted() {
    this.fetchdata()
      .then(({ data }) => {
        this.data = data.data[this.showindex].data;
        this.loading = false;
        this.datalength =this.data.length;
        var newdata = this.data.slice(0, 50);
        var weatherC = echarts.init(
          document.getElementById("weatherCharts")
        );
        var option = {
          grid: {
            show: false,
            left: "50",
            right: "50",
            top: "30"
          },
          title: {
            show: true,
            text: "500kV周格一线16#2018年4月最高温最低温曲线图",
            textStyle: {
              color: "#05c1ff",
              fontFamily: "Microsoft YaHei",
              fontWeight: "lighter",
              fontSize: 16,
              align: "right"
            },
            left: "center",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: "value",
            splitNumber: 40,
            min: "dataMin",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#81dcf9"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: function formatter(value, index) {
                return "#" + value;
              },
              color: "#05c1ff"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#3b728d",
                opacity: 0.5
              }
            }
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color: "#05c1ff"
            },
            axisTick: {
              inside: false
            },
            axisLine: {
              lineStyle: {
                color: "#81dcf9"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#3b728d",
                opacity: 0.5
              }
            }
          },
          series: [
            {
              name: "模拟数据",
              type: "line",
              showSymbol: true,
              hoverAnimation: true,
              data: newdata, //取数组前50个；
              symbol: "circle",
              symbolSize: 8,
              itemStyle: {
                normal: {
                  color: "#1ab4e3",
                  opacity: 0.8,
                  borderWidth: 0,
                  shadowBlur: 30,
                  shadowColor: "rgba(255, 255, 255, 1)"
                }
              },
              lineStyle: {
                normal: {
                  color: "#9ee5ee",
                  shadowColor: "rgba(39,176,255,0.25)",
                  shadowBlur: 5
                }
              }
            }
          ]
        };
        weatherC.setOption(option);
        this.loop = setInterval(function () {
            this.limtLength++;
            if (this.limtLength > this.datalength - 1) {
                this.limtLength = 50;
                newdata = this.data.slice(0, 50);
                weatherC.setOption({
                    series: [{
                        data: newdata
                    }]
                });
            } else {
                newdata.shift();
                newdata.push(this.data[this.limtLength]);
                weatherC.setOption({
                    series: [{
                        data: newdata
                    }]
                });
            }
        }.bind(this), 1000);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    fetchdata() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(
            "https://www.easy-mock.com/mock/5acad68fe416f67736f0284e/example/weather"
          )
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>
<style>
#weatherCharts {
  width: 100%;
  height: 400px;
}
</style>
