/**
 * Created by Administrator on 2017/2/25.
 */
    window.onload = function () {
       var ul = document.getElementsByClassName("sing-l-inf-jump")[0];
       var ulArr = ul.children;
       var singP = document.getElementsByClassName("sing-r-inf")[0];
       var divArr = singP.children;


        var timer = null;
        var target = 0;
        var leader = 0;
        window.onscroll = function () {
            leader = scroll().top;
        }
        for(var i=0;i<ulArr.length;i++){
            ulArr[i].index = i;
            ulArr[i].onclick = function () {
                target = divArr[this.index].offsetTop+divArr[this.index].offsetHeight-33;
                clearInterval(timer);
                timer = setInterval(function () {
                    var step = (target - leader)/10;
                    step = step>0?Math.ceil(step):Math.floor(step);
                    leader = leader + step;
                    window.scrollTo(0,leader);
                    console.log(1);
                    if(target === leader){
                        clearInterval(timer);
                    }
                },30);

            }
        }
    }