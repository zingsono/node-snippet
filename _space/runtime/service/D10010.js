/**
 *
 */

module.exports = function (ctx) {
    let orcl = ctx.require('lib/oracle')

    return {
        doc:{
            title:'接口标题',
            description:'简介',
            reqParams:{
                age:{value:'', type:'', len:'', valid:function () {

                }}
            },
            resParams:{

            },
            errCode:{

            }
        },
        apply(args){

            return this.doc
        }
    }
}
