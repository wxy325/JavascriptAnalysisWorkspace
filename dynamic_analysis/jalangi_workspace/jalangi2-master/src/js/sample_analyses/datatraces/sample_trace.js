var a = 
"\
function bb() {}\
function aa() {\
	console.log('test aa');\
	bb();\
}\
\
aa();\
";
eval(a);
