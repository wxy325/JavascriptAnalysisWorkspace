/**
 * Created by wxy325 on 17/4/4.
 */

var async = require('async'),
    cheerio = require('cheerio'),
    request = require('request'),
    path = require('path'),
    util = require('util'),
    fs = require('fs');

var i = 2;
// var e = util.format('%d', i);


var RequestHelper = require('./RequestHelper');
var URL = require('url'), urlJoin = require('url-join');

var MAX_SITES_NUMBER = 4000;
var outputPathBase = '/Users/wxy325/Desktop/scraw-output/';

var siteIndex = 0;
var crawledSiteList = [];

function buildFullUrl(baseUrl, srcAddress) {
    var urlObj = URL.parse(baseUrl);
    if (!srcAddress.startsWith('http') && !srcAddress.startsWith('//')) {
        if (srcAddress.startsWith('/')) {
            var newAddr = urlJoin(urlObj.protocol + '//' + urlObj.hostname, srcAddress);
            return newAddr;
        } else {
            return srcAddress;
        }
    } else {
        return srcAddress;
    }
}

function crawlUrl(url, subpageDeep, outterCallback) {
    if (crawledSiteList.indexOf(url) !== -1 || url.startsWith('#') || url.startsWith('javascript')) {
        outterCallback();
        return;
    }
    var urlObj = new URL.parse(url);
    if (!urlObj) {
        outterCallback();
        return;
    }
    console.log(siteIndex + ':' + url);
    var currentUrlIndex = siteIndex;
    crawledSiteList[siteIndex] = url;
    siteIndex++;
    // var url = 'https://en.wikipedia.org/wiki/The_Heart_of_a_Woman';

    async.waterfall([
        function (callback) {

            if (crawledSiteList.length > MAX_SITES_NUMBER) {
                callback('finish');
                return;
            }
            RequestHelper.request({
                method: 'get',
                url: url
            }, callback);
        }, function (body, callback) {

            if (crawledSiteList.length > MAX_SITES_NUMBER) {
                callback();
                return;
            }

            var dom$ = null;
            try{
                dom$ = cheerio.load(body);
            } catch (e) {
                callback('error');
                return;
            }

            var scriptsTags = dom$('script');

            scriptsTags.each(function () {
                var t = cheerio(this);
                if (t.attr('src')) {
                    var srcAddress = t.attr('src');
                    t.attr('src', buildFullUrl(url, srcAddress));
                }
            });
            var linkTags = dom$('link');
            linkTags.each(function () {
                var t = cheerio(this);
                if (t.attr('href')) {
                    var srcAddress = t.attr('href');
                    t.attr('href', buildFullUrl(url, srcAddress));
                }
            });

            var e = null;
            try {
                e = dom$.html();
            } catch (ee) {
                callback('error');
                return;
            }

            var outputFileName = String('0000' + currentUrlIndex).slice(-4) + '.html';
            var outputFileFullPath = path.join(outputPathBase, outputFileName);
            fs.writeFileSync(outputFileFullPath, e);
            // can be modified

            if (subpageDeep > 0) {
                var aTags = dom$('a');
                var crawSubPageTasks = [];
                aTags.each(function () {
                    var t = cheerio(this);
                    if (t.attr('href')) {
                        var srcAddress = t.attr('href');
                        var newAddress = buildFullUrl(url, srcAddress);
                        var createSubTask = function (u) {
                            return function (innerCallback) {
                                crawlUrl(u, subpageDeep - 1, innerCallback);
                            }
                        };
                        crawSubPageTasks.push(createSubTask(newAddress));
                    }
                });

                async.waterfall(crawSubPageTasks, callback);
            } else {
                callback();
            }
        }, function (callback) {

            if (crawledSiteList.length > MAX_SITES_NUMBER) {
                callback();
                return;
            }

            callback();
        }
    ], outterCallback);
};


function crawlCountryList(callback) {
    var countryListUrl = 'http://www.alexa.com/topsites/countries';
    async.waterfall([
        function (callback) {
            RequestHelper.request({
                method: 'get',
                url : countryListUrl
            }, callback);
        }, function (body, callback) {
            var dom$ = cheerio.load(body);
            var countriesTags = dom$('.tableContainer a');
            var retArray = [];
            countriesTags.each(function () {
                var t = cheerio(this);
                var countryName = t.text();
                var countryUrl = t.attr('href');
                var countryFullUrl = 'http://www.alexa.com' + countryUrl;
                retArray.push({
                    name : countryName,
                    url : countryFullUrl
                });
            });
            callback(null, retArray);
        }
    ], callback);
}

function fetchCountryHotSiteList(countryUrl, callback) {
    async.waterfall([
        function (callback) {
            RequestHelper.request({
                method: 'get',
                url : countryUrl
            }, callback)
        }, function (body, callback) {
            var dom$ = cheerio.load(body);
            var tags = dom$('.site-listing .DescriptionCell a');
            var retList = [];
            tags.each(function () {
                var t = cheerio(this);
                var href = t.attr('href');
                var text = t.text();
                if (href && href.length && text && text.length) {
                    retList.push('http://' + text);
                }
            });
            callback(null, retList);
        }
    ], callback);
};

function startScrawl(callback) {
    async.waterfall([
        function (callback) {
            crawlCountryList(callback);
        }, function (countryList, callback) {
            var tasks = countryList.map(function (countryInfo) {

                return function (innercallback) {
                    if (crawledSiteList.length > MAX_SITES_NUMBER) {
                        innercallback();
                        return;
                    }

                    var countryUrl = countryInfo.url;
                    async.waterfall([
                        function (callback) {
                            fetchCountryHotSiteList(countryUrl, callback);
                        }, function (countryHotsites, callback) {
                            var filteredCountryHotsites = countryHotsites.filter(function (c) {
                                return crawledSiteList.indexOf(c) === -1;
                            });

                            var fetchTasks = filteredCountryHotsites.map(function (url) {
                                return function (callback) {
                                    if (crawledSiteList.length > MAX_SITES_NUMBER) {
                                        callback();
                                        return;
                                    }

                                    crawlUrl(url, 1, function (err) {
                                        callback();
                                    });
                                };
                            });
                            async.parallelLimit(fetchTasks, 10, callback);
                        }], innercallback);
                };
            });
            async.parallelLimit(tasks, 10, callback);
        }
    ], function (err) {

        var outputFileName = 'siteList.txt'
        var outputFileFullPath = path.join(outputPathBase, outputFileName);
        fs.writeFile(outputFileFullPath, JSON.stringify(crawledSiteList), callback);
    });
}


startScrawl();