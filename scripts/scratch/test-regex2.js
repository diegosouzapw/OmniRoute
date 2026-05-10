const text = "hello\n  world";
const re1 = /(^|[.!?][ \t]+|\n+[ \t]*)([a-z])/g;
const re3 = /(^|[.!?]\s+|^\s+)([a-z])/gm;
console.log(text.replace(re1, (m, p, c) => p + c.toUpperCase()));
console.log(text.replace(re3, (m, p, c) => p + c.toUpperCase()));
