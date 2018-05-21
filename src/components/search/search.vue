<template>
  <div id="s_form">
    <el-row>
      <el-col :sm="2" :xs="2">
        <div class="titles">
          <p>搜索</p>
          <p>条件</p>
        </div>
      </el-col>
      <el-col :sm="22" :xs="22">
        <el-form class="s_form" ref="s_form" :model="s_form" :inline="true">
          <el-row>
            <el-col :sm="22" :xs="22">
              <el-row>
                <el-col :sm="8" :xs="8">
                  <el-form-item size="mini">
                    <el-tag type="info" size="small">巡检日期</el-tag>
                    <el-date-picker type="date" placeholder="开始日期" style="width:35%" v-model="s_form.dateS">
                    </el-date-picker>
                    <el-date-picker type="date" placeholder="结束日期" style="width:35%" v-model="s_form.dateE">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :sm="8" :xs="8">
                  <el-form-item size="mini">
                    <el-tag type="info" size="small">杆塔编号</el-tag>
                    <el-select v-model="s_form.tower" multiple placeholder="请选择">
                      <el-option v-for="item in Towerarr" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                    <el-tag size="small">多选</el-tag>
                  </el-form-item>
                </el-col>
                <el-col :sm="8" :xs="8">
                  <el-form-item size="mini">
                    <el-tag type="info" size="small">巡检小组</el-tag>
                    <el-select v-model="s_form.xujian" multiple placeholder="请选择">
                      <el-option v-for="item in xujianArr" :key="item.id" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                    <el-tag size="small">多选</el-tag>
                  </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="8">
                  <el-form-item size="mini">
                    <el-tag type="info" size="small">电压等级</el-tag>
                    <el-select v-model="s_form.power" multiple placeholder="请选择">
                      <el-option v-for="item in powerLeave" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                    <el-tag size="small">多选</el-tag>
                  </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="8">
                  <el-form-item size="mini">
                    <el-tag type="info" size="small">缺陷部位</el-tag>
                    <el-select v-model="s_form.part" multiple placeholder="请选择">
                      <el-option v-for="item in partsArr" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                    <el-tag size="small">多选</el-tag>
                  </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="8">
                  <el-form-item size="mini">
                    <el-tag type="info" size="small">缺陷等级</el-tag>
                    <el-select v-model="s_form.level" multiple placeholder="请选择">
                      <el-option v-for="item in levelsArr" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                    <el-tag size="small">多选</el-tag>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :sm="2" :xs="2">
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" style="transform: translateY(50%);" @click="onSubmit">搜索</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import bus from "@/busEvent/bus.js";
  export default {
    data() {
      return {
        s_form: {
          dateS: "",
          dateE: "",
          tower: [],
          xujian: [],
          power: [],
          part: [],
          level: []
        },
        Towerarr: [],
        xujianArr: [],
        powerLeave: [],
        partsArr: [],
        levelsArr: []
      };
    },
    mounted() {
      //获取巡检小组，塔的集合，电压集合数据
      this.fetchxujianArr()
        .then(data => {
          this.xujianArr = data;
        })
        .catch(err => {
          this.$Message({
            message: err.message,
            type: "error",
            duration: 4 * 1000
          });
        });
      this.fetchTowerArr()
        .then(data => {
          this.Towerarr = data;
        })
        .catch(err => {
          this.$Message({
            message: err.message,
            type: "error",
            duration: 4 * 1000
          });
        });
      this.fetchProwerArr()
        .then(data => {
          this.powerLeave = data;
        })
        .catch(err => {
          this.$Message({
            message: err.message,
            type: "error",
            duration: 4 * 1000
          });
        });
      this.fetchPartsArr()
        .then(data => {
          this.partsArr = data;
        })
        .catch(err => {
          this.$Message({
            message: err.message,
            type: "error",
            duration: 4 * 1000
          });
        });
      this.fetchlevelsArr()
        .then(data => {
          this.levelsArr = data;
        })
        .catch(err => {
          this.$Message({
            message: err.message,
            type: "error",
            duration: 4 * 1000
          });
        })
    },
    methods: {
      fetchxujianArr() {
        return this.fecthCommon('/teams');
      },
      fetchTowerArr() {
        return this.fecthCommon('/' + localStorage.getItem("region") + "/towers");;
      },
      fetchProwerArr() {
        return this.fecthCommon('/voltages');
      },
      fetchPartsArr() {
        return this.fecthCommon('/parts');
      },
      fetchlevelsArr() {
        return this.fecthCommon('/levels');
      },
      fecthCommon(urlpath) {
        return new Promise((resolve, reject) => {
          this.$axios
            .get(this.$baseURL + urlpath)
            .then(({
              data
            }) => {
              if (data.success) {
                resolve(data.result);
              }
            })
            .catch(err => {
              reject(err);
            });
        })
      },
      onSubmit() {
        var typeList = [];
        if (this.s_form.power.length > 0) {
          this.s_form.power.forEach(item => {
            typeList.push({
              name: "voltages",
              value: item
            });
          });
        }
        if (this.s_form.xujian.length > 0) {
          this.s_form.xujian.forEach(item => {
            typeList.push({
              name: "teams",
              value: item
            });
          });
        }
        if (this.s_form.tower.length > 0) {
          this.s_form.tower.forEach(item => {
            typeList.push({
              name: "tower",
              value: item
            });
          });
        }
        if (this.s_form.part.length > 0) {
          this.s_form.part.forEach(item => {
            typeList.push({
              name: "parts",
              value: item
            });
          });
        }
        if (this.s_form.level.length > 0) {
          this.s_form.level.forEach(item => {
            typeList.push({
              name: "levels",
              value: item
            });
          });
        }
        var obj = {
          data: {
            dateFrom: this.s_form.dateS,
            dateTo: this.s_form.dateE,
            typeList
          }
        };
        bus.$emit("searchfn", obj);
      }
    }
  };

</script>

<style scoped>
  #s_form {
    border: 1px solid #dcdfe6;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 3px;
  }

  .titles {
    text-align: center;
    transform: translateY(50%);
  }

  .titles p {
    font-size: 18px;
    font-weight: bold
  }

</style>
