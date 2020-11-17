let bannerView = document.getElementById('banner');

// 获取可视区域宽度
let winWidth = document.documentElement.clientWidth || document.body.clientWidth;

// 获取bannerView的第一个子元素
let slideContent = bannerView.children[0];

//获取左右箭头
let prev = bannerView.getElementsByClassName('slide-prev')[0];
let next = bannerView.getElementsByClassName('slide-next')[0];

console.log(prev);

// 获取第一个ul
let firstUl = slideContent.getElementsByTagName('ul')[0]

// 获取所有li
let items = firstUl.children;

// 设置包裹轮播图盒子宽度
slideContent.style.width = winWidth * items.length + 'px';

// 索引
let index = 0;

let flag = false;

//定时器
let flagTime = null;

//设置每个li的宽度
for(let i = 0; i < items.length; i++) {
    items[i].style.width = winWidth + 'px';
}

let slideNav = bannerView.getElementsByClassName('slide-nav')[0];

let slideNavSon = slideNav.children;

for(let i = 0; i < slideNavSon.length; i++) {
    slideNavSon[i].onclick = function() {

        // 点击先清除样式类名
        // for(let j = 0; j < slideNavSon.length; j++) {
        //     slideNavSon[j].className = '';
        // }
        // 给当前点击元素添加样式类名
        // this.className = 'current';
        paita(i);
        imgSlide(i);
        //存储当前的索引
        index = i;
    }
}

function imgSlide(index) {
    paita(index);
    let left = index * winWidth;
    slideContent.style.left = -left + 'px';
    flagTime = setTimeout(() => {
        flag = false;
        clearTimeout(flagTime);
    }, 1000);

}

function paita(index) {
    // 点击先清除样式类名
    for(let k = 0; k < slideNavSon.length; k++) {
        slideNavSon[k].className = '';
    }
    slideNavSon[index].className = 'current';
}

// 左
prev.onclick = function() {
    if(flag) return false; 
    flag = true;
    index--;
    if(index < 0) {
        index = items.length-1;
    }
    paita(index);
    imgSlide(index);
    // console.log(index);
    // slideContent.style.left = index * winWidth + 'px';
}
// 右
next.onclick = next1;
function next1() {
    if(flag) return false; 
    flag = true;
    index++;
    if(index >= items.length) {
        index = 0;
    }
    paita(index);
    imgSlide(index);
    // console.log(index);
    // slideContent.style.left = -index * winWidth + 'px';
}

// 当鼠标移入轮播图，禁止自动轮播
bannerView.addEventListener('mouseenter', function() {
    clearInterval(time);
})

// 当鼠标离开轮播区域，开启自动轮播
bannerView.addEventListener('mouseleave', function() {
    time = setInterval(function(){
        next1();
    }, 2000)
})

console.log(slideNavSon);
let time = setInterval(function(){
    next1();
}, 2000)


