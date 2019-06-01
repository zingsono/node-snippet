console.log(`job:e.js`)

window.log = (msg)=>{
    console.log(`log>${msg}`)
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

    const addTask = (domain,job)=>{
        location.href.indexOf(domain)&&addScript(`${HOST_ADDR}/jobs/${job}.js?t=${Math.random()}`)
    }

    const task = ()=>{
        //addTask('tmall.com','tmall')
        addTask('pub.alimama.com/myunion.htm','alimama')
    }

    addScript('https://cdn.bootcss.com/jquery/3.4.1/jquery.js', function () {
        // 读取URL参数
        $.query = (name)=>{
            let r = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
            return decodeURI(r[2])||null;
        }
        $.getCookie = (name)=>{
            console.log('document.cookir=',document.cookie)
            let r = document.cookie.match(new RegExp("(^|; )"+name+"=([^;]*)(;|$)"))
            console.log('r=',r)
            return decodeURI(r[2])||null;
        }
        task()
    })
})()