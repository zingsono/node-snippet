console.log('Init jobs/alimama.js')


$(function () {
    //店铺推广
    if(location.href.indexOf('/promo/self/shops')>0){
        console.log('>淘宝联盟店铺推广页面')
        function tmall(s){
            try {
                let d = {
                    tuid: s.match(/(userNumberId=)(\d+)/)[2],
                    logo: s.match(/(src=")(.+)(" onerror)/)[2],
                    shopName: s.match(/(title=")(.+)(class="color-grey")/)[2].match(/(.+)(" target|" data)/)[1],
                    shopkeeper: s.match(/(掌柜：)(.+)(<\/span> <\/li>)/)[2],
                    originalLine: s.match(/(<li class="title">    <a href=")(.+)(" title=")/)[2],
                    rate: s.match(/(<span class="color-green">)(.+)(%<\/span><\/td>)/)[2],
                    gTotal: s.match(/(width="70").+(width="90")/)[0].match(/(>)(\d+)/)[2],
                    promo: s.match(/(width="90").+(件<\/td>)/)[0].match(/(>)(\d+)/)[2],
                    keys: [$('#q').val()]
                }
                console.log(JSON.stringify(d))
                window.http.post({db:'tbk', c:'tmall', m:'updateOne', params:[{tuid:d.tuid},{$set:d},{upsert:true}]}, function (data) {
                    console.log(`tuid=${d.tuid} data=`,data)
                })
            } catch (e) {
                console.error(`tmall error s =${s}`)
            }
        }
        function next(){
            setTimeout(()=>{
                next()
            },15*1000)
            window.scrollTo(0, document.body.scrollHeight)
            //获取行数据集合
            console.log(`$('.table-container table tbody tr')=${$('.table-container table tbody tr').length}`)
            $('.table-container table tbody tr').each((i)=>{
                let tr = $($('.table-container table tbody tr')[i]).html();
                //console.log(tr)
                tmall(tr)
            })
            //点击下一页
            setTimeout(()=>{
                $('.btn-jump')[0].click()
            },5*1000)
        }
        next()

        //使用定时器，30秒刷新一次页面
        setTimeout(()=>{
            location.href = location.href
        },33*1000)

    }
})