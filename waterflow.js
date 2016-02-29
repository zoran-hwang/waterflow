window.onload=function(){
	imgLocation("container","box");
	var imgData={"data":[{"src":"P1.jpg"},{"src":"P2.jpg"},{"src":"P3.jpg"},{"src":"P4.jpg"},{"src":"P5.jpg"},{"src":"P6.jpg"}]};
		window.onscroll=function(){
			if(checkFlag()){
				//向瀑布流里添加新图片
				var oparent=document.getElementById("container");
				for(var i=0;i<imgData.data.length;i++){
					var ocontent=document.createElement("div");
					ocontent.className="box";
					oparent.appendChild(ocontent);
					var boxImg=document.createElement("div");
					boxImg.className="box_img";
					ocontent.appendChild(boxImg);
					var img=document.createElement("img");
					img.src="img/"+imgData.data[i].src;
					boxImg.appendChild(img);
				}
				imgLocation("container","box");
			}
		};
};
// 检测瀑布流是否已经到达底部
function checkFlag(){
	var oparent=document.getElementById("container");
	var ocontent=getChildElement(oparent,"box");
	// 最后一张图片距离顶部的值
	var lastContentHeight=ocontent[ocontent.length-1].offsetTop;
	//滚动了的高度
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	// 当前页面的高度
	var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
	if(lastContentHeight<scrollTop+pageHeight){
		return true;
	}
}
function imgLocation(parent,content){
	var oparent=document.getElementById(parent);
	var ocontent=getChildElement(oparent,content);
	// 获取图片宽度
	var imgWidth=ocontent[0].offsetWidth;
	// 获取当前浏览器可以显示的最大行数
	var num=Math.floor(document.documentElement.clientWidth/imgWidth);
	// 固定container的宽度 
	oparent.style.cssText="width:"+imgWidth*num+"px;margin:0 auto";

	var boxHeightArr=[];
	for(var i=0;i<ocontent.length;i++){
		if(i<num){
			boxHeightArr[i]=ocontent[i].offsetHeight;
		}else{
			// 给boxHeighrArr求最小值赋给minHeight
			var minHeight=Math.min.apply(null,boxHeightArr);
			var minIndex=getminHeightLocation(boxHeightArr,minHeight);
			ocontent[i].style.position="absolute";
			ocontent[i].style.top=minHeight+"px";
			ocontent[i].style.left=ocontent[minIndex].offsetLeft+"px";
			// 更新最小高度图片的高度 当前高度加上新添加图片的高度
			boxHeightArr[minIndex]=boxHeightArr[minIndex]+ocontent[i].offsetHeight;
		}
	}
}
function getChildElement(parent,content){
	var contentArr=[];
	var allContent=parent.getElementsByTagName('*');
	for(var i=0;i<allContent.length;i++){
		if (allContent[i].className==content) {
			contentArr.push(allContent[i]);
		}
	}
	return contentArr;
}
// 遍历所有boxHeightArr获取到最小的高度，返回对应的位置
function getminHeightLocation(boxHeightArr,minHeight){
	for(var i in boxHeightArr){
		if (boxHeightArr[i]==minHeight){
			return i;
		}
	}
}


