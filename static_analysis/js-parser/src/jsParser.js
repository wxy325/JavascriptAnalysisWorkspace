/**
 * Created by wxy325 on 17/4/3.
 */
var esprima = require('esprima');

var sampleCode = "\
function forTest(a) {\
    if (a) {\
        console.log('eee');\
    } else {\
        console.log('bbb');\
    }\
}\
";


var tokenizeResult = esprima.tokenize(sampleCode);
var parserResult = esprima.parse(sampleCode);

console.log(tokenizeResult);
console.log('-------');
console.log(parserResult);