var Conf=require('./conf');
var HttpsHelper=require('./httpsHelper');
var HeaderHelper=require('./headerHelper');

/**
 * 人脸识别接口--查询用户识别信息
 * @param userId
 * @param fn
 */
function queryFaceAuth(userId,fn){
    var path=Conf.BASE_PATH+'face/auth/'+userId;
    var header=HeaderHelper.getHeader('get',path,'','');
    HttpsHelper.get(header ,path,'',fn);
};

module.exports.queryFaceAuth=queryFaceAuth;