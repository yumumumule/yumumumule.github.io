import { spawnSync } from 'node:child_process';
import { root } from './serve.mjs';

const owner = 'yumumumule';
const name = 'yumumumule.github.io';
const repoPath = `/repos/${owner}/${name}`;
function git(args, options={}) {
  const result = spawnSync('git',args,{cwd:root,encoding:'utf8',env:{...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never'},...options});
  if (result.status !== 0) throw new Error(`git ${args[0]} failed: ${result.stderr.trim()}`);
  return result.stdout.trim();
}
// Read an existing credential in memory. Never print or persist the token.
const credential = git(['credential','fill'],{input:'protocol=https\nhost=github.com\n\n'});
const token = credential.split('\n').find(line=>line.startsWith('password='))?.slice(9).trim();
if (!token) throw new Error('No existing GitHub credential. Authenticate with Git Credential Manager or gh auth login first.');
async function api(route,method='GET',body) {
  const response = await fetch(`https://api.github.com${route}`,{
    method, headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'hanlin-portfolio-deploy','Content-Type':'application/json'},
    ...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(30000)
  });
  const data = response.status===204 ? null : await response.json();
  return {status:response.status,ok:response.ok,data};
}
const user = await api('/user');
if (!user.ok || user.data.login !== owner) throw new Error(`Authenticate as ${owner}; current credential does not match.`);
if (process.argv.includes('--status')) {
  const pages = await api(`${repoPath}/pages`);
  const build = await api(`${repoPath}/pages/builds/latest`);
  console.log(JSON.stringify({pagesStatus:pages.status,pages:pages.data&&{status:pages.data.status,url:pages.data.html_url,source:pages.data.source},latestBuild:build.data&&{status:build.data.status,commit:build.data.commit,error:build.data.error}},null,2));
  process.exit(pages.ok?0:1);
}
if (git(['status','--porcelain'])) throw new Error('Commit all website changes before deployment.');
if (git(['branch','--show-current']) !== 'main') throw new Error('Deployment expects the main branch.');
let repository = await api(repoPath);
if (repository.status===404) {
  repository = await api('/user/repos','POST',{name,description:'Hanlin Zhao — academic and engineering portfolio',private:false,auto_init:false,homepage:`https://${name}/`});
  if (!repository.ok) throw new Error(`Repository creation failed (${repository.status}): ${repository.data.message}`);
  console.log(`Created ${repository.data.html_url}`);
} else if (!repository.ok) throw new Error(`Cannot inspect target repository (${repository.status}).`);
if (repository.data.private) throw new Error('Target repository is private; inspect its access and contents manually before publication.');
const expected = `https://github.com/${owner}/${name}.git`;
const remoteResult=spawnSync('git',['remote','get-url','origin'],{cwd:root,encoding:'utf8'});
if (remoteResult.status===0) {
  if (remoteResult.stdout.trim()!==expected) throw new Error('Origin does not match the target repository.');
} else git(['remote','add','origin',expected]);
// Normal push preserves remote history and rejects divergent changes. No force option.
console.log(git(['push','-u','origin','main']));
const pages = await api(`${repoPath}/pages`);
const configuration = {build_type:'legacy',source:{branch:'main',path:'/'}};
const configured = await api(`${repoPath}/pages`,pages.status===404?'POST':'PUT',configuration);
if (!configured.ok) throw new Error(`Pages setup failed (${configured.status}): ${configured.data?.message}`);
console.log(`Pages configured for main / at https://${name}/`);
const build = await api(`${repoPath}/pages/builds`,'POST');
if (!build.ok && build.status!==409) console.log(`Build request returned ${build.status}: ${build.data?.message}; inspect Pages status.`);
console.log('Run node scripts/deploy.mjs --status to inspect the published build. Verify the live HTML before reporting success.');
