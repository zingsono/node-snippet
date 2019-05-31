console.log('Init jobs/tmall.js')
/**
 * 采集天猫旗舰店信息
 */
$(function () {

    //控制每个页面工作内容

    //1. 首页，搜索框填入关键词，点击搜索按钮
    if(location.href.startsWith('https://www.tmall.com')&&$('input[name="q"]')){
        window.log('> 天猫首页')
        $('input[name="q"]').focus()
        setTimeout(()=>{
            //输入框填入关键词
            $('input[name="q"]').val('鞋旗舰店')
            //3秒后点击按钮
            setTimeout(()=>{
                window.log('> 点击搜索按钮')
                $('.mallSearch-form .mallSearch-input button[type="submit"]').click()
            }, 3000)
        }, 2000)
    }

    //2.搜结果，门店列表页
    if(location.href.startsWith('https://list.tmall.com/search_product.htm')&&$('#J_ItemList')){
        setTimeout(()=>{
            window.log('> 天猫搜索结果页')
            $('.sHe-shop').attr('target', '_blank')
            $('.shopBox').each(function (i) {
                let store = $($('.sHe-shop')[i]).attr('href')
                let shop = {
                    user_number_id:store.match(/user_number_id=\d+/)[0].match(/\d+/)[0],
                    minLogo : $($('.shopHeader-logo img')[i]).attr('src'),
                    name : $('.sHi-title')[i].innerText,
                    toStore : store
                }
                window.log(i+'>>='+JSON.stringify(shop))
                window.http.post({db:'tbk', c:'tmall', m:'updateOne', params:[{user_number_id:shop.user_number_id},{$set:shop},{upsert:true}]}, function (data) {
                    console.log(`user_number_id=${shop.user_number_id} data=`,data)
                })
            })

            //滚动到页底，等3秒点击下一页
            setTimeout(()=>{
                window.scrollTo(0, document.body.scrollHeight)
                setTimeout(()=>{
                    $('.ui-page-next')[0].click()
                }, 5*1000)
            }, 15*1000)

        }, 10*1000)
    }
})