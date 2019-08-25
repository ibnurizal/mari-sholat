'use strict';

module.exports.HtmlEntitiesEncodeHTML = function(str) {
    return str.replace(/[\u00A0-\u9999<>&](?!#)/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}
module.exports.HtmlEntitiesDecodeHTML = function(str){
    return str.replace(/&#([0-9]{1,3});/gi, function(match, num) {
        return String.fromCharCode(parseInt(num));
    });
}
