/**
 * Created by Belive on 2017/2/24.
 */
function animate(ele,json,fn){
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //开闭原则。
        var flag = true;
        for(var k in json){
            //特殊属性特殊处理
            if(k === "z-index"){
                //1.层级(不要一步一步缓慢提高，一次性直接到达: 需求决定)
                ele.style.zIndex = json[k];
                //定时器也不用管。（一次性到达目标位置，是否清楚定时器不用询问层级）
            }else if(k === "opacity"){
                //2.透明度(小数和兼容问题)
                var leader = parseInt(getStyle(ele,k)*100);//获取值的时候，如果没有默认是auto；
                //因为透明度是小数，为了避免精度丢失，*10；赋值的时候除以10就可以了
                console.log(leader);
                var step = (parseInt(json[k]*100)-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader+step;
                ele.style.opacity = leader/100;//值是一个10进制的值，索引除以10；
                //兼容ie678,就要变成100进制
                ele.style.filter = "alpha(opacity="+leader+")";
                //console.log(1);
                if(json[k]*100 != leader){//不涉及小数了。。。
                    flag = false;
                }
            }else{
                //3.普通属性
                var leader = parseFloat(getStyle(ele,k)) || 0;//获取元素的属性然后取浮点值。
                var step = (json[k]-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader+step;
                ele.style[k] = leader + "px";
                console.log(1);
                if(json[k] != leader){//不涉及小数了。。。
                    flag = false;
                }
            }
        }
        if(flag){
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }
    },30);
}
function getStyle(ele,attr){
    if(window.getComputedStyle !== undefined){
        return window.getComputedStyle(ele,null)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}