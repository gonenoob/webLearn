https://segmentfault.com/a/1190000002629708

对于DOM结构中的各个元素都有自己的盒子（模型），
这些都需要浏览器根据各种样式（浏览器的、开发人员定义的等）来计算并根据计算结果将元素放到它该出现的位置，
这个过程称之为reflow；
当各种盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来后，
浏览器于是便把这些元素都按照各自的特性绘制了一遍，于是页面的内容出现了，
这个过程称之为repaint。
可见这两个东东对浏览器渲染页面是很重要的啊，都是会影响性能的，
因此我们需要了解一些常见的会引起repaint和reflow的一些操作，并且应该尽量减少以提高渲染速度。

Reflow 的成本比 Repaint 的成本高得多的多。
DOM Tree 里的每个结点都会有 reflow 方法，一个结点的 reflow 很有可能导致子结点，甚至父点以及同级结点的 reflow。
在一些高性能的电脑上也许还没什么，但是如果 reflow 发生在手机上，那么这个过程是非常痛苦和耗电的。
所以，下面这些动作有很大可能会是成本比较高的。

当你增加、删除、修改 DOM 结点时，会导致 Reflow 或 Repaint。
当你移动 DOM 的位置，或是搞个动画的时候。
当你修改 CSS 样式的时候。
当你 Resize 窗口的时候（移动端没有这个问题），或是滚动的时候。
当你修改网页的默认字体时。
注：display:none 会触发 reflow，而 visibility:hidden 只会触发 repaint，因为没有发现位置变化。


优化

Reflow是不可避免的，只能将Reflow对性能的影响减到最小,给出下面几条建议：

1.不要一条一条地修改 DOM 的样式。与其这样，还不如预先定义好 css 的 class，然后修改 DOM 的 className：
	// 不好的写法
	var left = 10,
	top = 10;
	el.style.left = left + "px";
	el.style.top  = top  + "px";
	// 推荐写法
	el.className += " theclassname";
2.把 DOM 离线后修改。如：
a> 使用 documentFragment 对象在内存里操作 DOM。
b> 先把 DOM 给 display:none (有一次 repaint)，然后你想怎么改就怎么改。比如修改 100 次，然后再把他显示出来。
c>  clone 一个 DOM 节点到内存里，然后想怎么改就怎么改，改完后，和在线的那个的交换一下。
3.不要把 DOM 节点的属性值放在一个循环里当成循环里的变量。不然这会导致大量地读写这个结点的属性。
4.尽可能的修改层级比较低的 DOM节点。当然，改变层级比较底的 DOM节点有可能会造成大面积的 reflow，但是也可能影响范围很小。
5.为动画的 HTML 元件使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是会大大减小 reflow 。
6.千万不要使用 table 布局。因为可能很小的一个小改动会造成整个 table 的重新布局。
