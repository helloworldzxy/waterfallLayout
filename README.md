# waterfallLayout
3 ways to implement a waterfall layout: Javascript/jQuery/CSS3

## The differences:

1. 原生JS方式：

1). 需要计算：列数 = 浏览器窗口宽度 / 图片宽度。

2). 图片定位：根据每一列数据块（盒子）的高度计算接下来图片的位置。

3). 图片排序：按照图片计算的位置横向排列，位置是计算出来的，比较规范。

2. CSS3方式：

1). 不需要计算：浏览器自动计算，只需设置列宽。性能高。

2). 列宽及列数会随着浏览器宽度的变化而变化。

3). 图片排序：按照垂直顺序排列，打乱图片显示顺序。

4). 拖动滚动条加载新图片的实现还是需要JS来实现。

## jQuery/scatter.html

一、定义图片布局函数waterfall

二、计算整个父盒子的宽度且让它在浏览器中水平居中

三、计算及排列每个数据块应该出现的位置，一开始数据块随机放置在大约居中位置，然后通过动画分散到它该出现的位置

四、拖动滚动条时定义检测是否具备了滚条加载数据块条件的函数。

五、遍历给出的数据，将图片添加到数据块中渲染出来

