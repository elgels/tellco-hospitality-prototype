import fs from 'node:fs';
import path from 'node:path';
let failures=[];
const files=fs.readdirSync('.').filter(f=>f.endsWith('.html'));
for(const file of files){
 const html=fs.readFileSync(file,'utf8');
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|mailto:|tel:|#)/.test(url))continue;
  const target=url.split(/[?#]/)[0];
  if(!fs.existsSync(path.resolve(target)))failures.push(file+': missing '+url);
 }
 if((html.match(/<h1\b/g)||[]).length!==1)failures.push(file+': expected one h1');
 if(!html.includes('noindex, nofollow'))failures.push(file+': missing prototype noindex');
 if(/googletagmanager|gtag\(|G-MXQT1SG3SJ/.test(html))failures.push(file+': copied analytics');
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log('PASS: '+files.length+' pages; local links/assets, h1s, noindex, and no copied analytics.');
