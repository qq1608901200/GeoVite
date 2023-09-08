<template>
    <!-- <el-button @click="convexhullBtn">点集凸包算法</el-button> -->
    <div class='tools'>
        <!-- <span class="demonstration"></span> -->
        <div class="item">
            <el-slider  v-model="slider_value" @change="convexhullSlider"  :max="100"/>
        </div>
        <div class="item">
                <el-button @click="convexhullBtn">点集凸包算法</el-button>
            </div>
            <!-- <el-slider  v-model="slider_value" @change="convexhullSlider"  :max="100"/>
            <el-button @click="convexhullBtn">点集凸包算法</el-button> -->
    </div>
        
</template>

<script setup>
import * as RV from '../utils/index.js';
import { ref,watch } from 'vue'

// 定义公共数据
const slider_value=ref(100)
// props事件用于对于父组件向子组件传递数据
const props = defineProps({
    myCanvas: RV.Creator.Canvas
})
const myCanvas=props.myCanvas
const convexhullBtn = () => {
    // pl=ref(RV.Test.test_2(80, 700, 100, 100)) //生成随机点集
    var pl = ref(RV.Test.test_2(slider_value.value, 700, 100, 100)) //生成随机点集
    let ps = new RV.Vector.PointSet(pl.value);
    let pointset1 = new RV.Renderer.PointSetView(myCanvas.ctx, 'purple', ps)
    // clear the canvas before drawing
    myCanvas.ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    pointset1.draw();
    pointset1.draw_convex_hull();
    // pointset1.draw_extent();
}
// slider控件滑动值变化change，该函数
const convexhullSlider=(val)=>{
    convexhullBtn(val)
}




</script>

<style scoped>
/* .tools{
   
    
    display: flex;
    align-items: center;
} */
.item{
     display: flex;
     margin: 5px;
}
</style>