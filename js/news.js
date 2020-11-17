let newsMeun = document.getElementsByClassName('news-meun')[0]
let newsList = document.getElementsByClassName('news-list')[0]
let dataItem = {} //存储数据减少请求
$.ajax({
    type: 'post', //请求方式
    url: './data/newsCategory.php',
    dataType: "json",
    data: JSON.stringify({
        module: 'news'
    }),
    headers: {
        "Content-Type": "application/json; charset=utf-8" //json请求方式，data数据需要转换为json格式，
    }, //请求类型
    success: function (req) {
        if (!req.data) {
            return
        }
        let data = req.data;
        let str = "";
        let isCurrent = '';
        data.forEach((item, index) => {
            isCurrent = index == 0 ? 'current' : '';
            str += `<a data-type="dataType${index}" class="${isCurrent}" onclick="changeClick({_this:this, id:${item.id}, index: ${index}})" href="javascript:void(0);">${item.categoryName}</a>`;
        });
        newsMeun.innerHTML = str;
        console.log(data);
        changeClick({
            _this: newsMeun.children[0],
            id: data[0].id
        });

    },
    error: function () {} //请求失败时被调用的函数
})


// 新闻菜单单击事件
function changeClick(params) {
    // 获取自定义属性
    let categoryType = params._this.getAttribute('data-type');

    let newsMeunSon = newsMeun.children;
    let menuId = params.id;
    exclude(newsMeunSon); //清除类名样式
    params._this.className = 'current';

    let data = dataItem[categoryType];
    // 判断数据是否渲染和存储过了，存储过了直接调用遍历存储在dataItem数据，减少请求！
    if (data) {
        tabContent(data);
        return false;
    }

    $.ajax({
        type: 'post',
        url: './data/indexNews.php',
        dataType: 'json',
        timeout: 1000, //超时时间设置， 单位毫秒 
        data: JSON.stringify({
            categoryId: menuId
        }),
        success: function (req) {
            let data = req.data;
            if (!data) return;
            tabContent(data);
            // 数据存储
            dataItem[categoryType] = data;
        },
        error: function () {} //请求失败时被调用的函数

    })
}


// 排他
function exclude(params) {
    if (!params) {
        return console.log(q111);
    }
    for (let i = 0; i < params.length; i++) {
        params[i].className = '';
    }
}


function tabContent(data) {
    let ul = '<ul>'
    data.forEach(item => {
        ul += `<li>
            <img src="./img/blank/transparent.png" alt="" style="background-image: url(${item.imgUrl})">
            <h5>${item.title}</h5>
            <time>${item.time}</time>
            <i class="line"></i>
            <p>${item.dec}</p>
            <a href="javascript:void(0);" class="see-more">
                查看更多<i class="iconfont icon-jiantou more-jiantou"></i>
            </a>
        </li>`
    })
    ul += '</ul>';
    newsList.innerHTML = ul;
}