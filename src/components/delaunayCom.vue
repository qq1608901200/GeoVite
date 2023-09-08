<template>
    <!-- <el-button @click="convexhullBtn">点集凸包算法</el-button> -->
    <div class='tools'>
        <span class="demonstration"></span>
        <el-slider v-model="pointset_value" @change="DelaunaySlider" :max="30" />
        <el-button @click="DelaunayBtn">构建狄洛尼三角网</el-button>
    </div>
</template>

<script setup>
import * as RV from '../utils/index.js';
import { ref } from 'vue'

// 定义公共数据
const pointset_value = ref(8)
// props事件用于对于父组件向子组件传递数据
const props = defineProps({
    myCanvas: RV.Creator.Canvas
})
const myCanvas = props.myCanvas
// const delaunay_pointset=ref()


const DelaunayBtn = () => {
    let delaunay_pointset = ref(RV.Test.test_6(pointset_value.value, 1000));//生成生成圆形点集
    let pl = delaunay_pointset.value;
    // clear the canvas before drawing
    myCanvas.ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    let trilist = RV.Vector.Delaunay_triangulation(pl);
    for (let tri of trilist) {
        // let triview = new RV.Renderer.TriangleView(myCanvas.ctx, 'rgb(175,222,200)', tri);
        let triview = new RV.Renderer.TriangleView(myCanvas.ctx, 'purple', tri);
        triview.draw();
    }

}
const DelaunaySlider = (val) => {
    DelaunayBtn(val);
}




</script>

<style scoped></style>