import fs from 'node:fs';
import {platforms,models,properties,partners,navigation} from '../src/content.mjs';
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const header=fs.readFileSync('src/partials/header.html','utf8'), footer=fs.readFileSync('src/partials/footer.html','utf8');
const cards=(items,label,klass='')=>'<div class="h-grid '+klass+'">'+items.map(([tag,title,body,slug])=>'<article class="h-card"><p class="eyebrow">'+esc(tag)+'</p><h3>'+esc(title)+'</h3><p>'+esc(body)+'</p><a class="text-link" href="'+slug+'.html">'+label+'<span class="visually-hidden">: '+esc(title)+'</span> <span aria-hidden="true">→</span></a></article>').join('')+'</div>';
const subnav=slug=>'<div class="hospitality-bar"><div class="container"><a class="hospitality-brand" href="index.html">Hospitality &amp; Real Estate<span>Power. Light. Comfort. Control.</span></a><nav aria-label="Hospitality navigation">'+navigation.map(([label,url])=>'<a href="'+url+'.html"'+(slug===url?' aria-current="page"':'')+'>'+label+'</a>').join('')+'</nav></div></div>';
function page(title,slug,content){
return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>'+esc(title)+' | TellCo Hospitality</title><meta name="description" content="TellCo Europe hospitality and real-estate clean-energy infrastructure prototype."><link rel="stylesheet" href="assets/css/tellco-shared.css"><link rel="stylesheet" href="assets/css/hospitality.css"></head><body><a class="skip-link" href="#main">Skip to content</a>'+header+subnav(slug)+'<main id="main" class="hospitality-site'+(slug==='index'?'':' template-page')+'">'+content+'</main>'+footer+'<script src="assets/js/site.js"></script></body></html>\n';
}
let home=fs.readFileSync('src/home.html','utf8').replace('{{platforms}}',cards(platforms,'View platform')).replace('{{models}}',cards(models,'View model','four')).replace('{{properties}}',cards(properties,'View property detail','property-grid')).replace('{{partners}}','<div class="h-grid partner-grid">'+partners.map(([title,body])=>'<article><h3>'+esc(title)+'</h3><p>'+esc(body)+'</p></article>').join('')+'</div>');
fs.writeFileSync('index.html',page('Hospitality & Real Estate Infrastructure','index',home));
const pages=[...navigation.slice(1).map(([title,slug])=>[title,slug]),...platforms.map(i=>[i[1],i[3]]),...models.map(i=>[i[1],i[3]]),...properties.map(i=>[i[1],i[3]]),['Net Zero Hospitality','net-zero-hospitality']];
for(const [title,slug] of pages){
 const source='src/pages/'+slug+'.html';
 fs.mkdirSync('src/pages',{recursive:true});
 if(!fs.existsSync(source))fs.writeFileSync(source,'<!-- Add approved '+esc(title)+' content here. Shared header and footer are supplied by the build. -->\n<h1 class="visually-hidden">'+esc(title)+'</h1>\n');
 fs.writeFileSync(slug+'.html',page(title,slug,fs.readFileSync(source,'utf8')));
}
console.log('Built homepage and '+pages.length+' blank shared-shell pages.');
