var https = require('https')
    , url = require('url');
var Conf=require('./conf');
var Sign=require('./sign');

var VALID_RESPONSE_TTL=2*60*1000;//合法响应时间:2分钟内

var httpsHelper = {
    post: function (header, path, query, postData, onEnd) {
        var options = {
            hostname: Conf.API_HOST,
            path:path,
			port:Conf.PORT,
            method: 'POST',
            headers: {
                'Content-Type': "application/json;charset=utf-8",
                'content-length': postData ? Buffer.byteLength(postData) : 0,
                'Authorization': header.Authorization,
                'nonce':header.nonce,
                'timestamp':header.timestamp,
                'sign':header.sign,
				'X-Paymax-Client-User-Agent':JSON.stringify(header.UA)
            }
        };
        var revData = '';
        var req = https.request(options,function (res) {

            res.on('data', function (d) {
                revData += d.toString('utf-8');
            })
                .on('end', function () {

                    var err=null;
                    if(res.statusCode == 200){
                        var  isVerify = Sign.responseSignVerify(res.headers,revData);

                        if(!isVerify){
                            err= new Error('{"failure_code":"SIGN_CHECK_FAILED","failure_msg":"SIGN_CHECK_FAILED"}');
                        }
                        if(VALID_RESPONSE_TTL+res.headers.timestamp<new Date().getTime()){
                            err=  new Error('{"failure_code":"ORDER_TIMEOUT","failure_msg":"ORDER_TIMEOUT"}');
                        }
                        onEnd(err, revData);
                    }else{
                        err=  new Error(revData);
                        onEnd(err, revData);
                    }
                });
        }).on('error', function (e) {
                onEnd(new Error('{"failure_code":"SYSTEM_ERROR","failure_msg":"SYSTEM_ERROR"}'), null);
            });

        if (postData) {
            req.end(new Buffer(postData));
        } else {
            req.end();
        }
    },
    get: function (header, path, query, onEnd) {
        var options = {
            hostname: Conf.API_HOST,
			port:Conf.PORT,
            path: url.format({pathname: path, query: query}),
            method: 'GET',
        headers: {
            'Content-Type': "application/json;charset=utf-8",
            'content-length':  0,
            'Authorization': header.Authorization,
            'nonce':header.nonce,
            'timestamp':header.timestamp,
            'sign':header.sign,
			'X-Paymax-Client-User-Agent':JSON.stringify(header.UA)
        }
        };
        var revData = '';
        var req = https.request(options,function (res) {
            res.on('data', function (d) {
                revData += d.toString('utf-8');
            })
                .on('end', function () {

                    var err=null;
                    if(res.statusCode==200){
                        var  isVerify = Sign.responseSignVerify(res.headers,revData);

                        if(!isVerify){
                            err= new Error('{"failure_code":"SIGN_CHECK_FAILED","failure_msg":"SIGN_CHECK_FAILED"}');
                        }
                        if(VALID_RESPONSE_TTL+res.headers.timestamp<new Date().getTime()){
                            err=  new Error('{"failure_code":"ORDER_TIMEOUT","failure_msg":"ORDER_TIMEOUT"}');
                        }
                        onEnd(err, revData);
                    }else{
                        err=  new Error(revData);
                        onEnd(err, revData);
                    }
                });
        }).on('error', function (e) {
            onEnd(new Error('{"failure_code":"SYSTEM_ERROR","failure_msg":"SYSTEM_ERROR"}'), null);
            });

        req.end();
    }
};

module.exports = httpsHelper;