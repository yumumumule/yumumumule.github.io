import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createServer, root } from './serve.mjs';

const executablePath = process.env.CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].find(existsSync);
if (!executablePath) throw new Error('Set CHROME_PATH to a Chrome or Chromium executable.');
const server = createServer();
await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const artifacts = path.join(root,'artifacts');
await mkdir(artifacts,{recursive:true});
let browser;
const results = [];
try {
  browser = await chromium.launch({ executablePath, headless:true });
  // A typographic social preview, rendered locally; no portrait or generated imagery.
  const social = await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  await social.setContent(`<html lang="en"><head><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#f8f7f3;color:#242522;padding:76px 86px;font-family:Arial,sans-serif}.label{font:14px Consolas,monospace;letter-spacing:3px;color:#874330}h1{font:105px Georgia,serif;letter-spacing:-5px;margin:58px 0 30px}h1 span{color:#874330}.intro{font:33px Georgia,serif;line-height:1.5}.foot{margin-top:45px;padding-top:25px;border-top:1px solid #d8d9d0;font-size:17px;color:#62645d}</style></head><body><div class="label">RESEARCH &amp; ENGINEERING</div><h1>Hanlin Zhao<span>.</span></h1><div class="intro">Machine learning · Computer vision · Embodied AI</div><div class="foot">Undergraduate Researcher · The Chinese University of Hong Kong</div></body></html>`);
  await social.screenshot({path:path.join(root,'assets/social-card.png')});
  await social.close();
  for (const [name,width,height] of [['desktop',1440,1000],['tablet',768,1024],['mobile',390,844],['small-mobile',320,740]]) {
    const context = await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('response',response=>{if(response.url().startsWith(base) && response.status()>=400) errors.push(`${response.status()} ${response.url()}`)});
    assert.equal((await page.goto(base,{waitUntil:'networkidle'})).status(),200);
    assert.ok(await page.locator('h1').isVisible());
    assert.equal(await page.locator('.project-card').count(),4);
    const overflow = await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    assert.equal(overflow,false,`${name}: horizontal overflow`);
    const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','best-practice']).analyze();
    assert.deepEqual(axe.violations.map(item=>({id:item.id,nodes:item.nodes.map(node=>node.target)})),[],`${name}: accessibility`);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'Skip to content');
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'main');
    for (const id of ['about','research','projects','education','cv','contact']) {
      await page.locator(`nav a[href="#${id}"]`).click();
      await page.waitForFunction(target=>location.hash === `#${target}`,id);
      await page.waitForTimeout(650);
      const top = await page.locator(`#${id}`).evaluate(element=>element.getBoundingClientRect().top);
      const headerHeight = await page.locator('header').evaluate(element=>element.getBoundingClientRect().height);
      assert.ok(top>=headerHeight-2,`${name}: ${id} obscured by sticky header (${top},${headerHeight})`);
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
    await page.goto(base,{waitUntil:'networkidle'});
    await page.waitForTimeout(100);
    await page.screenshot({path:path.join(artifacts,`${name}.png`),fullPage:true});
    assert.deepEqual(errors,[],`${name}: console/network errors`);
    results.push({name,width,height,horizontalOverflow:false,axeViolations:0,keyboardSkip:true,anchors:6,reducedMotion:true,errors});
    await context.close();
  }
  const noJS = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page = await noJS.newPage();
  await page.goto(base);
  assert.equal(await page.locator('.project-card').count(),4);
  assert.ok(await page.locator('nav a[href="#contact"]').isVisible());
  await noJS.close();
  const zoomPage = await browser.newPage({viewport:{width:1280,height:900}});
  await zoomPage.goto(base);
  await zoomPage.evaluate(()=>document.documentElement.style.zoom='2');
  assert.equal(await zoomPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'200% zoom horizontal overflow');
  await zoomPage.close();
  await writeFile(path.join(artifacts,'browser-results.json'),JSON.stringify({results,noJavaScript:true,zoom200:true},null,2));
  console.log(JSON.stringify({results,noJavaScript:true,zoom200:true},null,2));
} finally { await browser?.close(); await new Promise(resolve=>server.close(resolve)); }
