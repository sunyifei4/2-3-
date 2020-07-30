//登录样式
let dlyh
let ccff=localStorage.getItem('ccff')
if(ccff=='checked'){
    dlyh=localStorage.getItem('uname')
}else{
    dlyh=sessionStorage.getItem('uname')
}
console.log(sessionStorage.getItem('uname'))
if(!dlyh==''){
    let hyml=''
    hyml+=`
            <ul>
                <li>您好，欢迎来到京西！[<a href="user.html">${dlyh}</a>] [<a class='tc' href="index.html">退出</a>] </li>
                <li class="line">|</li>
                <li>我的订单</li>
                <li class="line">|</li>
                <li>客户服务</li>

            </ul>
    `
    $('.topnav_right').html(hyml)
    $('.topnav_right').on('click','.tc',function(e){
        let eObj=e||window.event
        eObj.preventDefault()
        if(ccff=='checked'){
            dlyh=localStorage.setItem('uname','')
        }else{
            dlyh=sessionStorage.setItem('uname','')
        }
        
        console.log(localStorage.getItem('uname'))
        location.href='./index.html'
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