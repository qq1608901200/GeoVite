<template>
    <div class='tools'>
        <span class="demonstration"></span>
        <div class="input-cluster">
            <el-input
                    v-model="input1"
                    class="w-50 m-2"
                    placeholder="输入维数"
                    :prefix-icon="Search"
                >        
        </el-input>
        <el-input
                        v-model="input2"
                        class="w-50 m-2"
                        placeholder="取x维数"
                        :prefix-icon="Search"
                    >        
            </el-input>
            <el-input
                        v-model="input3"
                        class="w-50 m-2"
                        placeholder="取y维数"
                        :prefix-icon="Search"
                    >        
            </el-input>
        </div>
        <el-button @click="clusterBtn">聚类分析
        </el-button>
        
    </div>
</template>

<script setup>
import * as RV from '../utils/index.js';
import { ref } from 'vue'
import {  Search } from '@element-plus/icons-vue'
// 定义公共数据
// const pointset_value = ref(8)
const input1=ref('')
const input2=ref('')
const input3=ref('')
// props事件用于对于父组件向子组件传递数据
const props = defineProps({
    myCanvas: RV.Creator.Canvas
})
const myCanvas = props.myCanvas
// const delaunay_pointset=ref()


const clusterBtn = () => {
    // clear the canvas before drawing
    myCanvas.ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    // 因为画布为2维，所以只能一行一行地取数据，而列代表维数每行的不同列上的数据
    let pg = RV.Test.test_10(200, input1.value,1200);
    let p_2d = new RV.Learn.Tensor_2D(pg);
    let res = p_2d.K_means(5, 0.0001, 500);
    let axis_x=input2.value;
    let axis_y=input3.value;
    // 存入类别1数集
    let pg1 = res[0];
    // 由没有x，y坐标的二维点集，生成含有x，y坐标属性的点集类
    let ps1 = RV.Vector.PointSet.fromaArray_2D(pg1, axis_x, axis_y);
    // 利用PointSetView类将类别1点集绘出
    let psv1 = new RV.Renderer.PointSetView(myCanvas.ctx, 'green', ps1);
    psv1.draw();
    psv1.draw_convex_hull();
    let pg2 = res[1];
    let ps2 = RV.Vector.PointSet.fromaArray_2D(pg2, axis_x, axis_y);
    let psv2 = new RV.Renderer.PointSetView(myCanvas.ctx, 'red', ps2);
    psv2.draw();
    psv2.draw_convex_hull();

    let pg3 = res[2];
    let ps3 = RV.Vector.PointSet.fromaArray_2D(pg3, axis_x, axis_y);
    let psv3 = new RV.Renderer.PointSetView(myCanvas.ctx, 'blue', ps3);
    psv3.draw();
    psv3.draw_convex_hull();
    
    let pg4=res[3];
    let ps4=RV.Vector.PointSet.fromaArray_2D(pg4,axis_x,axis_y);
    let psv4=new RV.Renderer.PointSetView(myCanvas.ctx,'orange',ps4);
    psv4.draw();
    psv4.draw_convex_hull();
    
    let pg5= res[4];
    let ps5 = RV.Vector.PointSet.fromaArray_2D(pg5, axis_x, axis_y);
    let psv5 = new RV.Renderer.PointSetView(myCanvas.ctx, 'purple', ps5);
    psv5.draw();
    psv5.draw_convex_hull();
}

</script>

<style scoped>
.input-cluster{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:10px;
    
}
</style>