var os =require('os');
var fs=require('fs');

var conf={};

//生产环境地址
conf.API_HOST='www.paymax.cc';
conf.PORT='443';
//开发环境地址
//conf.API_HOST='172.30.21.20';
//conf.PORT='9001';

conf.BASE_PATH='/merchant-api/v1/';
conf.sdkVersion=require('../package.json').version;

//Paymax提供给商户的SecretKey，登录网站后查看，比如：'b3fc21858fa5424cafecd338252b155c'
conf.secretKey='';
conf.setSecretKey=function(secretKey){
	this.secretKey= secretKey;
};

conf.paymaxPublicKey='';
//Paymax提供给商户的公钥，登录网站后查看
conf.setPaymaxPublicKeyPath=function(path){
	this.paymaxPublicKey=fs.readFileSync(path);
};

conf.privateKey='';
//商户自己的私钥【公钥通过Paymax网站上传到Paymax，私钥设置到下面的变量中】
conf.setPrivateKeyPath=function(path){
	this.privateKey=fs.readFileSync(path);
};

conf.UA={
		'lang':'nodejs',
		'publisher':'Paymax',
		'sdk-version':conf.sdkVersion,
		'os.name':os.type(),
		'os.version':os.release(),
		'os.platform':os.platform(),
		'os.arch':os.arch(),
		'os.hostname':os.hostname()
	}
module.exports =conf;