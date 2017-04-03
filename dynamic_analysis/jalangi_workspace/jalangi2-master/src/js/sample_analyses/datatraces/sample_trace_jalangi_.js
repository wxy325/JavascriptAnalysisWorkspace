J$.iids = {"9":[2,1,10,2],"17":[2,1,10,2],"25":[2,1,10,2],"33":[11,6,11,7],"41":[11,6,11,7],"49":[11,1,11,9],"57":[1,1,12,1],"65":[1,1,12,1],"73":[1,1,12,1],"81":[1,1,12,1],"nBranches":0,"originalCodeFileName":"/Users/wxy325/Desktop/jalangi_workspace/jalangi2-master/src/js/sample_analyses/datatraces/sample_trace.js","instrumentedCodeFileName":"/Users/wxy325/Desktop/jalangi_workspace/jalangi2-master/src/js/sample_analyses/datatraces/sample_trace_jalangi_.js","code":"var a = \n\"\\\nfunction bb() {}\\\nfunction aa() {\\\n\tconsole.log('test aa');\\\n\tbb();\\\n}\\\n\\\naa();\\\n\";\neval(a);\n"};
jalangiLabel0:
    while (true) {
        try {
            J$.Se(57, '/Users/wxy325/Desktop/jalangi_workspace/jalangi2-master/src/js/sample_analyses/datatraces/sample_trace_jalangi_.js', '/Users/wxy325/Desktop/jalangi_workspace/jalangi2-master/src/js/sample_analyses/datatraces/sample_trace.js');
            J$.N(65, 'a', a, 0);
            var a = J$.X1(25, J$.W(17, 'a', J$.T(9, "\
function bb() {}\
function aa() {\
	console.log('test aa');\
	bb();\
}\
\
aa();\
", 21, false), a, 3));
            J$.X1(49, eval(J$.instrumentEvalCode(J$.R(33, 'a', a, 1), 41, true)));
        } catch (J$e) {
            J$.Ex(73, J$e);
        } finally {
            if (J$.Sr(81)) {
                J$.L();
                continue jalangiLabel0;
            } else {
                J$.L();
                break jalangiLabel0;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
