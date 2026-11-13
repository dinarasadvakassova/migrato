import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const base=fs.realpathSync(path.join(path.dirname(fileURLToPath(import.meta.url)),'dist'));
const port=Number(process.env.MIGRATO_PORT||4173);
if(!Number.isInteger(port)||port<1024||port>65535)throw new Error('MIGRATO_PORT must be an integer from 1024 to 65535');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.json':'application/json; charset=utf-8','.ico':'image/x-icon'};
export function serveRequest(req,res){
 const fail=(code,message)=>{res.writeHead(code,{'Content-Type':'text/plain; charset=utf-8','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?'':message);};
 if(!['GET','HEAD'].includes(req.method)){res.setHeader('Allow','GET, HEAD');return fail(405,'Method not allowed');}
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{return fail(400,'Invalid URL');}
 if(pathname==='/healthz'){res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});return res.end(req.method==='HEAD'?'':JSON.stringify({status:'ok',site:'Migrato'}));}
 if(pathname.includes('\0')||pathname.split('/').some(part=>part.startsWith('.')))return fail(403,'Forbidden');
 const file=path.resolve(base,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
 try{
  const real=fs.realpathSync(file),type=types[path.extname(real)];
  if(!real.startsWith(base+path.sep)||!type)return fail(403,'Forbidden');
  const stat=fs.statSync(real);if(!stat.isFile())return fail(404,'Not found');
  res.writeHead(200,{'Content-Type':type,'Content-Length':stat.size,'Cache-Control':'no-cache','Referrer-Policy':'strict-origin-when-cross-origin','X-Content-Type-Options':'nosniff'});
  if(req.method==='HEAD')return res.end();
  const stream=fs.createReadStream(real);stream.on('error',()=>res.destroy());stream.pipe(res);
 }catch(error){return fail(error.code==='ENOENT'?404:403,error.code==='ENOENT'?'Not found':'Forbidden');}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const server=http.createServer(serveRequest);
 server.on('error',error=>{
  if(error.code==='EADDRINUSE')console.error(`Port ${port} is busy. Try MIGRATO_PORT=4174 node serve.mjs`);
  else console.error(`HTTP server could not start: ${error.code||error.message}`);
  process.exitCode=1;
 });
 server.listen(port,'127.0.0.1',()=>console.log(`Migrato: http://127.0.0.1:${port}/\nKeep this window open. Press Ctrl+C to stop.`));
}
