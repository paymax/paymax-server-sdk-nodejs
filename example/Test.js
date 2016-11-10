var Paymax=require("paymax");

Paymax.conf.setSecretKey('55970fdbbf10459f966a8e276afa86fa');
Paymax.conf.setPaymaxPublicKeyPath('paymax_rsa_public_key.pem');
Paymax.conf.setPrivateKeyPath('rsa_private_key.pem');

getResult = function (e, data) {
    //先判断是否有异常
    if(e!=null){
        var err= JSON.parse(e.message);
        console.log("exception_code===" +err.failure_code);
        console.log("exception_message===" +err.failure_msg);
        return;
    }
        console.log("data===" + data);

}
function generateRandomAlphaNum(len) {
        var rdmString = "";
        for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
        return "ch_"+rdmString.substr(0, len-2);
};
/**
 下单
 */
 /*Paymax.charge.createCharge(
    {
        amount: '0.01',
        subject: 'test_subject_nodejs版本',
        body: 'this is a body',
        order_no: generateRandomAlphaNum(20),
        channel: 'alipay_app',
        client_ip: '127.0.0.1',
        app: 'app_7hqF2S6GYXET457i',
        currency: 'cny',
        extra: {},
        description: 'this is a description描述',
    }, getResult
);*/
/**
 订单查询
 */

//Paymax.charge.queryCharge('ch_bd88045a391aade151476221',getResult);
/**
 退款
 */

 /*Paymax.refund.createRefund(
         'ch_638b56095fa7b9cf9b60b9d3',
         {
         'amount':'1',
         'description':'this is a description',
         'extra':{'extra_key1':'extra_key1',
                    'extra_key2':'extra_key2'
                }
         },
         getResult
 );*/
/**
 退款查询
 */
/*Paymax.refund.queryRefund(
         {
         'chargeNo':'ch_a59123a1538074f3cfa6568b',
         'refundNo':'re_d6586ff6e077b95985344538'
         }
        ,getResult
 );*/
/**
 人脸识别--查询用户识别信息
 */
 //Paymax.face.queryFaceAuth('123',getResult);