console.log('Init jobs/alimama.js')

$(function () {
    if(location.href.indexOf('/promo/self/shops')){
        console.log($('.img').length)
        $('.img').each(function (i) {
            let title = $($('.attr .title a')[i]).text() //店铺名称
            let promo = $($('.color-blue')[i]).attr('href')
            let tbUrl = $($('.img')[i]).attr('href') //淘宝URL
            let name = $($('.color-grey')[i]).text() //掌柜
            let shop = {
                user_number_id:promo.match(/userNumberId=\d+/)[0].match(/\d+/)[0],
                minLogo : $($('.img')[i]).children('img').attr('src'),
                title: title,
                name : name,
                tbUrl: tbUrl,
                rate:$($('.color-green')[i]).text()
            }
            console.log(i+'>>='+JSON.stringify(shop))
            window.http.post({db:'tbk', c:'tmall', m:'updateOne', params:[{user_number_id:shop.user_number_id},{$set:shop},{upsert:true}]}, function (data) {
                console.log(`user_number_id=${shop.user_number_id} data=`,data)
            })
        })
    }

})