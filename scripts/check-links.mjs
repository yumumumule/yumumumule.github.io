import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { root } from './serve.mjs';

const html = await readFile(path.join(root, 'index.html'), 'utf8');
const urls = [...new Set([...html.matchAll(/href="(https:[^"]+)"/g)].map(match => match[1].replaceAll('&amp;','&')))];
const results = [];
for (const url of urls) {
  try {
    const response = await fetch(url, { signal:AbortSignal.timeout(30000), headers:{'User-Agent':'Mozilla/5.0 PortfolioLinkCheck'} });
    const status = response.status;
    const blocked = [403,429,999].includes(status);
    const result = { url, status, state:response.ok?'passed':blocked?'blocked':'failed' };
    results.push(result);
    await response.body?.cancel();
  } catch (error) { results.push({ url, state:'unverified', reason:error.message }); }
}
await mkdir(path.join(root, 'artifacts'), { recursive:true });
await writeFile(path.join(root, 'artifacts/link-results.json'), JSON.stringify(results,null,2));
for (const result of results) console.log(`${result.state.toUpperCase()} ${result.status || ''} ${result.url}`);
if (results.some(result => result.state === 'failed')) process.exitCode = 1;
