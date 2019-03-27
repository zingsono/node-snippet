var consul = require('consul')({host:'10.160.1.11', port:'8500', promisify :true})

/**
 * Registers a new check.
 */
/*consul.agent.check.register({
    name:'snippet',
    id:'127_0_0_1:8900',
    tags:['node'],
    address:'10.160.1.245',
    port:'10500',
    ttl:'15s',
    notes:'This is an example check.'
}, function (err) {
    console.log(err)
})*/

/*
 * KV
 * */
//consul.kv.set({key:'kkkk', value:'vvvvvvvvvvvvvvvvvvvv'})

//{id='orgacc-10-160-1-245-39805-2', name='orgacc', tags=[secure=false], address='10.160.1.245', meta=null, port=39805, enableTagOverride=null,
// check=Check{script='null', interval='10s', ttl='null', http='http://10.160.1.245:39805/actuator/health', method='null', header={}, tcp='null',
// timeout='null', deregisterCriticalServiceAfter='null', tlsSkipVerify=null, status='null'}, checks=null}
consul.agent.service.register({
    id:'micro-ulmp-10-161',
    name:'micro-ulmp',
    tags:['micro'],
    address:'10.160.1.245',
    port: 39805,
    check: {
        interval:'10s',
        http:'http://10.160.1.245:39805/actuator/health'
    }
}).then((data)=>{
    console.log('micro-ulmp : ', data)
}).catch((err)=>{
    console.error(err)
})


/*
name: string;
id?: string;
serviceid?: string;
http?: string;
script?: string;
interval?: string;
ttl?: string;
notes?: string;
status?: string;
*/
//consul.agent.check.register({})


