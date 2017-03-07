$(window).on('load', function(){
	waterfall();

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

	$(window).on('scroll', function(){
		if(checkScrollSlide()){
			$.each(dataInt.data, function(key, value){
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				$('<img>').attr('src', 'images/' + $(value).attr('src')).appendTo($(oPic)); 
				//value是js原生对象，要转化为jQuery对象
			});
			waterfall();
		}
	})
});

function waterfall(){
	var $boxs = $('#main > div'); //>只找main下的一级div，不加>则找所有后代div
	var w = $boxs.eq(0).outerWidth();
	//outerWidth() 包括定义的padding border；
	//width(); //只获取定义的width,也可设置width(设置时不用写'px')
	var cols = Math.floor($(window).width() / w);
	$('#main').width(cols * w).css('margin', '0 auto');

	var hArr = [];
	$boxs.each(function(index, value){
		var h = $boxs.eq(index).outerHeight();
		if(index < cols){
			//hArr.push(value.outerHeight()); //test
			hArr[index] = h;
		}else{
			var minH = Math.min.apply(null, hArr);
			//jQuery有直接寻找索引的函数封装
			var minHIndex = $.inArray(minH, hArr);
			//value是DOM对象，要转化成jQuery对象，才能用.css方法
			$(value).css({
				'position': 'absolute',
				'top': minH + 'px',
				'left': minHIndex * w + 'px'
			});

			hArr[minHIndex] += $boxs.eq(index).outerHeight();

		}
	});
}

function checkScrollSlide(){
	//.last()
	var $lastBox = $('#main > div').last();

	var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();

	return (lastBoxDis < scrollTop + documentH);
}







