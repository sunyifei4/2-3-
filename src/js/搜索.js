$('.search_form .btn').click(function(events){
    events.preventDefault()
    if($(this).prev().val()!=''){
        location.href='./list.html'
        localStorage.setItem('ssnr',$(this).prev().val())
    }
})