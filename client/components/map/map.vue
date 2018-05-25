<template>
    <div id="mapbox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/map' }">地图预览</el-breadcrumb-item>
        </el-breadcrumb>
        <div id="map">

        </div>
    </div>
</template>
<script>
import ApiUrl from '@/Api/api.js';
import towericon from '@/assets/img/ta.png';
export default {
  data () {
      return {
          map:null,
          g_icon14:''
      }
  },
  mounted () {
      this.fetchAll()
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
      fetchOneline(){
          return new Promise((resolve,reject)=>{
              this.$axios.get(ApiUrl.fetchOneLine)
              .then(({data})=>{
                  resolve(data)
              }).catch(err=>{
                  reject(err)
              })
          })
      },
      fetchAll(){
          Promise.all([this.fetchArea(),this.fetchOneline()]).then((data)=>{
              //实例化地图
              this.initMap(data[0].xichangpointer);
              //实例化线路
              this.drawOneLine(data[1].lineJson);
          }).catch(err=>{
              this.$notify({
                title: '警告',
                message: '请求失败，请重试',
                type: 'warning'
             });
          })
      },
      initMap(areaArray){
          this.map = new TMap("map");
          this.map.centerAndZoom(new TLngLat(102.272257,27.901112),7);
          /*修改地图类型*/
          this.map.setMapType(TMAP_HYBRID_MAP);
          //开启滚轮缩放地图；
          this.map.enableHandleMouseScroll();
          //添加行政区轮廓图
          this.outline(areaArray)
      },
      outline(aobj){
            var points = [];
            for (var k = 0; k < aobj.length; k++) {
                var elem = aobj[k];
                points.push(new TLngLat(elem[0], elem[1]));
            }
            //创建面对象
            var polygon = new TPolygon(points, { strokeColor: "#2196F3", strokeWeight: 4, strokeOpacity: 1, fillOpacity: 0 });
            //向地图上添加面
            this.map.addOverLay(polygon);
      },
      drawOneLine(linearr){
          var alllineObj = [];
          for (var i = 0; i < linearr.length; i++) {
            var oneline = linearr[i];
            var oneobj = [];
            this.g_icon14 = this.iconObjfn(towericon,30,40,15,15);
            for(let j = 0;j<oneline.pointer.length;j++)
            {
                var elem = oneline.pointer[j];
                oneobj.push(new TLngLat(elem.coord[0], elem.coord[1]));
                var marker_14 = new TMarker(new TLngLat(elem.coord[0], elem.coord[1]), {
					icon: this.g_icon14
				});
                this.map.addOverLay(marker_14)
            }
          }
          alllineObj.push(oneobj);
          for (var i = 0; i < alllineObj.length; i++) {
			var line_color = '#2196F3';
			var oneline = alllineObj[i];
			var line = new TPolyline(oneline, {
				strokeColor: line_color,
				strokeWeight: 3,
				strokeOpacity: 1
			});
			this.map.addOverLay(line);
		}
      },
      iconObjfn(pic_url, w, h, x, y){
          return new TIcon(pic_url, new TSize(w, h), { anchor: new TPixel(x, y) });
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
