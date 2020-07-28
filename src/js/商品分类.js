//一。商品分类
$.get('/api/v1/category/index.jsp',{},res=>{
    console.log(res)
    let html=''
    $.each(res.data,(index,oneItem)=>{
        html+=`
        <div class="cat item1">
                <h3><a href="">${oneItem.cat_name}</a> <b></b></h3>
                <div class="cat_detail">`
                    $.each(oneItem.children,(index,twoItem)=>{
                        html+=`
                        <dl class="dl_1st">
                            <dt><a href="">${twoItem.cat_name}</a></dt>
                            <dd>`
                                $.each(twoItem.children,(index,threeItem)=>{
                                    html+=`<a href="">${threeItem.cat_name}</a>`
                                })				
                            html+=`</dd>
                        </dl>`
                    })
                html+=`</div>
            </div>`
    })
    $('.cat_bd').html(html)
},'json')