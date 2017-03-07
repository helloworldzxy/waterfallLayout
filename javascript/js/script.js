window.onload = function(){
	waterfall('main', 'box');

	//模拟从后台获取的json数据信息
	var dataInt = {
		"data": [
			{
				"src": '0.jpg'
			},
			{
				"src": '1.jpg'
			},
			{
				"src": '2.jpg'
			},
			{
				"src": '3.jpg'
			}
		]
	}

	//检测是否拖动了滚动条: onscroll
	window.onscroll = function(){
		if(checkScrollSlide()){
			var oParent = document.getElementById('main');

			//遍历json，将数据块渲染到页面尾部
			for(var i = 0; i < dataInt.data.length; i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);  //每动态创建一个元素就要及时添加进DOM

				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);

				var oImg = document.createElement('img');
				oImg.src = "images/" +  dataInt.data[i].src;
				oPic.appendChild(oImg);
			}

			waterfall('main', 'box'); //再一次调用，否则新加入的节点不会按照理想位置（先找最小高度）放置
		}
	}


}

function waterfall(parent, box){
	//取出所有盒子
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent, box);
	// console.log(oBoxs.length);

	//--------计算整个页面显示的列数（页面宽度/box宽度）--------
	//计算每个盒子的宽度offsetWidth
	var oBoxW = oBoxs[0].offsetWidth;
	// console.log(oBoxW);

	//获取页面初始打开时的宽度document.documentElement.clientWidth
	var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
	// console.log(cols);

	//如果想要列数不随浏览器窗口的变化而变化，则应设置#main的宽度（为初始时打开页面时的列数*每列宽度）
	oParent.style.cssText = 'width: ' + oBoxW * cols + 'px; margin: 0 auto;';

	var hArr = []; //存放每一列高度
	for(var i = 0; i < oBoxs.length; i++){
		if(i < cols){ //第一行
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null, hArr); //apply使Math.min能用于数组
			var index = getMinHIndex(hArr, minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			//设置left有两种方法
			// oBoxs[i].style.left = oBoxW * index + 'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';

			hArr[index] += oBoxs[i].offsetHeight;

		}
	}

	// console.log(hArr);

}

function getByClass(parent, clsName){
	var boxArr = new Array(),
		oElements = parent.getElementsByTagName('*');

	for(var i = 0; i < oElements.length; i++){
		if(oElements[i].className == clsName){ //这里只考虑了元素只有一个类名的情况
			boxArr.push(oElements[i]);
		}
	}

	return boxArr;
}

function getMinHIndex(arr, value){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == value){
			return i;
		}
	}
}

//滚动条向下拖动了多少像素，则整个页面就向上偏移多少像素？比例关系
//在最后一个盒子的一半高度进入浏览器可视区域时，开始加载
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent, 'box');
	//lastBoxH 是最后一个盒子相对于父元素（整个页面）顶部的距离
	var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop 
				+ Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
	//获取页面滚动的距离(混杂模式 || 标准模式) ：整个页面偏移浏览器窗口最上方的距离
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	//获取浏览器窗口的高度(混杂模式 || 标准模式)：比如，当chrome dev tools 的高度变化时，浏览器可视窗口的高度也会变化
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	// return (lastBoxH <  scrollTop + height) ? true : false;
	return (lastBoxH < scrollTop + height);
}



