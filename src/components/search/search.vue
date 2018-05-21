<template>
    <el-form class="s_form" ref="s_form"  :model="s_form" :inline="true">
        <el-row>
            <el-col :span="10">
                <el-form-item 
                 size="mini" label="巡检日期">
                    <el-date-picker 
                    type="date" 
                    placeholder="开始日期" 
                    style="width:40%"
                    v-model="s_form.date1">
                    </el-date-picker>
                    <el-date-picker
                     type="date" 
                     placeholder="结束日期" 
                     v-model="s_form.date2">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item size="mini"
                 label="杆塔编号">
                    <el-tag size="small">起始杆塔</el-tag>
                    <el-select v-model="s_form.Tower_Start" 
                    clearable 
                    placeholder="请选择">
                    <el-option v-for="item in s_form.Towerarr"
                    :key="item"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                    </el-select>
                    <el-tag size="small">结束杆塔</el-tag>
                    <el-select v-model="s_form.Tower_End" 
                    clearable 
                    placeholder="请选择">
                    <el-option v-for="item in s_form.Towerarr"
                    :key="item"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <el-form-item size="mini" label="巡检小组">
                    <el-select v-model="s_form.xujian" multiple placeholder="请选择">
                        <el-option
                        v-for="item in s_form.xujianArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-tag size="small">多选</el-tag>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item size="mini" label="电压等级">
                    <el-select v-model="s_form.power" placeholder="请选择">
                        <el-option
                        v-for="item in s_form.powerLeave"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="2">
                <el-form-item size="small">
                    <el-button type="primary">搜索</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
export default {
    data () {
        return {
            s_form:{
                date1:"",
                date2:"",
                Towerarr:[26,36,50],
                Tower_Start:'',
                Tower_End:'',
                xujianArr:[],
                xujian:[],
                powerLeave:[110,220],
                power:""
            }
        }
    },
    mounted () {
        //获取巡检小组，塔的集合，数据
        this.fetchxujianArr().then(data=>{
            this.s_form.xujianArr = data;
        }).catch(err=>{
              this.$Message({
                message: err.message,
                type: 'error',
                duration: 4 * 1000
            });
        });
        this.fetchTowerArr().then(data=>{
            this.s_form.Towerarr = data;
        }).catch(err=>{
            this.$Message({
                message: err.message,
                type: 'error',
                duration: 4 * 1000
            })
        })
    },
    methods: {
        fetchxujianArr(){
           return new Promise((resolve,reject)=>{
               this.$axios.get(this.$baseURL+'/teams')
               .then(({data})=>{
                   if(data.success)
                   {
                       resolve(data.result)
                   }
               })
               .catch(err=>{
                   reject(err)
               })
           })     
        },
        fetchTowerArr (){
            return new Promise((resolve,reject)=>{
                this.$axios.get(this.$baseURL+'/'+localStorage.getItem("region") + "/towers")
                .then(({data})=>{
                    if(data.success)
                    {
                        resolve(data.result)
                    }
                })
                .catch(err=>{
                    reject(err)
                })
            })
        }
    }
}
</script>

<style scoped>
    .s_form{
        border: 1px solid #dcdfe6;
        padding: 5px;
        margin-bottom: 10px;
        border-radius: 3px;
    }
</style>
