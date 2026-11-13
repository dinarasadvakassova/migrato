import test from 'node:test';
import assert from 'node:assert/strict';
import {Writable} from 'node:stream';
import {serveRequest} from '../serve.mjs';

function request(url,method='GET'){
 return new Promise((resolve,reject)=>{
  const chunks=[],headers={};
  const res=new Writable({write(chunk,encoding,callback){chunks.push(Buffer.from(chunk));callback();}});
  res.setHeader=(key,value)=>{headers[key.toLowerCase()]=value;};
  res.writeHead=(code,values)=>{res.statusCode=code;for(const [key,value] of Object.entries(values||{}))res.setHeader(key,value);};
  res.on('finish',()=>resolve({status:res.statusCode,headers,body:Buffer.concat(chunks).toString('utf8')}));
  res.on('error',reject);serveRequest({url,method},res);
 });
}
test('HTTP handler serves the actual page and JavaScript with correct MIME and normal external-link referrer policy',async()=>{
 const page=await request('/');assert.equal(page.status,200);assert.match(page.headers['content-type'],/^text\/html/);
 assert.ok(!page.body.includes('tile.openstreetmap.org'));assert.ok(!page.body.includes('city-art-svg'));assert.ok(page.body.includes('./app.js'));
 assert.equal(page.headers['referrer-policy'],'strict-origin-when-cross-origin');
 const script=await request('/modules/places-directory.js');assert.equal(script.status,200);assert.match(script.headers['content-type'],/^text\/javascript/);
 assert.ok(script.body.includes('export function map'));
 const head=await request('/','HEAD');assert.equal(head.status,200);assert.equal(head.body,'');assert.ok(Number(head.headers['content-length'])>0);
});
test('HTTP handler exposes only static assets, rejects writes, hidden files and encoded traversal',async()=>{
 for(const url of ['/.git/config','/%2eenv','/..%2fserve.mjs','/../serve.mjs','/package.json']){
  const result=await request(url);assert.ok([403,404].includes(result.status),url);assert.ok(!result.body.includes('serveRequest'));
 }
 assert.equal((await request('/%E0%A4%A')).status,400);
 assert.equal((await request('/','POST')).status,405);
 const health=await request('/healthz');assert.equal(health.status,200);assert.deepEqual(JSON.parse(health.body),{status:'ok',site:'Migrato'});
});
