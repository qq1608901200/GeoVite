<template>

    <el-container class="left">
        <div class="header">
            <div>
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="large"
              />
            </div>
            <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <!-- <span>Spatial Analysis</span> -->
                <h3>Spatial Analysis</h3>
                <el-button class="button" text>QSF202001020720</el-button>
              </div>
            </template>
            <h4>空间分析基础算法</h4>
            <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
          </el-card>
        </div>
        <div class="toolgroup"> 
                
            <div class="tools" id="tools">
            <div class="tools_item">
                        <convexhullCom :myCanvas="myCanvas"></convexhullCom>
                    </div>
                    <div class="tools_item">
                            <triangleCom :myCanvas="myCanvas"></triangleCom>
                        </div>
                        <div class="tools_item">
                                <delaunayCom :myCanvas="myCanvas"></delaunayCom>
                            </div>
                            <div class="tools_item">
                                    <clusterCom :myCanvas="myCanvas"></clusterCom>
                                </div>
                                <div class="tools_item">
                                        <overlayCom :myCanvas="myCanvas"></overlayCom>
                                    </div>
            
            </div>
                </div>
        
        
    </el-container>
    

     <!-- <div class="common-layout">
        <el-container>
          <el-header>Header</el-header>
          <el-main class="el-main" id="el-main"></el-main>
        </el-container>
      </div> -->
</template>
<script setup>
import * as RV from '../utils/index.js'
// 引入组件
import convexhullCom from '../components/convexhullCom.vue';
import triangleCom from '../components/triangleCom.vue';
import delaunayCom from '../components/delaunayCom.vue';
import clusterCom from '../components/clusterCom.vue';
import overlayCom from '../components/overlayCom.vue';

// var main_element=document.getElementsByClassName("el-main")
// console.log(main_element)
// create the canvas and reporting list
let myCanvas = new RV.Creator.Canvas('myCanvas', document.body, 1500, 1200);
// let myCanvas = new RV.Creator.Canvas('myCanvas', parentEl, 1500, 1200);
myCanvas.create();
myCanvas.createReportList();
</script>
<style scoped>
.tools{
    /* display:flex; */
    /* align-items:center; */
    /* justify-content: space-between; */
    /* width:50%; */
    height: 100%;
    /* border: solid skyblue 1px; */
}
.tools_item{
    margin: 20px;
    display: flex;
    justify-content: space-around;
    border: none;

}
body,html{
    margin: 0;
    padding: 0;
    /* background: black; */
}
.toolgroup{
    border: solid black 0.2em;
}
.header{
    /* display: flex; */
    margin-bottom: 20px;
}
.box-card{
    height: 300px;
}
.box-card{
    /* background: rgb(157, 194, 240); */
}
.left{
    display: grid;
    grid-template-columns: auto;
    /* background: rgb(167, 166, 235); */
    /* height: 1500px; */
}

</style>