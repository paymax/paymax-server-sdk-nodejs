var Conf=require('./conf');
var HttpsHelper=require('./httpsHelper');
var HeaderHelper=require('./headerHelper');

/**
 * 下单接口
 * @param data
 * @param fn
 */
function createCharge(data,fn){
    var path=Conf.BASE_PATH+'charges';
    data=JSON.stringify(data);
    var header=HeaderHelper.getHeader('post',path,'',data);
    HttpsHelper.post(header ,path,'',data,fn);
};
/**
 * 下单查询接口
 * @param orderNo
 * @param fn
 */
function queryCharge(orderNo,fn){
    var path=Conf.BASE_PATH+'charges/'+orderNo;
    var header=HeaderHelper.getHeader('get',path,'','');
    HttpsHelper.get(header ,path,'',fn);
}

module.exports.createCharge=createCharge;
module.exports.queryCharge=queryCharge;