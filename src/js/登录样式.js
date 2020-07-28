//登录样式
let dlyh=localStorage.getItem('uname')
console.log(dlyh)
if(!dlyh==''){
    let hyml=''
    hyml+=`
            <ul>
                <li>您好，欢迎来到京西！[<a href="user.html">${dlyh}</a>] [<a href="index.html">退出</a>] </li>
                <li class="line">|</li>
                <li>我的订单</li>
                <li class="line">|</li>
                <li>客户服务</li>

            </ul>
    `
    $('.topnav_right').html(hyml)
    $('.topnav_right').on('click','a:nth-child(2)',function(e){
        let eObj=e||window.event
        eObj.preventDefault()
        localStorage.setItem('uname','')
        window.location.reload()
    })
    let haml=''
    haml+=`
    您好，${dlyh}<a href="">退出</a>
    `
    $('.user .prompt').html(haml)
    $('.user .prompt').on('click','a',function(e){
        let eObj=e||window.event
        eObj.preventDefault()
        localStorage.setItem('uname','')
        window.location.reload()
    })
}