
window.onload = function () {



        var btn = document.getElementsByTagName("button")[0];
        var txt = btn.previousElementSibling || btn.previousSibling;
        var ul = btn.nextElementSibling || btn.nextSibling;

        btn.onclick = function () {
            var str = txt.value;
            if(str === "" || str.trim() === ""){
                alert("输入的内容不能为空！");
                return;//如果内容为空，切断函数
            }
            var newLi = document.createElement("li");
            newLi.innerHTML = str+"<a href='javascript:;'>删除</a>";
            if(ul.children.length === 0){
                ul.appendChild(newLi);
            }else{
                ul.insertBefore(newLi,ul.children[0]);
            }

            txt.value = "";



            newLi.getElementsByTagName("a")[0].onclick = function () {
                ul.removeChild(newLi);
            }
        }


    }
