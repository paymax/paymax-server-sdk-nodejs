Paymax node.js sdk
=================
****

### 简介

lib 文件夹下是 Node.js SDK 文件，  
example 文件夹里面是一个简单的接入示例，该示例仅供参考。

### 版本要求

nodejs 版本 v0.10.0 及以上

### 安装

```shell
npm install paymax
或者
下载源码后，在目录下运行 npm install
```
## 初始化配置

```javascript
var Paymax=require('paymax');
```

```
//Paymax提供给商户的SecretKey，登录网站后查看
Paymax.conf.setSecretKey('b3fc21858fa5424cafecd338252b155c');

//Paymax提供给商户的公钥，登录网站后查看（参考样例，严格按照pem格式保存）
Paymax.conf.setPaymaxPublicKeyPath('paymax_rsa_public_key.pem');

//商户自己的私钥【公钥通过Paymax网站上传到Paymax，私钥pem文件路径设置到下面的变量中】
Paymax.conf.setPrivateKeyPath('rsa_private_key.pem');
```
### 下单：

```javascript
Paymax.charge.createCharge(
    {
        amount: '0.01',
        subject: 'test_subject',
        body: 'this is a body',
        order_no: generateRandomAlphaNum(20),
        channel: 'alipay_app',
        client_ip: '127.0.0.1',
        app: 'app_06m9Q26zL61ee55a',
        currency: 'cny',
        extra: {},
        description: 'this is a description',
    }, getResult
)
```
### 订单查询

```javascript
Paymax.charge.queryCharge('ch_fbe2d2675043004b02303b6a',getResult);
```
### 退款

```javascript
Paymax.refund.createRefund(
        'ch_a59123a1538074f3cfa6568b',
         {
         'amount':'0.01',
         'description':'this is a description',
         'extra':{}
         },
         getResult
 );
```
### 退款查询

```javascript
Paymax.refund.queryRefund(
         {
         'chargeNo':'ch_a59123a1538074f3cfa6568b',
         'refundNo':'re_d6586ff6e077b95985344538'
         }
        ,getResult
 );
 ```

### 详细信息请参考 [API 文档](https://github.com/paymax/paymax-doc)。
