
var request = require('request');
var async = require('async');
var Iconv = require('iconv-lite');

request = request.defaults({jar: true});

var RequestHelper = {};

var needProxy = false;
/**
 *
 * @param options
 *          method: get, post
 *          url
 *          params,
 *          decode
 * @param callback
 */
RequestHelper.request = function (options, callback) {
    var decode = options.decode || 'gbk';
    var method = options.method || "";
    method = method.toLowerCase();
    var url = options.url || "";
    //TODO Handle Params
    var params = options.params || {};

    var requestOption = {
        'url' : url
        // 'encoding' : 'binary'
    };
    if (needProxy) {
        requestOption.proxy = 'http://proxy.wdf.sap.corp:8080';
    }

    async.waterfall([
        function (callback) {
            if (method === 'post') {
                //Post
                requestOption.form = params;
                if (options.headers) {
                    requestOption.headers = options.headers;
                }
                request.post(requestOption, callback);
            } else {
                //Get
                if (options.headers) {
                    requestOption.headers = options.headers;
                }
                request.get(requestOption, callback);
            }

        }, function (response, body, callback) {
            // var encoding = response.headers['transfer-encoding'];
          //  JSON.stringify(response);
          //   var b = Iconv.decode(new Buffer(body, encoding || 'binary'), decode);
            callback(null, body);
        }
    ], callback);
};

module.exports = RequestHelper;