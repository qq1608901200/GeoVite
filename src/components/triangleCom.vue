<template>
    <!-- <el-button @click="convexhullBtn">点集凸包算法</el-button> -->
    <div class='tools'>
        <span class="demonstration"></span>
        <el-button @click="triangel_out_inBtn">三角形内外接圆</el-button>
    </div>
</template>

<script setup>
import * as RV from '../utils/index.js';
import { ref } from 'vue'

// 定义公共数据
// props事件用于对于父组件向子组件传递数据
const props = defineProps({
    myCanvas: RV.Creator.Canvas
})
const myCanvas = props.myCanvas


const triangel_out_inBtn=()=>{
    var tr = ref(RV.Test.test_5(700))
    let tri = new RV.Renderer.TriangleView(myCanvas.ctx, 'rgb(175,222,200)', tr.value);
    // clear the canvas before drawing
    console.log(tri)
    myCanvas.ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    // let center = tr.getINCcenter();
    tri.draw_EXCircle();
    tri.draw();
    tri.draw_INCircle();
}
</script>

<style scoped>

</style>