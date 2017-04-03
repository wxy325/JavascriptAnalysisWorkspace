
	var a = 
"\
function bb() {}\
function aa() {\
	console.log('test aa');\
	bb();\
}\
a = {};\
a['ee'] = 'a';\
\
aa();\
";
eval(a);
