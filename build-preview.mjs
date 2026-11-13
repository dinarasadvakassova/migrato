import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.dirname(new URL(import.meta.url).pathname);
const base=path.join(root,'dist');
const modules=new Map();
function compile(id){
 if(modules.has(id))return;
 let source=fs.readFileSync(path.join(base,id),'utf8');
 modules.set(id,'');
 source=source.replace(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"];?/g,(_,names,relative)=>{
  const target=path.posix.normalize(path.posix.join(path.posix.dirname(id),relative));
  compile(target);
  return `const {${names.replace(/\bas\b/g,':')}}=require(${JSON.stringify(target)});`;
 });
 const names=[];
 source=source.replace(/export\s+(const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g,(_,kind,name)=>{names.push(name);return `${kind} ${name}`;});
 if(/\b(?:import|export)\s/.test(source))throw new Error(`Unsupported module syntax in ${id}`);
 modules.set(id,`function(exports,require){\n${source}\nObject.assign(exports,{${names.join(',')}});\n}`);
}
compile('app.js');
const bundle=`(()=>{'use strict';const modules={${[...modules].map(([id,body])=>`${JSON.stringify(id)}:${body}`).join(',\n')}};const cache={};function require(id){if(cache[id])return cache[id];if(!modules[id])throw new Error('Unknown module '+id);const value=cache[id]={};modules[id](value,require);return value;}require('app.js');})();`;
const hash=crypto.createHash('sha256').update(bundle).digest('base64');
let html=fs.readFileSync(path.join(base,'index.html'),'utf8');
html=html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="\.\/([^\"]+)"[^>]*>/g,(_,file)=>`<style>${fs.readFileSync(path.join(base,file),'utf8')}</style>`)
 .replace(/<script\s+type="module"\s+src="\.\/app\.js"\s*><\/script>/,'')
 .replace('</body>',()=>`<script>${bundle}</script></body>`)
 .replace("script-src 'self'",`script-src 'self' 'sha256-${hash}'`);
if(!html.includes('<style>')||!html.includes('<script>'))throw new Error('Stylesheet or entrypoint not bundled');
fs.writeFileSync(path.join(root,'Migrato.html'),html);
console.log(JSON.stringify({file:'Migrato.html',bytes:Buffer.byteLength(html),modules:modules.size}));
