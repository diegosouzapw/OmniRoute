console.log("Checking Next.js version");
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const nextPkg = require("next/package.json");
console.log(nextPkg.version);
