pagessize=3
	totalspage=Math.ceil(localStorage.getItem('zys')/pagessize)
	pagesno=Math.floor(Math.random()*(totalspage-1+1)+1)
	$.get('/api/v1/goods/index.jsp',{pageno:pagesno,pagesize:pagessize},res=>{
		let hnml=''
		$.each(res.data.list,(index,item)=>{
			hnml+=`
						<li>
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
								<dl>
									<dt><a href=""><img src="http://tmp00001.zhaodashen.cn/${item.goods_img}" alt="" /></a></dt>
									<dd><a href="">${item.goods_name}</a></dd>
								</dl>
					`)
				}
			}
		})
	},'json')