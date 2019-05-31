console.log(`job:e.js`)

let cView = ()=>{
    return `
        <style>
        .consoleView{ margin: 15px auto; width:80%; background-color: #0a001f;color: #ffffff;z-index: 99999 }
        </style>
        <div class="consoleView" id="consoleView"></div>
    `

}

window.log = (msg)=>{
    console.log(`log>${msg}`)
    /*if(typeof $ != 'undefined'){
        if(!$('#consoleView')){
             $('body').append(cView())
        }
        $('#consoleView').append(`<p>${msg}</p>`)
    }*/
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

    //已经存在jquery的直接使用，不存在的添加
    addScript('https://cdn.bootcss.com/jquery/3.4.1/jquery.js', function () {
        task()
    })
})()