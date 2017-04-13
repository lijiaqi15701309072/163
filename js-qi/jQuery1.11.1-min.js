/**
 * Created by Lenovo on 2017/2/16.
 */
//1.封装一个方法，传递两个参数。元素，json。
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

//兼容写法
function getStyle(ele,attr){
    if(window.getComputedStyle !== undefined){
        return window.getComputedStyle(ele,null)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}


function scroll(){
    return {
        top: window.pageYOffset || document.documentElement.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft
    }
}



function $(str){
    //需求；传递的参数有可能是一个函数。
    //     如果是一个函数，那么调用window.onload事件绑定
    if(typeof str === "function"){
       window.onload = str;
    }else{
        var char = str.charAt(0);
        if(char === "#"){
            return document.getElementById(str.slice(1));
        }else if(char === "."){
            return document.getElementsByClassName(str.slice(1));
        }else{
            return document.getElementsByTagName(str);
        }
    }
}

//显示
function show(ele){
    animate(ele,{"opacity":1});
    ele.style.display = "block";
}

//隐藏
function hide(ele){
    animate(ele,{"opacity":0});
    ele.style.display = "none";
}


/**
 * 功能：给我一个节点，返还他的下一个兄弟节点。
 * @param ele
 * @returns {Element|*|Node}
 */
function nextSib(ele){
    //兼容写法：
    var aaa = ele.nextElementSibling || ele.nextSibling;
    return aaa;
}


/**
 * 功能：给我一个节点，返还他的前一个兄弟节点。
 * @param ele
 * @returns {Element|*|Node}
 */
function prevSib(ele){
    //兼容写法：
    return ele.previousElementSibling || ele.previousSibling;
}

/**
 * 功能：给我一个元素节点，返还给你他的第一个子节点。
 * @param ele
 * @returns {Element|*|Node}
 */
function firstC(ele){
    return ele.firstElementChild || ele.firstChild;
}

/**
 * 功能：给我一个元素节点，返还给你他的最后一个子节点。
 * @param ele
 * @returns {Element|*|Node}
 */
function lastC(ele){
    return ele.lastElementChild || ele.lastChild;
}


//拓展：（1.给索引和节点查对应索引值的兄弟节点。
//       2.给我一个元素我返还给你他的所有兄弟节点。）

/**
 * 功能：给索引和节点查对应索引值的兄弟节点
 * @param ele
 * @param index
 * @returns {*|HTMLElement}
 */
function getEleOfIndex(ele,index){
    //通过节点找父节点，然后在找到所有子节点。在找到指定索引值的兄弟节点。
    //var parent = ele.parentNode;
    //var childArr = parent.children;
    //return childArr[index];

    return ele.parentNode.children[index];
}


/**
 * 功能：给我一个元素我返还给你他的所有兄弟节点
 * @param ele
 * @returns {Array}
 */
function getSibings(ele){
    //思路：通过自己找父亲，在找所有所有子节点。然后只要不是自己，就添加到新数组中。
    var arr = [];
    var childArr = ele.parentNode.children;
    //for循环遍历所有子元素。然后判断，不是自己就添加到新数组中。
    for(var i=0;i<childArr.length;i++){
        if(childArr[i] != ele){
            //arr[arr.length] = childArr[i];
            arr.push(childArr[i]);
        }
    }
    //返回arr
    return arr;
}


function clientWidth(){
    if(window.innerWidth !== undefined){
        return window.innerWidth;
    }else if(document.compatMode === "CSS1Compat"){
        return document.documentElement.clientWidth;
    }else{
        return document.body.clientWidth;
    }
}


function clientHeight(){
    if(window.innerHeight !== undefined){
        return window.innerHeight;
    }else if(document.compatMode === "CSS1Compat"){
        return document.documentElement.clientHeight;
    }else{
        return document.body.clientHeight;
    }
}

//背景色设置的封装
function fn() {
    //思路：检测可视区域的宽度。
    //判断：如果小于640px  那么给红色。
    //     如果大于640,小于960；那么给黄色
    //     如果大于960；那么给绿色
    if(clientWidth() <= 640){
        document.body.style.backgroundColor = "red";
    }else if(clientWidth() >640 && clientWidth() <960){
        document.body.style.backgroundColor = "yellow";
    }else{
        document.body.style.backgroundColor = "green";
    }
}



var EventObj = {
    addEvent: function (ele,eve,fn) {
        //判断：浏览器是否支持此方法
        if(ele.addEventListener){
            ele.addEventListener(eve,fn);
        }else if(ele.attachEvent){
            ele.attachEvent("on"+eve,fn);
        }else{
            ele["on"+eve] = fn;
        }
    },
    removeEvent: function (ele,eve,fn) {
        //判断：浏览器支持那种解绑方法
        if(ele.removeEventListener){
            ele.removeEventListener(eve,fn);
        }else if(ele.detachEvent){
            ele.detachEvent("on"+eve,fn);
        }else{
            ele["on"+eve] = null;
        }
    }
};