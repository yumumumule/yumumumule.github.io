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
    const isHTML = response.headers.get('content-type')?.includes('text/html');
    const body = isHTML ? await response.text() : '';
    const blocked = [403,429,999].includes(status) || /<title>Verifying your browser\s*\|\s*OpenReview<\/title>/i.test(body);
    const result = { url, status, state:blocked?'blocked':response.ok?'passed':'failed' };
    results.push(result);
    if (!isHTML) await response.body?.cancel();
  } catch (error) { results.push({ url, state:'unverified', reason:error.message }); }
}
await mkdir(path.join(root, 'artifacts'), { recursive:true });
await writeFile(path.join(root, 'artifacts/link-results.json'), JSON.stringify(results,null,2));
for (const result of results) console.log(`${result.state.toUpperCase()} ${result.status || ''} ${result.url}`);
if (results.some(result => result.state === 'failed')) process.exitCode = 1;
