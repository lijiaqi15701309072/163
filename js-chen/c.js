/**
 * Created by asus on 2017/2/24.
 */
window.onload=function(){

        var img = document.getElementById("img");
        window.onscroll = function () {
            if(scroll().top > 200){
                img.style.display = "block";
            }else{
                img.style.display = "none";
            }
            leader = scroll().top;

        }

        var timer = null;
        var target = 0;
        var leader = 0;
        img.onclick = function () {

            timer = setInterval(function () {

                var step = (target-leader)/10;

                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader + step;

                window.scrollTo(0,leader);
                console.log(1);

                if(target === leader){
                    clearInterval(timer);
                }
            },30);
        }
};