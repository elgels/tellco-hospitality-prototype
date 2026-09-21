// One-time import only. Normal builds do not need the original project.
import fs from 'node:fs';
import path from 'node:path';
const source = process.argv[2];
if (!source) throw new Error('Supply the original TellCoExperience folder.');
fs.mkdirSync('src/partials', {recursive:true});
fs.mkdirSync('assets/css', {recursive:true});
fs.mkdirSync('assets/images', {recursive:true});
const html = fs.readFileSync(path.join(source,'index.html'),'utf8');
const absolute = text => text.replace(/href="([^":]+\.html[^"]*)"/g, (_,url) => 'href="https://tellco-europe.com/tellcoexperience/'+url+'"').replace('index.html#products','index.html#solutions').replace(/ aria-current="page"/g,'');
fs.writeFileSync('src/partials/header.html',absolute(html.match(/<div class="topbar"[\s\S]*?<\/header>/)[0]));
fs.writeFileSync('src/partials/footer.html',absolute(html.match(/<footer class="site-footer[\s\S]*?<\/footer>/)[0]));
fs.copyFileSync(path.join(source,'assets/logo.png'),'assets/logo.png');
// Preserve the original responsive shell styles without copying homepage rules.
const css=fs.readFileSync(path.join(source,'styles.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
const allowed= /(?:^|[\s,])(?:\*|:root|html\b|body\b|img\b|a\b|button\b|input\b|select\b|textarea\b|\.(?:container|skip-link|visually-hidden|topbar|topbar-inner|social-links|social-icon|social-x|site-header|nav-shell|brand|brand-logo|primary-nav|mobile-toggle|site-footer|partner-page-footer|footer-main|footer-bottom|footer-bottom-inner|contact-list)\b)/;
function filter(input) {
 let out='',pos=0;
 while(pos<input.length) {
  const start=input.indexOf('{',pos); if(start<0) break;
  const selector=input.slice(pos,start).trim(); let end=start+1,depth=1;
  for(;end<input.length && depth;end++) { if(input[end]==='{')depth++; if(input[end]==='}')depth--; }
  const body=input.slice(start+1,end-1);
  if(selector.startsWith('@media')||selector.startsWith('@supports')) { const nested=filter(body); if(nested)out+=selector+'{'+nested+'}\n'; }
  else if(allowed.test(selector) && !selector.includes('.homepage') && !selector.includes('.hp-')) out+=selector+'{'+body+'}\n';
  pos=end;
 }
 return out;
}
fs.writeFileSync('assets/css/tellco-shared.css','/* Imported TellCoExperience shared shell. Mobile breakpoint raised to 1350px to prevent inherited header overflow. */\n'+filter(css).replaceAll('(max-width: 1130px)','(max-width: 1350px)'));
