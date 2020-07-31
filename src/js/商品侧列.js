    let img = Math.floor(Math.random() * (10-1+1)+1)
	$('.newgoods .leftbar_wrap ul').html(`<img src="../images/loading${img}.gif" style="height:150px;width:150px" />`)
	pagessize=3
	totalspage=Math.ceil(localStorage.getItem('zys')/pagessize)
	pagesno=Math.floor(Math.random()*(totalspage-1+1)+1)
	$.get('/api/v1/goods/index.jsp',{pageno:pagesno,pagesize:pagessize},res=>{
		let hnml=''
		$.each(res.data.list,(index,item)=>{
			hnml+=`
						<li name='${item.goods_id}'>
							<dl>
								<dt><a href=""><img src="http://tmp00001.zhaodashen.cn/${item.goods_img}" alt="" /></a></dt>
								<dd><a href="">${item.goods_name}</a></dd>
								<dd><strong>￥${item.shop_price}</strong></dd>
							</dl>
						</li>
			`
			console.log(item.goods_id)
			console.log(localStorage.getItem('goodsId'))
		})
		$('.newgoods .leftbar_wrap ul').html(hnml)
	},'json')
	$.get('/api/v1/goods/index.jsp',{pageno:1,pagesize:localStorage.getItem('zys')},res=>{
		$.each(res.data.list,(index,item)=>{
			if(item.goods_id==localStorage.getItem('goodsId')){
				if(localStorage.getItem('goodsId')!=''){
					$('.viewd .leftbar_wrap').html(`
								<dl name='${item.goods_id}'>
									<dt><a href=""><img src="http://tmp00001.zhaodashen.cn/${item.goods_img}" alt="" /></a></dt>
									<dd><a href="">${item.goods_name}</a></dd>
								</dl>
					`)
				}
			}
		})
	},'json')
	$('.newgoods .leftbar_wrap ul').on('click','li',function(){
		localStorage.setItem('goodsId',$(this).attr('name'))
		window.location.href='./goods.html'
	})
	$('.viewd .leftbar_wrap').on('click','dl',function(){
		localStorage.setItem('goodsId',$(this).attr('name'))
		window.location.href='./goods.html'
	})