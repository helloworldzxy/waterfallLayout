$(window).on("load", function() {
    // 调用waterfall函数
    waterfall(true);

    var dataInt = {
        'data': [{
            'src': '1.jpg'
        }, {
            'src': '2.jpg'
        }, {
            'src': '3.jpg'
        }, {
            'src': '4.jpg'
        }]
    };
    $(window).on('scroll', function() {
        // 拖动滚动条时 同jQuery/script.js
        // var yes = checkscrollside();
        // console.log(yes);
        if(checkscrollside()){
            $.each(dataInt.data, function(key, value){
                var oPin = $('<div>').addClass('pin').appendTo($('#main'));
                var oBox = $('<div>').addClass('box').appendTo($(oPin));
                $('<img>').attr('src', 'images/' + $(value).attr('src')).appendTo($(oBox)); 
                //value是js原生对象，要转化为jQuery对象
            });
            console.log("testestseeee");
            waterfall(false);
        }

    });

});

function waterfall(needAnimate) {
    // 计算及定位数据块显示分散效果
    var $pins = $('#main').find(".pin");
    var w = $pins.eq(0).outerWidth();
    var cols = Math.floor($(window).width() / w);
    // console.log(cols);
    $('#main').width(cols * w).css('margin', '0 auto');

    var hArr = [];

    if(needAnimate){

        $pins.each(function(index, value){
            // console.log("index: " + index + "  value: " + value);
            if(index < cols){
                hArr.push($pins.eq(index).outerHeight());
            }else{
                //放置初始位置
                var maxH = Math.max.apply(null, hArr);

                $pins.eq(index).css({
                    'position': 'absolute',
                    'top': 1.5 * maxH + (Math.random() > 0.5 ? 1: -1) * (Math.random() * maxH) / 2 + 'px',
                    'left': (cols / 2) * w + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * w)  + 'px'
                });
            }
        }); //end of each

        //设置动画
        setTimeout(function(){
            $pins.each(function(index, value){
                if(index >= cols){
                    var minH = Math.min.apply(null, hArr);
                    var minHIndex = $.inArray(minH, hArr);
                    $pins.eq(index).animate({
                        'top': minH + 'px',
                        'left': minHIndex * w + 'px'
                    });
                    hArr[minHIndex] += $pins.eq(index).outerHeight();
                }
            })
        }, 2000);
    }else{ //not need animate
        $pins.each(function(index, value){
            var h = $pins.eq(index).outerHeight();
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

                hArr[minHIndex] += $pins.eq(index).outerHeight();

        }
        });
    }
}

function waterfallWithoutAnimate(){
    var $pins = $('#main > div'); //>只找main下的一级div，不加>则找所有后代div
    var w = $pins.eq(0).outerWidth();
    //outerWidth() 包括定义的padding border；
    //width(); //只获取定义的width,也可设置width(设置时不用写'px')
    var cols = Math.floor($(window).width() / w);
    $('#main').width(cols * w).css('margin', '0 auto');

    var hArr = [];
    $pins.each(function(index, value){
        var h = $pins.eq(index).outerHeight();
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

            hArr[minHIndex] += $pins.eq(index).outerHeight();

        }
    });
}

function checkscrollside() {
    // 检测是否具备了加载数据块的条件
    var $lastBox = $('#main > div').last();

    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();

    return (lastBoxDis < scrollTop + documentH);
}
