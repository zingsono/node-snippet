
window.log = (msg)=>{
    let div = document.createElement('div')
    div.innerHTML = msg
    let divConsole = document.getElementById('divConsole')
    if(divConsole){
        divConsole.appendChild(div)
    }else{
        let divObj=document.createElement('div')
        divObj.setAttribute('id', 'divConsole')
        divObj.style.height = '500px'
        divObj.style.overflowY = 'scroll'
        let first=document.body.firstChild
        document.body.insertBefore(divObj, first)
        window.log(msg)
    }
}

window.http = {
    post:(mql, sucess)=>{
        $.ajax({
            type: 'POST',
            url:'http://localhost:29001/mql',
            data: 'mql='+encodeURIComponent(JSON.stringify(mql)),
            cache: false,
            async: false,
            success: function(data){
                sucess?sucess(data):null
            }
        })
    }
}

window.log('**************************************************************************************');

(()=>{
    window.log('extensions script e.js ')

    const addScript = function (src, callback) {
        let script = document.createElement('script')
        script.src = src
        script.charset='utf-8'
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete' ) {
                window.log(`LoadScript  ${src}`)
                callback?callback():null
                script.onload = script.onreadystatechange = null
            }
        }
        document.getElementsByTagName('body')[0].appendChild(script)
    }
    const HOST_ADDR = 'http://localhost:50010'

    // jQuery
    addScript('https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js', function () {

        // Job *.taobao.com
        location.href.indexOf('taobao.com')>-1?addScript(`${HOST_ADDR}/jobs/taobao.js?t=${Math.random()}`):''

        location.href.indexOf('tmall.com')>-1?addScript(`${HOST_ADDR}/jobs/tmall.js?t=${Math.random()}`):''
    })

})()