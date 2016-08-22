var Crypto = require('crypto');
var Conf = require('./conf');

/**
 * 请求体签名方法
 * @param method
 * @param header
 * @param path
 * @param query_string
 * @param request_data
 */
var sign = function (method,header,path,query_string,request_data) {
	var path=path.replace("/merchant-api","");
    var message = method+"\n" +path+ "\n" + query_string + "\n"+header.nonce+"\n"+header.timestamp+"\n" + header.Authorization+"\n" + request_data;
    var sign = signByRSA(message);
	
    return sign;
}

/**
 * 响应体验签方法
 * @param header
 * @param response_data
 */
var responseSignVerify = function (header,response_data) {

	var message = header.nonce+"\n"+header.timestamp+"\n" + header.authorization+"\n" + response_data;
	return verify(message, header.sign);
}

var signByRSA = function (message) {
	
	var data=new Buffer(message);
    var signer =  Crypto.createSign('RSA-SHA1').update(data);
    var res= signer.sign( Conf.privateKey,'base64');
   
   return res;
}
var verify=function(data,sig){

	var data=new Buffer(data);
	var verifyer = Crypto.createVerify('RSA-SHA1');
	verifyer.update(data);
	var result = verifyer.verify(Conf.paymaxPublicKey, sig, 'base64');
	return result;
}
module.exports.sign=sign;
exports.signByRSA=signByRSA;
exports.verify=verify;
exports.responseSignVerify=responseSignVerify;