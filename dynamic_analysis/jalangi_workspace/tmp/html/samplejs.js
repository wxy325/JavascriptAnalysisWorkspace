J$.iids = {"9":[2,1,12,2],"17":[2,1,12,2],"25":[2,1,12,2],"33":[13,6,13,7],"41":[13,6,13,7],"49":[13,1,13,9],"57":[15,1,15,2],"65":[15,3,15,10],"73":[15,1,15,11],"81":[15,17,15,22],"89":[15,1,15,23],"91":[15,1,15,16],"97":[15,1,15,24],"105":[1,1,15,24],"113":[1,1,15,24],"121":[1,1,15,24],"129":[1,1,15,24],"nBranches":0,"originalCodeFileName":"tmp/html/samplejs_orig_.js","instrumentedCodeFileName":"tmp/html/samplejs.js","code":"var a = \n\"\\\nfunction bb() {}\\\nfunction aa() {\\\n\tconsole.log('test aa');\\\n\tbb();\\\n}\\\na = {};\\\na['ee'] = 'a';\\\n\\\naa();\\\n\";\neval(a);\n\n$('.test').text('eee');"};
jalangiLabel0:
    while (true) {
        try {
            J$.Se(105, 'tmp/html/samplejs.js', 'tmp/html/samplejs_orig_.js');
            J$.N(113, 'a', a, 0);
            var a = J$.X1(25, J$.W(17, 'a', J$.T(9, "\
function bb() {}\
function aa() {\
	console.log('test aa');\
	bb();\
}\
a = {};\
a['ee'] = 'a';\
\
aa();\
", 21, false), a, 3));
            J$.X1(49, eval(J$.instrumentEvalCode(J$.R(33, 'a', a, 1), 41, true)));
            J$.X1(97, J$.M(89, J$.F(73, J$.R(57, '$', $, 2), 0)(J$.T(65, '.test', 21, false)), 'text', 0)(J$.T(81, 'eee', 21, false)));
        } catch (J$e) {
            J$.Ex(121, J$e);
        } finally {
            if (J$.Sr(129)) {
                J$.L();
                continue jalangiLabel0;
            } else {
                J$.L();
                break jalangiLabel0;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
