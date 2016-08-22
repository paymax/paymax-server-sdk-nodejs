var Conf=require('./conf');
var HttpsHelper=require('./httpsHelper');
var HeaderHelper=require('./headerHelper');

/**
 * 退款接口
 * @param chargeNo
 * @param data
 * @param fn
 */
function createRefund(chargeNo,data,fn){
        var path=Conf.BASE_PATH+'charges/'+chargeNo+'/refunds';
        data=JSON.stringify(data);
        var header=HeaderHelper.getHeader('post',path,'',data);
        HttpsHelper.post(header ,path,'',data,fn);
    };
/**
 * 退款查询
  * @param data
 * @param fn
 */
function queryRefund(data,fn){
        var path=Conf.BASE_PATH+'charges/'+data.chargeNo+'/refunds/'+data.refundNo;
        var header=HeaderHelper.getHeader('get',path,'','');
        HttpsHelper.get(header ,path,'',fn);
    };

module.exports.createRefund=createRefund;
module.exports.queryRefund=queryRefund;
