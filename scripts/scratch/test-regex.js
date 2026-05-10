const text = "hello world. this is a test\n\nnew line.  another.";
const re1 = /(^|[.!?][ \t]+|\n+[ \t]*)([a-z])/g;
const re2 = /(^|[.!?]\s+)([a-z])/gm;
console.log(text.replace(re1, (m, p, c) => p + c.toUpperCase()));
console.log(text.replace(re2, (m, p, c) => p + c.toUpperCase()));
