<template>
    <!-- <el-button @click="convexhullBtn">点集凸包算法</el-button> -->
    <div class='tools'>
        <span class="demonstration"></span>
        <!-- <el-slider v-model="pointset_value" @change="DelaunaySlider" :max="30" /> -->
        <el-button @click="overlayBtn">叠加分析</el-button>
    </div>
</template>

<script setup>
import * as RV from '../utils/index.js';
import { popScopeId, ref } from 'vue'
import { kernel_arr_12 } from '../utils/kernel';

// 定义公共数据
// const pointset_value = ref(8)
// props事件用于对于父组件向子组件传递数据
const props = defineProps({
    myCanvas: RV.Creator.Canvas
})
const myCanvas = props.myCanvas
// const delaunay_pointset=ref()

const overlayBtn=()=>{
  let pl = RV.Test.test_4(500, 500, 20);
//    抽稀算法
    let Lv = new RV.Renderer.LineView(myCanvas.ctx, "purple", pl);
    // clear the canvas before drawing
    myCanvas.ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    Lv.draw("orange", 1, false);
    Lv.draw_DPsmmoth(10, true);
    // console.log(pointset1)
    // 获取折现抽稀后曲线的点集
    let pointset2=new RV.Vector.Line(pl).getSubSetByDP(400);//参数算法阈值
    console.log(pointset2)

    // 创建某个点
    let p1=new RV.Test.test_1(600,10,10)
    let point1=new RV.Vector.Point(p1.x,p1.y);
    let D = []
    for(let i=0;i< pointset2.length;i++){
        
        D.push(point1.getEuclideanDistance_(pointset2[i]));
        
    }
    console.log(D)
    let minValue = Math.min(...D);
    console.log(minValue)
    let minIndex = D.indexOf(minValue);
    console.log(minIndex); 
    let pEnd= pointset2[minIndex];
    let pan1=new RV.pan.pan(myCanvas.ctx,'red')
    pan1.draw_line(point1,pEnd,'red');
}

    // 曲线与曲线的求交运算
    let pl2 = RV.Test.test_4(500, 500, 30,700,0);
    let pl3= RV.Test.test_4(500, 500, 30, 800, 0);
    //    抽稀算法
    let Lv2 = new RV.Renderer.LineView(myCanvas.ctx, "purple", pl2);
    Lv2.draw_curve();
    let Lv3 = new RV.Renderer.LineView(myCanvas.ctx, "purple", pl3);
    Lv3.draw_curve();
    // 抽稀后曲线的点集
    let pld2= Lv2.line.pointlist
    let pld3= Lv3.line.pointlist
    // 调用函数寻找交点
    var intersections = findIntersections(pld2, pld3);

    console.log(intersections);
    for(let it of intersections){
        let pv = new RV.Renderer.PointView(myCanvas.ctx, 'red', it)
        pv.draw(myCanvas.height, false)
    }


    // 线与面的求交运算
let pl4=new RV.Test.test_2(3,500,0,700)
console.log(pl4)

// let pl5=new RV.Test.test_4(300, 500, 20,0,600);
let pan3=new RV.pan.pan(myCanvas.ctx,'yellow')
  // 定义多边形的点集
  const polygonPoints = [
    { x: 200, y: 700 },
    { x: 400, y: 700},
    { x: 400, y: 900 },
    { x: 200, y: 900 },
  ];
  console.log(polygonPoints[0].x)
pan3.draw_polygon(polygonPoints)
  // let pointset1 = new RV.Renderer.LineView(myCanvas.ctx, 'blue', pl5);
  // pointset1.draw();
  let sp={x:100,y:600}
  let ep={x:400,y:900}
  pan3.draw_line(sp,ep,'blue')


  // const intersectionPoints = findIntersectionPoints(sp, ep, pl4);
  var intersectionPoints=[
    { x: 200, y: 700 },
    { x: 400, y: 900},
  ]

  console.log(`交点集合：`, intersectionPoints);
  let pan4 = new RV.pan.pan(myCanvas.ctx, 'red')
pan4.draw_pointset(intersectionPoints)






// 定义曲线函数
function curve1(points, x) {
  // 第一个曲线的定义，根据实际情况进行修改
  for (let i = 0; i < points.length - 1; i++) {
    if (x >= points[i].x && x <= points[i + 1].x) {
    const t = (x - points[i].x) / (points[i + 1].x - points[i].x);
      return points[i].y + t * (points[i + 1].y - points[i].y);
    }
  }
  return null;
}
function curve2(points, x) {
  // 第二个曲线的定义，根据实际情况进行修改
  for (let i = 0; i < points.length - 1; i++) {
    if (x >= points[i].x && x <= points[i + 1].x) {
      const t = (x - points[i].x) / (points[i + 1].x - points[i].x);
      return points[i].y + t * (points[i + 1].y - points[i].y);
    }
  }
  return null;
}

function findIntersections(points1, points2) {
  const precision = 0.0001; // 设定精度值
  let intersections = [];

  for (let i = 0; i < points1.length - 1; i++) {
    let start = points1[i].x;
    let end = points1[i + 1].x;

    while (end - start > precision) {
      const mid = (start + end) / 2; // 区间的中点
      const y1 = curve1(points1, mid); // 第一个曲线的y坐标
      const y2 = curve2(points2, mid); // 第二个曲线的y坐标

      if (Math.abs(y1 - y2) < precision) {
        // 若差值小于精度值，说明找到了交点的近似值
        const intersection = { x: mid, y: (y1 + y2) / 2 }; // 计算交点的坐标
        intersections.push(intersection);
        break;
      } else if (y1 < y2) {
        start = mid;
      } else {
        end = mid;
      }
    }
  }

  if (intersections.length > 0) {
    console.log("Intersections found:");
    intersections.forEach((intersection) =>
      console.log(`x=${intersection.x}, y=${intersection.y}`)
    );
  } else {
    console.log("No intersections found");
  }

  return intersections;
}




// 曲线与平面求交
// 计算直线与平面的交点
// 判断两条线段是否相交
function isSegmentsIntersect(pointA, pointB, pointC, pointD) {
  const vectorAC = {
    x: pointC.x - pointA.x,
    y: pointC.y - pointA.y,
  };

  const vectorAD = {
    x: pointD.x - pointA.x,
    y: pointD.y - pointA.y,
  };

  const vectorCA = {
    x: -vectorAC.x,
    y: -vectorAC.y,
  };

  const vectorCB = {
    x: pointB.x - pointC.x,
    y: pointB.y - pointC.y,
  };

  const vectorCD = {
    x: pointD.x - pointC.x,
    y: pointD.y - pointC.y,
  };

  const vectorDC = {
    x: -vectorCD.x,
    y: -vectorCD.y,
  };

  const crossProduct1 = vectorAC.x * vectorAD.y - vectorAD.x * vectorAC.y;
  const crossProduct2 = vectorCA.x * vectorCB.y - vectorCB.x * vectorCA.y;
  const crossProduct3 = vectorCD.x * vectorDC.y - vectorDC.x * vectorCD.y;

  return (
    (crossProduct1 * crossProduct2 >= 0) &&
    (crossProduct1 * crossProduct3 >= 0)
  );
}

// 计算直线与线段的交点
function calculateIntersectionPoint(pointA, pointB, pointC, pointD) {
  const pointP = { x: 0, y: 0 };

  const vectorAB = {
    x: pointB.x - pointA.x,
    y: pointB.y - pointA.y,
  };

  const vectorAC = {
    x: pointC.x - pointA.x,
    y: pointC.y - pointA.y,
  };

  const t = (vectorAC.y * vectorAB.x - vectorAB.y * vectorAC.x) / (vectorAB.y * (pointD.x - pointC.x) - vectorAB.x * (pointD.y - pointC.y));

  pointP.x = pointC.x + t * (pointD.x - pointC.x);
  pointP.y = pointC.y + t * (pointD.y - pointC.y);

  return pointP;
}

// 判断直线与多边形是否相交并获取交点集合
function findIntersectionPoints(pointA, pointB, polygonPoints) {
  const intersectionPoints = [];

  for (let i = 0; i < polygonPoints.length; i++) {
    const startPoint = polygonPoints[i];
    const endPoint = polygonPoints[(i + 1) % polygonPoints.length];

    if (isSegmentsIntersect(pointA, pointB, startPoint, endPoint)) {
      const intersectionPoint = calculateIntersectionPoint(pointA, pointB, startPoint, endPoint);
      intersectionPoints.push(intersectionPoint);
    }
  }

  return intersectionPoints;
}








</script>

<style scoped></style>