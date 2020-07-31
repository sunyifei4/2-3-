let token = localStorage.getItem('token')
	if (!token) {
		alert('请登录，跳转中...')
		location.href = 'login.html'
		return
	}