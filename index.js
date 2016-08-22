
var libpath = './paymax';

module.exports = {
    conf:     	    require(libpath + '/conf.js'),
  httpsHelper:     	require(libpath + '/httpsHelper.js'),
  sign:    	        require(libpath + '/sign.js'),
  headerHelper:    	require(libpath + '/headerHelper.js'),
  charge:    	    require(libpath + '/charge.js'),
  refund:    	    require(libpath + '/refund.js')
};
