import { readFile, access, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { HtmlValidate } from 'html-validate';
import { root } from './serve.mjs';

const html = await readFile(path.join(root, 'index.html'), 'utf8');
const validator = new HtmlValidate({ extends: ['html-validate:recommended'], rules: { 'no-trailing-whitespace': 'off', 'no-inline-style': 'error' } });
const report = await validator.validateString(html, 'index.html');
if (!report.valid) {
  for (const result of report.results) for (const message of result.messages) console.error(`${message.line}:${message.column} ${message.message} (${message.ruleId})`);
  process.exitCode = 1;
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const url = match[1];
  if (url.startsWith('#')) assert.ok(ids.includes(url.slice(1)), `Missing anchor ${url}`);
  else if (!/^[a-z]+:/i.test(url)) await access(path.join(root, url));
}
for (const id of ['about','research','projects','education','cv','contact']) assert.ok(ids.includes(id));
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'One main heading');
assert.ok(!/\b\d{10}@|tel:|github_pat_|ghp_|AIza|UA-\d|G-[A-Z0-9]{8}/.test(html), 'No student-number emails, phone links, tokens or tracking');
assert.ok(html.includes('rel="canonical"') && html.includes('property="og:image"') && html.includes('name="description"'));
const image = await stat(path.join(root, 'assets/social-card.png'));
assert.ok(image.size > 1000, 'Social card must exist');
console.log(`Static checks: ${ids.length} unique IDs, local assets and fragment links valid; semantic HTML ${report.valid ? 'passed' : 'failed'}.`);
