import { mkdir, cp, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { root } from './serve.mjs';

// This fixed output is generated from an explicit public-file allowlist.
const out = path.join(root, 'dist');
if (path.dirname(out) !== root || path.basename(out) !== 'dist') throw new Error('Invalid output path');
await rm(out, { recursive:true, force:true });
await mkdir(out, { recursive:true });
for (const name of ['index.html','assets','robots.txt','sitemap.xml','.nojekyll']) await cp(path.join(root,name), path.join(out,name), { recursive:true });
await writeFile(path.join(out, '.nojekyll'), '');
console.log('Built dist/ using only index.html, assets/, robots.txt, sitemap.xml and .nojekyll.');
