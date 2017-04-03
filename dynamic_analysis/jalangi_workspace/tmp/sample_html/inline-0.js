J$.iids = {"9":[3,1,13,2],"17":[3,1,13,2],"25":[3,1,13,2],"33":[14,6,14,7],"41":[14,6,14,7],"49":[14,1,14,9],"57":[1,1,15,1],"65":[1,1,15,1],"73":[1,1,15,1],"81":[1,1,15,1],"nBranches":0,"originalCodeFileName":"inline-0_orig_.js","instrumentedCodeFileName":"inline-0.js","code":"\n\tvar a = \n\"\\\nfunction bb() {}\\\nfunction aa() {\\\n\tconsole.log('test aa');\\\n\tbb();\\\n}\\\na = {};\\\na['ee'] = 'a';\\\n\\\naa();\\\n\";\neval(a);\n"};
jalangiLabel0:
    while (true) {
        try {
            J$.Se(57, 'inline-0.js', 'inline-0_orig_.js');
            J$.N(65, 'a', a, 0);
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
