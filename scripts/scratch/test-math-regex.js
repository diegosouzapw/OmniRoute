const re = /\$\$[^$]*(?:\$(?!\$)[^$]*)*\$\$/g;
const txt = "some text $$ a + b = c $$ more text $$ x + $y$ = z $$ end";
console.log(txt.match(re));
