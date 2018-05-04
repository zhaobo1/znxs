<template>
    <div id="mapbox">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;border-left: 3px solid #2196f3;padding-left: 7px;">
            <el-breadcrumb-item :to="{ path: '/map' }">地图预览</el-breadcrumb-item>
        </el-breadcrumb>
        <div id="map">

        </div>
    </div>
</template>
<script>
import ApiUrl from '@/Api/api.js';
export default {
  data () {
      return {
          
      }
  },
  mounted () {
      this.fetchArea().then(({xichangpointer})=>{
          this.initMap(xichangpointer);
      }).catch(err=>{

      })
      
  },
  methods: {
      fetchArea(){
          return new Promise((resolve,reject)=>{
              this.$axios.get(ApiUrl.fetchArea)
              .then(({data})=>{
                  resolve(data);
              })
              .catch((err)=>{
                  reject(err);
              })
          })
      },
      initMap(areaArray){
          var map = new TMap("map");
          map.centerAndZoom(new TLngLat(102.272257,27.901112),7);
          /*修改地图类型*/
          map.setMapType(TMAP_HYBRID_MAP);
          //开启滚轮缩放地图；
          map.enableHandleMouseScroll();
          //添加行政区轮廓图
          this.outline(areaArray,map)
      },
      outline(aobj,map){
            var points = [];
            for (var k = 0; k < aobj.length; k++) {
                var elem = aobj[k];
                points.push(new TLngLat(elem[0], elem[1]));
            }
            //创建面对象
            var polygon = new TPolygon(points, { strokeColor: "#00FFCF", strokeWeight: 6, strokeOpacity: 1, fillOpacity: 0 });
            //向地图上添加面
            map.addOverLay(polygon);
      },
      drawOneLine(){
          
      }
  }
}
</script>
<style scoped>
    #mapbox{
        width:100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    #map{
        flex: 1;
    }
</style>
