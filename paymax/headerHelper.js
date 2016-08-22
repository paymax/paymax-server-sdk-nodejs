var Sign=require('./sign');
var Conf = require('./conf');
/**
 * 封装request.header消息头
 * @param method
 * @param path
 * @param query
 * @param postData
 * @returns {{Authorization: string, nonce: string, timestamp: number, UA: *}}
 */
function getHeader(method,path,query,postData){
    var header={
        'Authorization':Conf.secretKey,
        'nonce':generateRandomAlphaNum(32),
        'timestamp':new Date().getTime(),
        'UA':Conf.UA
    };
    header['sign'] = Sign.sign(method,header,path,query,postData);
    return header;
}
/**
 * header-nonce生成器
 * @param len
 * @returns {string}
 */
function generateRandomAlphaNum(len) {
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
}
exports.getHeader=getHeader;
