// 获取元素

var getElem = function( selector ){
  return document.querySelector(selector);
}
var getAllElem = function( selector ){
  return document.querySelectorAll(selector);
}
// 获取元素的样式
var getCls = function ( element ) {
  return element.getAttribute('class');
}
// 设置元素的样式
var setCls = function( element ,cls){
  return element.setAttribute('class',cls);
}

// 为元素添加样式
var addCls = function( element , cls ){
  var baseCls  = getCls(element);
  if( baseCls.indexOf(cls) === -1){
      setCls(element,baseCls+' '+cls); // 注意空格
  }
  return ;
}
// 为元素删减样式
var delCls = function( element , cls){
  var baseCls  = getCls(element);
  if( baseCls.indexOf(cls) > -1){ // 更精确的需要用正则表达式 ,因为这里只用于切换 _animate_in 所以没事
      setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
  }
  return ;
}





var animateElements = {
	".screen__1":[
		".screen__1__wrap__heading",
		".screen__1__wrap__subheading"
	],
	".screen__2":[
		".screen__2__heading",
		".screen__2__subheading",
		".screen__2__man",
		".screen__2__rocket"
	],
	".screen__3":[
		".screen__3__wrap__heading",
		".screen__3__wrap__subheading",
		".screen__3__react",
		".screen__3__wrap__lanwrap",
		".screen__3__wrap__lanwrap__item-i-1",
		".screen__3__wrap__lanwrap__item-i-2",
		".screen__3__wrap__lanwrap__item-i-3",
		".screen__3__wrap__lanwrap__item-i-4",
		".screen__3__wrap__lanwrap__item-i-5"
	],
	".screen__4":[
		".screen__4__wrap__heading",
		".screen__4__wrap__subheading",
		".screen__4__wrap__item-i-1",
		".screen__4__wrap__item-i-2",
		".screen__4__wrap__item-i-3",
		".screen__4__wrap__item-i-4"
	],
	".screen__5":[
		".screen__5__wrap__heading",
		".screen__5__wrap__subheading",
		".screen__5__wrap__head"
	],
	".header":[
		".header",
		".header__logo",
		".header__nav__item-i-1",
		".header__nav__item-i-2",
		".header__nav__item-i-3",
		".header__nav__item-i-4",
		".header__nav__item-i-5"
	]
}


// 设置css3的滚动动画
function setAnimate(screenele) {
	var screen = document.querySelector(screenele);
	var screenChild = animateElements[screenele];
	// var isDone = true;
	// screen.onclick = function() {
		// if( isDone == false ) {
		// 	for(var i = 0; i < screenChild.length; i++) {
		// 		var child = document.querySelector(screenChild[i]);
		// 		var childCls = child.getAttribute('class');
		// 		child.setAttribute('class', childCls + ' ' + screenChild[i].substr(1) + '_animate_init');
		// 	}
		// isDone = true;
		// return;
		// }
		// if( isDone == true ) {
	for(var i = 0; i < screenChild.length; i++) {
		var child = document.querySelector(screenChild[i]);
		var childCls = child.getAttribute('class');
		child.setAttribute('class', childCls.replace('_animate_init', '_animate_done'));
	}
		// isDone = false;
		// return;
		// }
	// }
}

// 页面载入时执行第一屏的动画
window.onload = function() {
	setTimeout(()=>setAnimate(".screen__1"), 200);
}

// 设置头部导航和右侧导航字体颜色
var headernav = document.querySelector('.header__nav');
var navItems = headernav.querySelectorAll('a');

var rightnav = document.querySelector('.nav-right');
var rightnavchild = rightnav.querySelectorAll('a');
var nowIndex = null; //记录导航active的index位置好改变鼠标离开时下划线回滚的位置
function setNavColor(index) {
	for(var i = 0; i < navItems.length -1; i++) {
		delCls( navItems[i], 'header__nav__tiem_active' );
	}
	addCls( navItems[index], 'header__nav__tiem_active');
	tip.style.left = 40 + (88*index) + 'px';
	nowIndex = index;
	for(var i = 0; i < rightnavchild.length; i++) {
		delCls( rightnavchild[i], 'nav-right_active' );
	}
	addCls( rightnavchild[index], 'nav-right_active');
	tip.style.left = 40 + (88*index) + 'px';
}

// 设置头部导航下的划线位置
var tip = document.querySelector('.header__active');
for(var i = 0; i < navItems.length-1; i++) {
	setTip(i);
}

function setTip(index) {
	navItems[index].onmouseenter = function() {
		tip.style.left = 40 + (index*88) + 'px' ;
	}
	navItems[index].onmouseleave = function() {
		tip.style.left = 40 + (nowIndex*88) + 'px';
	}
}




// 点击导航跳转
function setNavJump(lib, index) {
	var ele = lib[index];
	ele.onclick = function() {
		document.documentElement.scrollTop = index*640;
	}
}

for(var i = 0; i < navItems.length-1; i++) {
	setNavJump(navItems, i);
}
for(var i = 0; i < rightnavchild.length; i++) {
	setNavJump(rightnavchild, i);
}


// 滚动条滚动时触发各个css3动画
window.onscroll = function() {
	var top = document.documentElement.scrollTop;
	console.log(top);
	if( top == 0) {    //处于顶部时改变header的背景颜色为none
		(function setAnimate(screenele) {
			var screen = document.querySelector(screenele);
			var screenChild = animateElements[screenele];
			for(var i = 0; i < screenChild.length; i++) {
				var child = document.querySelector(screenChild[i]);
				var childCls = child.getAttribute('class');
				child.setAttribute('class', childCls.replace('_animate_done', '_animate_init'));
			}
		})(".header")
	}else if( top > 60 ){      //下拉滚动条改变header背景色
		setAnimate(".header")  
	}
	if( top > 1 || top == 0) {
		setAnimate(".screen__1");
		setNavColor(0);
	}
	if( top > 540) {
		setAnimate(".screen__2");
		setNavColor(1);
	}
	if( top > 1080) {
		setAnimate(".screen__3");
		setNavColor(2);
	}
	if( top > 1620) {
		setAnimate(".screen__4");
		setNavColor(3);
	}
	if( top > 2160) {
		setAnimate(".screen__5");
		setNavColor(4);
	}
}


// 点击继续了解学习返回顶部
var returntop = document.querySelector('.other__study');
returntop.onclick = function() {
	document.documentElement.scrollTop = 0;
}