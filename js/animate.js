/**
 * Created by Belive on 2017/2/24.
 */
function animate(ele,json,fn){
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //����ԭ��
        var flag = true;
        for(var k in json){
            //�����������⴦��
            if(k === "z-index"){
                //1.�㼶(��Ҫһ��һ��������ߣ�һ����ֱ�ӵ���: �������)
                ele.style.zIndex = json[k];
                //��ʱ��Ҳ���ùܡ���һ���Ե���Ŀ��λ�ã��Ƿ������ʱ������ѯ�ʲ㼶��
            }else if(k === "opacity"){
                //2.͸����(С���ͼ�������)
                var leader = parseInt(getStyle(ele,k)*100);//��ȡֵ��ʱ�����û��Ĭ����auto��
                //��Ϊ͸������С����Ϊ�˱��⾫�ȶ�ʧ��*10����ֵ��ʱ�����10�Ϳ�����
                console.log(leader);
                var step = (parseInt(json[k]*100)-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader+step;
                ele.style.opacity = leader/100;//ֵ��һ��10���Ƶ�ֵ����������10��
                //����ie678,��Ҫ���100����
                ele.style.filter = "alpha(opacity="+leader+")";
                //console.log(1);
                if(json[k]*100 != leader){//���漰С���ˡ�����
                    flag = false;
                }
            }else{
                //3.��ͨ����
                var leader = parseFloat(getStyle(ele,k)) || 0;//��ȡԪ�ص�����Ȼ��ȡ����ֵ��
                var step = (json[k]-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader+step;
                ele.style[k] = leader + "px";
                console.log(1);
                if(json[k] != leader){//���漰С���ˡ�����
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